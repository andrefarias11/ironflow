import React, { useEffect, useRef } from 'react';
import { Play, Pause, Plus, Minus, X, Timer, Check } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface RestTimerBarProps {
  soundEnabled?: boolean;
  vibrateEnabled?: boolean;
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
  soundEnabled = true,
  vibrateEnabled = true,
  isActive,
  timeLeft,
  totalTime,
  isPaused,
  exerciseName,
  onPauseToggle,
  onAddSeconds,
  onStop
}) => {
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (!isActive || timeLeft > 0) {
      notifiedRef.current = false;
      return;
    }

    if (!notifiedRef.current) {
      notifiedRef.current = true;
      soundManager.playTimerDoneSound(soundEnabled);
      soundManager.vibrate([100, 80, 100, 80, 200], vibrateEnabled);
    }
  }, [isActive, timeLeft, soundEnabled, vibrateEnabled]);

  if (!isActive) return null;

  const isDone = timeLeft === 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = totalTime > 0 ? Math.max(0, Math.min(100, ((totalTime - timeLeft) / totalTime) * 100)) : 100;
  const isUrgent = timeLeft <= 5 && timeLeft > 0;

  return (
    <aside 
      aria-label="Cronômetro de descanso"
      className="rest-timer fixed bottom-5 left-3 right-3 sm:left-4 sm:right-4 z-40 max-w-md mx-auto animate-bounce-subtle"
    >
      <div className={`relative overflow-hidden rounded-3xl bg-zinc-900/95 border shadow-2xl backdrop-blur-xl p-3 sm:p-3.5 transition-all duration-300 ${
        isDone
          ? 'border-[#8DA694]/70 shadow-black/90'
          : isUrgent
          ? 'border-ios-accent shadow-glow-accent'
          : 'border-white/15 shadow-black/80'
      }`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <div 
            className={`h-full transition-all duration-300 ease-linear ${isDone ? 'bg-[#8DA694]' : 'bg-ios-accent'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-black shrink-0 transition-colors ${
              isDone ? 'bg-[#8DA694]' : isUrgent ? 'bg-ios-accent animate-ping-once' : 'bg-ios-accent'
            }`}>
              {isDone ? <Check className="w-5 h-5 text-black stroke-[3]" /> : <Timer className="w-5 h-5 text-black stroke-[2.5]" />}
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                {isDone ? (
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-[#8DA694]">
                    Pronto! Próxima série
                  </span>
                ) : (
                  <>
                    <span className={`text-2xl font-black font-mono tracking-tight ${
                      isUrgent ? 'text-ios-accent scale-105' : 'text-white'
                    }`}>
                      {formattedTime}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      {isPaused ? 'Pausado' : 'Descanso'}
                    </span>
                  </>
                )}
              </div>
              {exerciseName && (
                <p className="text-[11px] text-zinc-400 truncate max-w-[160px]">
                  {exerciseName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {!isDone && timeLeft > 15 && (
              <button
                type="button"
                onClick={() => onAddSeconds(-15)}
                className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 text-xs font-semibold flex items-center gap-0.5 active:scale-95 transition-all"
                title="Remover 15 segundos"
                aria-label="Remover 15 segundos"
              >
                <Minus className="w-3 h-3 text-zinc-300" />
                <span>15s</span>
              </button>
            )}

            {!isDone && (
              <>
                <button
                  type="button"
                  onClick={() => onAddSeconds(30)}
                  className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 text-xs font-semibold flex items-center gap-0.5 active:scale-95 transition-all"
                  title="Adicionar 30 segundos"
                  aria-label="Adicionar 30 segundos"
                >
                  <Plus className="w-3 h-3 text-ios-accent" />
                  <span>30s</span>
                </button>

                <button
                  type="button"
                  onClick={onPauseToggle}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 active:scale-95 transition-all"
                  title={isPaused ? 'Continuar' : 'Pausar'}
                  aria-label={isPaused ? 'Continuar descanso' : 'Pausar descanso'}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onStop}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 active:scale-95 transition-all"
              title="Fechar descanso"
              aria-label="Fechar cronômetro de descanso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
