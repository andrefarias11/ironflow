import React from 'react';
import { Flame, Moon } from 'lucide-react';

interface StreakFlameProps {
  currentStreak: number;
  percentage: number;
  isTodayRestDay: boolean;
  onOpenModal: () => void;
}

export const StreakFlame: React.FC<StreakFlameProps> = ({ currentStreak, percentage, isTodayRestDay, onOpenModal }) => (
  <button type="button" onClick={onOpenModal} className="flex items-center gap-1.5 px-2 h-9 border border-white/10 bg-white/[0.03] shrink-0" aria-label={`Sequência de ${currentStreak} ${currentStreak === 1 ? 'treino' : 'treinos'}. Ver detalhes`} title="Ver sequência de treinos">
    {isTodayRestDay && percentage === 0 ? <Moon className="w-3.5 h-3.5 text-zinc-400" /> : <Flame className={`w-3.5 h-3.5 ${percentage > 0 ? 'text-ios-accent' : 'text-zinc-500'}`} />}
    <span className="font-mono text-xs text-zinc-300">{String(currentStreak).padStart(2, '0')}</span>
  </button>
);
