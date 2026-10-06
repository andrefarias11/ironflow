import React, { useEffect } from 'react';
import { Play, Pause, Plus, X, Timer } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface RestTimerBarProps {
  isActive: boolean;
  timeLeft: number;
  totalTime: number;
  isPaused: boolean;
  exerciseName?: string;
  onPauseToggle: () => void;
  onAddSeconds: (seconds: number) => void;
  onStop: () => void;
}

export const RestTimerBar: React.FC<RestTimerBarProps> = ({
  isActive,
  timeLeft,
  totalTime,
  isPaused,
  exerciseName,
  onPauseToggle,
  onAddSeconds,
  onStop
}) => {
  useEffect(() => {
    if (isActive && timeLeft === 0) {
      soundManager.playTimerDoneSound(true);
      soundManager.vibrate([100, 80, 100, 80, 200], true);
    }
  }, [isActive, timeLeft]);

  if (!isActive) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 100;
  const isUrgent = timeLeft <= 5 && timeLeft > 0;

  return (
    <aside 
      aria-label="Cronômetro de descanso"
      className="fixed bottom-6 left-4 right-4 z-50 max-w-md mx-auto animate-bounce-subtle"
    >
      <div className={`relative overflow-hidden rounded-3xl bg-zinc-900/95 border shadow-2xl backdrop-blur-xl p-3.5 transition-all duration-300 ${
        isUrgent 
          ? 'border-ios-accent shadow-glow-accent' 
          : 'border-white/15 shadow-black/80'
      }`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <div 
            className="h-full bg-ios-accent transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-black transition-colors ${
              isUrgent ? 'bg-ios-accent animate-ping-once' : 'bg-ios-accent'
            }`}>
              <Timer className="w-5 h-5 text-black stroke-[2.5]" />
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black font-mono tracking-tight ${
                  isUrgent ? 'text-ios-accent scale-105' : 'text-white'
                }`}>
                  {formattedTime}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Descanso
                </span>
              </div>
              {exerciseName && (
                <p className="text-[11px] text-zinc-400 truncate max-w-[150px]">
                  {exerciseName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onAddSeconds(30)}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 text-xs font-semibold flex items-center gap-0.5 active:scale-95 transition-all"
              title="Adicionar 30 segundos"
            >
              <Plus className="w-3 h-3 text-ios-accent" />
              <span>30s</span>
            </button>

            <button
              onClick={onPauseToggle}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 active:scale-95 transition-all"
              title={isPaused ? 'Continuar' : 'Pausar'}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={onStop}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 active:scale-95 transition-all"
              title="Encerrar descanso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

