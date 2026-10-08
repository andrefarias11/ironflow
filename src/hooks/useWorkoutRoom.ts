import { useState, useEffect, useRef, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { RoomMember, RoomSetEvent, WorkoutRoom } from '../types/auth';

export function useWorkoutRoom() {
  const { user, profile } = useAuth();
  const [activeRoom, setActiveRoom] = useState<WorkoutRoom | null>(null);
  const [members, setMembers] = useState<RoomMember[]>([]);
  // Mapeamento: `${exerciseId}_${setNumber}` -> dados da série concluída pelo parceiro
  const [partnerSets, setPartnerSets] = useState<Record<string, RoomSetEvent>>({});
  const [latestReaction, setLatestReaction] = useState<{ emoji: string; senderName: string } | null>(null);
  const [syncedRestTimer, setSyncedRestTimer] = useState<{ seconds: number; startedBy: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);

  // Gera código amigável de 6 dígitos
  const generateRoomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Limpa o canal ao desmontar ou sair
  const cleanupChannel = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
    setMembers([]);
    setPartnerSets({});
    setLatestReaction(null);
  }, []);

  // Cria uma nova sala
  const createRoom = async (workoutId: string, workoutName: string, category?: string): Promise<string | null> => {
    if (!isSupabaseConfigured || !user || !profile) {
      setError('Faça login para criar uma sala de treino em dupla.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const roomCode = generateRoomCode();

      const basePayload = {
        room_code: roomCode,
        host_user_id: user.id,
        host_name: profile.name,
        workout_name: workoutName,
        category: category || '',
        status: 'active'
      };

      // Tenta inserir com workout_id
      let { data, error: insertError } = await supabase
        .from('workout_rooms')
        .insert({
          ...basePayload,
          workout_id: workoutId
        })
        .select()
        .single();

      // Fallback gracioso se a coluna workout_id ainda não existir no Supabase do usuário
      if (insertError && insertError.message.includes('workout_id')) {
        const fallbackRes = await supabase
          .from('workout_rooms')
          .insert(basePayload)
          .select()
          .single();
        data = fallbackRes.data;
        insertError = fallbackRes.error;
      }

      if (insertError || !data) {
        throw new Error(insertError?.message || 'Falha ao criar sala');
      }

      const roomData = data as WorkoutRoom;
      if (!roomData.workout_id && workoutId) {
        roomData.workout_id = workoutId;
      }

      setActiveRoom(roomData);
      joinRealtimeChannel(roomCode);
      setIsLoading(false);
      return roomCode;
    } catch (err: any) {
      console.error('Erro ao criar sala:', err);
      setError(err.message || 'Erro ao criar sala');
      setIsLoading(false);
      return null;
    }
  };

  // Entra em uma sala existente pelo código
  const joinRoom = async (roomCode: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !user || !profile) {
      setError('Faça login para entrar na sala.');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formattedCode = roomCode.trim().toUpperCase();

      const { data, error: fetchError } = await supabase
        .from('workout_rooms')
        .select('*')
        .eq('room_code', formattedCode)
        .eq('status', 'active')
        .single();

      if (fetchError || !data) {
        throw new Error('Sala não encontrada ou já finalizada.');
      }

      setActiveRoom(data as WorkoutRoom);
      joinRealtimeChannel(formattedCode);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error('Erro ao entrar na sala:', err);
      setError(err.message || 'Erro ao entrar na sala');
      setIsLoading(false);
      return false;
    }
  };

  // Conecta ao canal Realtime (Presence + Broadcast)
  const joinRealtimeChannel = (roomCode: string) => {
    cleanupChannel();

    const channel = supabase.channel(`workout_room:${roomCode}`, {
      config: {
        presence: {
          key: user?.id || 'guest',
        },
      },
    });

    // 1. PRESENCE (Quem está online na sala)
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const activeList: RoomMember[] = [];
        
        Object.values(state).forEach((presenceArray: any) => {
          presenceArray.forEach((p: any) => {
            activeList.push({
              userId: p.userId,
              name: p.name,
              color: p.color,
              joinedAt: p.joinedAt,
            });
          });
        });
        setMembers(activeList);
      })
      .on('presence', { event: 'join' }, ({ newPresences }: any) => {
        console.log('Novo parceiro entrou na sala:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }: any) => {
        console.log('Parceiro saiu da sala:', leftPresences);
      });

    // 2. BROADCAST: Atualização de Séries em Tempo Real
    channel.on('broadcast', { event: 'SET_PROGRESS' }, ({ payload }: { payload: RoomSetEvent }) => {
      // Se a série foi atualizada por outra pessoa, salva no estado de parceiro
      if (payload.userId !== user?.id) {
        const key = `${payload.exerciseId}_${payload.setNumber}`;
        setPartnerSets((prev) => ({
          ...prev,
          [key]: payload,
        }));
      }
    });

    // 3. BROADCAST: Reações / Emojis de incentivo
    channel.on('broadcast', { event: 'REACTION' }, ({ payload }) => {
      if (payload.userId !== user?.id) {
        setLatestReaction({ emoji: payload.emoji, senderName: payload.userName });
        setTimeout(() => setLatestReaction(null), 3000);
      }
    });

    // 4. BROADCAST: Sincronização do Cronômetro de Descanso
    channel.on('broadcast', { event: 'REST_TIMER_SYNC' }, ({ payload }) => {
      if (payload.userId !== user?.id) {
        setSyncedRestTimer({ seconds: payload.seconds, startedBy: payload.userName });
      }
    });

    // 5. Inscreve e envia a presença do usuário atual
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          userId: user?.id,
          name: profile?.name || 'Atleta',
          color: profile?.color || '#FF6B00',
          joinedAt: new Date().toISOString(),
        });
      }
    });

    channelRef.current = channel;
  };

  // Envia progresso da série para o parceiro
  const broadcastSetProgress = (
    exerciseId: string,
    setNumber: number,
    completed: boolean,
    weight?: number,
    reps?: number
  ) => {
    if (!channelRef.current || !user || !profile) return;

    const eventPayload: RoomSetEvent = {
      exerciseId,
      setNumber,
      completed,
      userId: user.id,
      userName: profile.name,
      userColor: profile.color,
      weight,
      reps,
    };

    channelRef.current.send({
      type: 'broadcast',
      event: 'SET_PROGRESS',
      payload: eventPayload,
    });
  };

  // Envia reação instantânea (💪, 🔥, 💥, etc.)
  const broadcastReaction = (emoji: string) => {
    if (!channelRef.current || !user || !profile) return;

    channelRef.current.send({
      type: 'broadcast',
      event: 'REACTION',
      payload: {
        emoji,
        userId: user.id,
        userName: profile.name,
      },
    });
  };

  // Envia sincronização de cronômetro de descanso
  const broadcastRestTimer = (seconds: number) => {
    if (!channelRef.current || !user || !profile) return;

    channelRef.current.send({
      type: 'broadcast',
      event: 'REST_TIMER_SYNC',
      payload: {
        seconds,
        userId: user.id,
        userName: profile.name,
      },
    });
  };

  // Sair da sala
  const leaveRoom = async () => {
    if (activeRoom && user && activeRoom.host_user_id === user.id) {
      // Se for host, marca como finalizada
      await supabase
        .from('workout_rooms')
        .update({ status: 'finished' })
        .eq('id', activeRoom.id);
    }
    cleanupChannel();
    setActiveRoom(null);
  };

  useEffect(() => {
    return () => {
      cleanupChannel();
    };
  }, [cleanupChannel]);

  return {
    activeRoom,
    members,
    partnerSets,
    latestReaction,
    syncedRestTimer,
    isLoading,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    broadcastSetProgress,
    broadcastReaction,
    broadcastRestTimer,
  };
}

