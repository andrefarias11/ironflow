import React from 'react';
import { Flame, CheckCircle2, Trophy, Weight } from 'lucide-react';

interface OverallProgressProps {
  percentage: number;
  completedSets: number;
  totalSets: number;
  totalVolumeKg: number;
  onFinishWorkout: () => void;
}

export const OverallProgress: React.FC<OverallProgressProps> = ({
  percentage,
  completedSets,
  totalSets,
  totalVolumeKg,
  onFinishWorkout
}) => {
  const isComplete = percentage === 100 && totalSets > 0;

  return (
    <section className="px-4 py-3">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181B] to-[#101012] p-5 border border-white/10 shadow-xl shadow-black/40">
        <div 
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: isComplete ? '#30D158' : '#D4FF00',
            opacity: percentage > 0 ? 0.25 : 0.08
          }}
        />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-zinc-400">
              <Flame
                className={`w-4 h-4 transition-all duration-500 ${
                  percentage === 100 && totalSets > 0
                    ? 'text-[#FF5500] fill-[#FF5500] drop-shadow-[0_0_10px_#FF5500] scale-125 animate-pulse'
                    : percentage >= 50
                    ? 'text-orange-500 fill-orange-500 drop-shadow-[0_0_5px_#F97316] scale-110'
                    : percentage > 0
                    ? 'text-amber-400 fill-amber-400/80 scale-100'
                    : 'text-zinc-600 scale-90 opacity-60'
                }`}
              />
              <span className={percentage === 100 ? 'text-orange-400 font-bold' : ''}>
                {percentage === 100 ? 'Treino 100% On Fire! 🔥' : 'Progresso do Treino'}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
                {percentage}%
              </span>
              <span className="text-sm font-medium text-zinc-400">
                concluído
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isComplete ? 'text-ios-accentGreen' : 'text-ios-accent'}`} />
              <span className="text-xs font-semibold text-zinc-200 font-mono">
                {completedSets} <span className="text-zinc-500 font-normal">/</span> {totalSets}
              </span>
              <span className="text-[11px] text-zinc-400 font-normal">séries</span>
            </div>
          </div>
        </div>

        <div className="mt-4 relative">
          <div className="w-full h-3 rounded-full bg-zinc-800/80 overflow-hidden p-[2px] border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out relative ${
                isComplete 
                  ? 'bg-gradient-to-r from-emerald-400 to-ios-accentGreen shadow-glow-green' 
                  : 'bg-gradient-to-r from-yellow-300 via-ios-accent to-emerald-400 shadow-glow-accent'
              }`}
              style={{ width: `${Math.min(100, Math.max(percentage, 0))}%` }}
            >
              {percentage > 0 && (
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-1.5 font-medium">
            <Weight className="w-3.5 h-3.5 text-zinc-500" />
            <span>Volume:</span>
            <span className="font-semibold text-zinc-200 font-mono">
              {totalVolumeKg.toLocaleString('pt-BR')} kg
            </span>
          </div>

          {completedSets > 0 && (
            <button
              onClick={onFinishWorkout}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                isComplete
                  ? 'bg-ios-accent text-black font-bold shadow-glow-accent hover:brightness-110'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{isComplete ? 'Concluir Treino!' : 'Finalizar Sessão'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

