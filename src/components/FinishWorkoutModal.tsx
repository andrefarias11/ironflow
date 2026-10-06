import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, Clock, Weight, Flame, X, Heart, Watch } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface FinishWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmFinish: (
    durationMinutes: number,
    stats?: { caloriesBurned?: number; avgHeartRate?: number; maxHeartRate?: number }
  ) => void;
  completedSets: number;
  totalSets: number;
  totalVolumeKg: number;
  workoutName: string;
}

export const FinishWorkoutModal: React.FC<FinishWorkoutModalProps> = ({
  isOpen,
  onClose,
  onConfirmFinish,
  completedSets,
  totalSets,
  totalVolumeKg,
  workoutName
}) => {
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [caloriesBurned, setCaloriesBurned] = useState<string>('');
  const [avgHeartRate, setAvgHeartRate] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      soundManager.playTimerDoneSound(true);
      soundManager.vibrate([100, 50, 100, 50, 200], true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4FF00', '#30D158', '#0A84FF', '#FF9F0A', '#FFFFFF']
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const calories = caloriesBurned ? parseInt(caloriesBurned, 10) : undefined;
    const bpm = avgHeartRate ? parseInt(avgHeartRate, 10) : undefined;
    onConfirmFinish(durationMinutes, {
      caloriesBurned: isNaN(calories as number) ? undefined : calories,
      avgHeartRate: isNaN(bpm as number) ? undefined : bpm
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-white/10 p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mt-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-ios-accentGreen to-ios-accent flex items-center justify-center shadow-glow-green text-black mb-3">
            <Trophy className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Treino Concluído!
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Excelente trabalho em <strong className="text-zinc-200">{workoutName}</strong>
          </p>
        </div>

        {/* Resumo Séries e Volume */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          <div className="rounded-2xl bg-black/40 border border-white/5 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400 uppercase font-semibold">
              <CheckCircle className="w-3 h-3 text-ios-accent" />
              <span>Séries Feitas</span>
            </div>
            <p className="text-xl font-bold font-mono text-white mt-1">
              {completedSets} <span className="text-xs text-zinc-500 font-normal">/ {totalSets}</span>
            </p>
          </div>

          <div className="rounded-2xl bg-black/40 border border-white/5 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400 uppercase font-semibold">
              <Weight className="w-3 h-3 text-ios-accentGreen" />
              <span>Carga Total</span>
            </div>
            <p className="text-xl font-bold font-mono text-white mt-1">
              {totalVolumeKg.toLocaleString('pt-BR')} <span className="text-xs text-zinc-500 font-normal">kg</span>
            </p>
          </div>
        </div>

        {/* Duração aproximada */}
        <div className="rounded-2xl bg-black/40 border border-white/5 p-3.5 mb-3.5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-ios-accent" />
              Tempo total aproximado:
            </span>
            <span className="font-mono font-bold text-white text-sm">
              {durationMinutes} min
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="120"
            step="5"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
            className="w-full accent-ios-accent cursor-pointer"
          />
        </div>

        {/* Dados do Relógio (Redmi Watch 5 Lite / Mi Fitness) */}
        <div className="rounded-2xl bg-gradient-to-b from-zinc-800/60 to-zinc-950/70 border border-white/10 p-3.5 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
              <Watch className="w-3.5 h-3.5 text-[#0A84FF]" />
              <span>Dados do Relógio (Redmi Watch)</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Opcional</span>
          </div>
          <p className="text-[11px] text-zinc-400 mb-3">
            Veja no resumo do seu treino no relógio ou no Mi Fitness e anote abaixo:
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/50 rounded-xl p-2.5 border border-white/5 focus-within:border-orange-500/50 transition-colors">
              <label className="text-[10px] text-zinc-400 font-semibold uppercase flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                Calorias
              </label>
              <div className="flex items-baseline gap-1 mt-1">
                <input
                  type="number"
                  placeholder="Ex: 340"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                  className="w-full bg-transparent text-white font-mono font-bold text-base focus:outline-none placeholder:text-zinc-600"
                />
                <span className="text-[11px] text-zinc-500 font-mono">kcal</span>
              </div>
            </div>

            <div className="bg-black/50 rounded-xl p-2.5 border border-white/5 focus-within:border-red-500/50 transition-colors">
              <label className="text-[10px] text-zinc-400 font-semibold uppercase flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-500 fill-red-500/30" />
                Freq. Cardíaca
              </label>
              <div className="flex items-baseline gap-1 mt-1">
                <input
                  type="number"
                  placeholder="Ex: 132"
                  value={avgHeartRate}
                  onChange={(e) => setAvgHeartRate(e.target.value)}
                  className="w-full bg-transparent text-white font-mono font-bold text-base focus:outline-none placeholder:text-zinc-600"
                />
                <span className="text-[11px] text-zinc-500 font-mono">bpm</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl bg-ios-accent text-black font-extrabold text-sm tracking-wide shadow-glow-accent hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Flame className="w-4 h-4 fill-current" />
          <span>Salvar no Histórico & Resetar</span>
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2.5 py-2.5 text-xs text-zinc-400 hover:text-white font-medium"
        >
          Continuar no treino
        </button>
      </div>
    </div>
  );
};


