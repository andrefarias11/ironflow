import React from 'react';
import { Dumbbell, Settings, Calendar, Users, User as UserIcon } from 'lucide-react';
import { StreakFlame } from './StreakFlame';

interface HeaderProps {
  onOpenCalendar: () => void;
  onOpenSettings: () => void;
  onOpenStreakModal: () => void;
  onOpenRoomModal: () => void;
  onOpenAuthModal: () => void;
  currentStreak: number;
  percentage: number;
  isTodayRestDay: boolean;
  isInRoom?: boolean;
  userName?: string;
  userColor?: string;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCalendar,
  onOpenSettings,
  onOpenStreakModal,
  onOpenRoomModal,
  onOpenAuthModal,
  currentStreak,
  percentage,
  isTodayRestDay,
  isInRoom = false,
  userName,
  userColor,
  isLoggedIn = false
}) => {
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  return (
    <header 
      className="px-3 sm:px-4 pb-2.5 flex items-center justify-between border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-0 z-30"
      style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 14px)' }}
    >
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center gap-2 min-w-0 shrink">
        <div className="w-8 h-8 rounded-xl bg-ios-accent flex items-center justify-center text-black shadow-glow-accent shrink-0">
          <Dumbbell className="w-4 h-4 fill-current stroke-current" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-none truncate">
              Ironflow
            </h1>
            <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-300 shrink-0">
              Pro
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-zinc-400 capitalize font-medium mt-0.5 truncate">
            {todayFormatted}
          </p>
        </div>
      </div>

      {/* Lado Direito: Ações rápidas */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Botão Treino em Dupla (Sala) */}
        <button
          onClick={onOpenRoomModal}
          aria-label="Treino em Dupla"
          className={`relative w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all active:scale-95 shrink-0 ${
            isInRoom
              ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 shadow-lg shadow-orange-500/20'
              : 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white'
          }`}
          title="Treinar em Dupla (Tempo Real)"
        >
          <Users className="w-3.5 h-3.5" />
          {isInRoom && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
          )}
        </button>

        {/* Foguinho Streak */}
        <StreakFlame
          currentStreak={currentStreak}
          percentage={percentage}
          isTodayRestDay={isTodayRestDay}
          onOpenModal={onOpenStreakModal}
        />

        {/* Botão Calendário */}
        <button
          onClick={onOpenCalendar}
          aria-label="Ver Calendário do Mês"
          className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition-colors shrink-0"
          title="Calendário Mensal de Treinos"
        >
          <Calendar className="w-3.5 h-3.5" />
        </button>

        {/* Botão Usuário / Login / Perfil */}
        <button
          onClick={onOpenAuthModal}
          aria-label="Perfil do Atleta"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-95 relative shrink-0"
          style={isLoggedIn && userColor ? { backgroundColor: userColor } : undefined}
          title={isLoggedIn ? `Perfil: ${userName}` : 'Entrar / Criar Conta'}
        >
          {isLoggedIn ? (
            <span className="text-black font-black text-xs font-mono">
              {(userName || 'A').charAt(0).toUpperCase()}
            </span>
          ) : (
            <div className="w-full h-full rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
          )}
        </button>

        {/* Botão Configurações */}
        <button
          onClick={onOpenSettings}
          aria-label="Configurações e Ajustes"
          className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition-colors shrink-0"
          title="Ajustes e Opções"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
