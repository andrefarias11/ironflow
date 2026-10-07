import React from 'react';
import { Users, ChevronRight, X } from 'lucide-react';
import { WorkoutRoom, RoomMember } from '../types/auth';

interface RoomLiveBarProps {
  activeRoom: WorkoutRoom;
  members: RoomMember[];
  currentUserId?: string;
  latestReaction: { emoji: string; senderName: string } | null;
  onSendReaction: (emoji: string) => void;
  onOpenRoomModal: () => void;
  onLeaveRoom: () => void;
}

export const RoomLiveBar: React.FC<RoomLiveBarProps> = ({
  activeRoom,
  members,
  currentUserId,
  latestReaction,
  onSendReaction,
  onOpenRoomModal,
  onLeaveRoom,
}) => {
  const partners = members.filter((m) => m.userId !== currentUserId);

  return (
    <>
      {/* Toast flutuante de Reação recebida */}
      {latestReaction && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
          <div className="px-4 py-2 rounded-2xl bg-black/90 border border-orange-500/40 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
            <span className="text-2xl">{latestReaction.emoji}</span>
            <span className="text-xs font-bold text-white font-sans">
              {latestReaction.senderName} mandou energia!
            </span>
          </div>
        </div>
      )}

      {/* Barra de Sala Conectada Fixada */}
      <div className="w-full bg-gradient-to-r from-orange-950/40 via-zinc-900/90 to-zinc-950 border-b border-orange-500/30 px-3 py-2 flex items-center justify-between shadow-lg backdrop-blur-md">
        <div 
          onClick={onOpenRoomModal}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-black animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-black text-orange-400 tracking-wider">
                SALA #{activeRoom.room_code}
              </span>
              <span className="text-[9px] text-zinc-400">•</span>
              <span className="text-[10px] text-zinc-300 font-bold">
                {partners.length > 0 
                  ? `Com ${partners.map(p => p.name).join(', ')}` 
                  : 'Aguardando parceiro...'}
              </span>
            </div>
          </div>
        </div>

        {/* Reações rápidas de 1 toque */}
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
            {['💪', '🔥', '⚡'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => onSendReaction(emoji)}
                className="w-6 h-6 flex items-center justify-center text-xs hover:scale-125 transition-transform active:scale-95"
                title={`Mandar ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenRoomModal}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all text-[11px] font-bold flex items-center gap-1"
          >
            <span>Ver</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={onLeaveRoom}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-all text-[11px] font-bold flex items-center"
            title="Sair da sala"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
