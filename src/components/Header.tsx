import React from 'react';
import { Dumbbell, Settings, Calendar } from 'lucide-react';
import { StreakFlame } from './StreakFlame';

interface HeaderProps {
  onOpenCalendar: () => void;
  onOpenSettings: () => void;
  onOpenStreakModal: () => void;
  currentStreak: number;
  percentage: number;
  isTodayRestDay: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCalendar,
  onOpenSettings,
  onOpenStreakModal,
  currentStreak,
  percentage,
  isTodayRestDay
}) => {
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  return (
    <header 
      className="px-4 pb-2.5 flex items-center justify-between border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-0 z-30"
      style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 14px)' }}
    >
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-ios-accent flex items-center justify-center text-black shadow-glow-accent shrink-0">
          <Dumbbell className="w-4 h-4 fill-current stroke-current" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-extrabold tracking-tight text-white leading-none">
              Treino
            </h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-300 shrink-0">
              Pro
            </span>
          </div>
          <p className="text-[11px] text-ios-textSecondary capitalize font-medium mt-0.5 truncate">
            {todayFormatted}
          </p>
        </div>
      </div>

      {/* Lado Direito: Apenas os 3 Elementos Essenciais (Super Espaçoso no iPhone) */}
      <div className="flex items-center gap-2 shrink-0">
        <StreakFlame
          currentStreak={currentStreak}
          percentage={percentage}
          isTodayRestDay={isTodayRestDay}
          onOpenModal={onOpenStreakModal}
        />

        <button
          onClick={onOpenCalendar}
          aria-label="Ver Calendário do Mês"
          className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition-colors"
          title="Calendário Mensal de Treinos"
        >
          <Calendar className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenSettings}
          aria-label="Configurações e Ajustes"
          className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition-colors"
          title="Ajustes e Opções"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
