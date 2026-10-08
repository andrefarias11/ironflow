import React from 'react';
import { Flame, Moon, Sparkles } from 'lucide-react';

interface StreakFlameProps {
  currentStreak: number;
  percentage: number;
  isTodayRestDay: boolean;
  onOpenModal: () => void;
}

export const StreakFlame: React.FC<StreakFlameProps> = ({
  currentStreak,
  percentage,
  isTodayRestDay,
  onOpenModal
}) => {
  // Determina o estágio da chama (0% apagada, crescendo até 100% super acesa)
  const isSuperHot = percentage === 100;
  const isMedium = percentage >= 40 && percentage < 100;
  const isLow = percentage > 0 && percentage < 40;
  const isOff = percentage === 0;

  return (
    <button
      type="button"
      onClick={onOpenModal}
      className="group relative flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/10 active:scale-95 transition-all shadow-sm shrink-0 h-8"
      title="Ver seu Streak de Treinos"
    >
      {/* Glow dinâmico atrás da chama */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-700 pointer-events-none"
        style={{
          background: isSuperHot
            ? 'radial-gradient(circle, rgba(255, 85, 0, 0.4) 0%, transparent 70%)'
            : isMedium
            ? 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)'
            : isLow
            ? 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, transparent 70%)'
            : 'none'
        }}
      />

      {/* Ícone da Chama Animada */}
      <div className="relative">
        <Flame
          className={`w-4 h-4 transition-all duration-500 ${
            isSuperHot
              ? 'text-[#FF5500] fill-[#FF5500] drop-shadow-[0_0_8px_#FF5500] scale-125 animate-pulse'
              : isMedium
              ? 'text-orange-500 fill-orange-500 drop-shadow-[0_0_5px_#F97316] scale-110'
              : isLow
              ? 'text-amber-500/80 fill-amber-500/60 scale-100'
              : 'text-zinc-600 fill-zinc-800 scale-95 opacity-60'
          }`}
        />

        {isSuperHot && (
          <Sparkles className="w-2.5 h-2.5 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
        )}
      </div>

      {/* Contador do Streak */}
      <div className="flex items-center gap-1">
        <span
          className={`font-mono text-xs font-black tracking-tight ${
            isSuperHot
              ? 'text-orange-400'
              : isMedium
              ? 'text-orange-300'
              : isLow
              ? 'text-amber-200'
              : 'text-zinc-400'
          }`}
        >
          {currentStreak}
        </span>
        <span className="text-[10px] text-zinc-500 uppercase font-semibold">
          {currentStreak === 1 ? 'dia' : 'dias'}
        </span>
      </div>

      {/* Badge se hoje for Descanso */}
      {isTodayRestDay && isOff && (
        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-0.5">
          <Moon className="w-2.5 h-2.5" /> descanso
        </span>
      )}
    </button>
  );
};
