import React from 'react';
import { History, Share, RotateCcw, Plus, Dumbbell, Settings, Calendar } from 'lucide-react';
import { StreakFlame } from './StreakFlame';
import { DayActivity } from '../utils/streak';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenCalendar: () => void;
  onOpenInstallGuide: () => void;
  onOpenNewWorkout: () => void;
  onOpenSettings: () => void;
  onResetWorkout: () => void;
  completedSetsCount: number;
  currentStreak: number;
  percentage: number;
  isTodayRestDay: boolean;
  streakHistory: Record<string, DayActivity>;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenCalendar,
  onOpenInstallGuide,
  onOpenNewWorkout,
  onOpenSettings,
  onResetWorkout,
  completedSetsCount,
  currentStreak,
  percentage,
  isTodayRestDay,
  streakHistory
}) => {
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  return (
    <header className="safe-top px-4 pt-3 pb-2 flex items-center justify-between border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-30">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-ios-accent flex items-center justify-center text-black shadow-glow-accent">
            <Dumbbell className="w-4 h-4 fill-current stroke-current" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            Treino
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-300">
              Pro
            </span>
          </h1>
        </div>
        <p className="text-xs text-ios-textSecondary capitalize font-medium mt-0.5">
          {todayFormatted}
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <StreakFlame
          currentStreak={currentStreak}
          percentage={percentage}
          isTodayRestDay={isTodayRestDay}
          streakHistory={streakHistory}
        />

        {completedSetsCount > 0 && (
          <button
            onClick={onResetWorkout}
            aria-label="Reiniciar séries de hoje"
            className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-200 active:bg-white/10 transition-colors"
            title="Reiniciar séries para um novo treino"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={onOpenNewWorkout}
          aria-label="Novo treino"
          className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-200 active:bg-white/10 transition-colors"
          title="Criar novo treino"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenCalendar}
          aria-label="Ver Calendário do Mês"
          className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-200 active:bg-white/10 transition-colors"
          title="Calendário Mensal de Treinos"
        >
          <Calendar className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenHistory}
          aria-label="Ver histórico"
          className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-200 active:bg-white/10 transition-colors"
          title="Histórico de treinos"
        >
          <History className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenSettings}
          aria-label="Configurações"
          className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-200 active:bg-white/10 transition-colors"
          title="Configurações do app"
        >
          <Settings className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenInstallGuide}
          aria-label="Como instalar no iPhone"
          className="p-2.5 rounded-full text-ios-accent hover:opacity-80 active:bg-white/10 transition-colors"
          title="Instalar no iPhone"
        >
          <Share className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

