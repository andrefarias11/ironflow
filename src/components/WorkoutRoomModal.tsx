import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  DoorOpen, 
  Flame, 
  LogIn
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { WorkoutRoom, RoomMember } from '../types/auth';

interface WorkoutRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRoom: WorkoutRoom | null;
  members: RoomMember[];
  currentWorkoutName: string;
  category?: string;
  onCreateRoom: (workoutName: string, category?: string) => Promise<string | null>;
  onJoinRoom: (roomCode: string) => Promise<boolean>;
  onLeaveRoom: () => void;
  onOpenAuth: () => void;
}

export const WorkoutRoomModal: React.FC<WorkoutRoomModalProps> = ({
  isOpen,
  onClose,
  activeRoom,
  members,
  currentWorkoutName,
  category,
  onCreateRoom,
  onJoinRoom,
  onLeaveRoom,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [joinCode, setJoinCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const code = await onCreateRoom(currentWorkoutName, category);
    setLoading(false);
    if (!code) {
      setErrorMsg('Não foi possível criar a sala. Verifique sua conexão.');
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    if (!joinCode.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    const success = await onJoinRoom(joinCode);
    setLoading(false);

    if (success) {
      onClose();
    } else {
      setErrorMsg('Código inválido ou sala não encontrada.');
    }
  };

  const copyRoomCode = () => {
    if (!activeRoom) return;
    navigator.clipboard.writeText(activeRoom.room_code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    if (!activeRoom) return;
    const text = encodeURIComponent(
      `🔥 Bora treinar juntos no Ironflow? Entra na minha sala de treino usando o código: *${activeRoom.room_code}* ou acesse: ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-[#121316] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        {/* Header Modal */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-wide">
                TREINO EM DUPLA
              </h2>
              <p className="text-[11px] text-zinc-400 font-medium">
                Sincronize séries e cargas em tempo real
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Se o usuário não estiver logado */}
        {!user ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto">
              <LogIn className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Login Necessário</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Para conectar dois celulares em tempo real e treinar juntos, faça login na sua conta.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all"
            >
              Fazer Login / Criar Conta
            </button>
          </div>
        ) : activeRoom ? (
          /* JÁ ESTÁ EM UMA SALA ATIVA */
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-orange-400 uppercase block">
                CÓDIGO DA SALA ATIVA
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-black text-white font-mono tracking-widest">
                  {activeRoom.room_code}
                </span>
                <button
                  onClick={copyRoomCode}
                  className="p-2 rounded-xl bg-white/10 text-zinc-300 hover:text-white transition-all active:scale-95"
                  title="Copiar Código"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-zinc-400">
                Passe este código para o seu parceiro entrar pelo celular dele.
              </p>
            </div>

            {/* Lista de Atletas Conectados */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Atletas Conectados ({members.length})
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {members.map((m) => (
                  <div
                    key={m.userId}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: m.color }}
                      />
                      <span className="text-xs font-bold text-white">
                        {m.name} {m.userId === user.id && '(Você)'}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Online
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="space-y-2 pt-2">
              <button
                onClick={shareViaWhatsApp}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Convidar no WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onLeaveRoom();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <DoorOpen className="w-4 h-4" />
                <span>Encerrar / Sair da Sala</span>
              </button>
            </div>
          </div>
        ) : (
          /* NÃO ESTÁ EM SALA: ESCOLHER CRIAR OU ENTRAR */
          <div className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setMode('create')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'create'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Criar Sala
              </button>
              <button
                onClick={() => setMode('join')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'join'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Entrar com Código
              </button>
            </div>

            {mode === 'create' ? (
              <div className="space-y-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Treino da Sala
                  </span>
                  <div className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{currentWorkoutName}</span>
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Gerar Código da Sala</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Digite o Código de 6 dígitos
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Ex: 849201"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-widest text-xl font-mono py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-orange-500 transition-colors uppercase"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || joinCode.length < 4}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <DoorOpen className="w-4 h-4" />
                      <span>Entrar na Sala</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
