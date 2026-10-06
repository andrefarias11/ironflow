import React from 'react';
import { Workout } from '../types/workout';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface WorkoutTabsProps {
  workouts: Workout[];
  activeWorkoutId: string;
  onSelectWorkout: (id: string) => void;
  onNewWorkout: () => void;
  completedWorkoutIdsThisWeek?: Set<string>;
  nextSuggestedWorkoutId?: string;
  missedWorkoutPrevWeek?: Workout | null;
}

export const WorkoutTabs: React.FC<WorkoutTabsProps> = ({
  workouts,
  activeWorkoutId,
  onSelectWorkout,
  onNewWorkout,
  completedWorkoutIdsThisWeek = new Set(),
  nextSuggestedWorkoutId = '',
  missedWorkoutPrevWeek = null
}) => {
  return (
    <div className="px-4 py-1 space-y-2">
      {/* Banner de sugestão inteligente caso tenha ficado um treino pendente da semana passada */}
      {missedWorkoutPrevWeek && !completedWorkoutIdsThisWeek.has(missedWorkoutPrevWeek.id) && (
        <div className="p-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/25 flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-zinc-200 text-[11px] leading-tight">
              Semana passada faltou <strong className="text-amber-300 font-bold">{missedWorkoutPrevWeek.name}</strong> ({missedWorkoutPrevWeek.category}). Quer começar por ele?
            </span>
          </div>
          <button
            onClick={() => onSelectWorkout(missedWorkoutPrevWeek.id)}
            className="shrink-0 ml-2 px-2.5 py-1 rounded-xl bg-amber-400 text-black font-bold text-[10px] flex items-center gap-1 active:scale-95 transition-all shadow-sm"
          >
            <span>Fazer</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Rotação Contínua de Treinos Base */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {workouts.map(w => {
          const isActive = w.id === activeWorkoutId;
          const isDoneThisWeek = completedWorkoutIdsThisWeek.has(w.id);
          const isSuggested = w.id === nextSuggestedWorkoutId && !isDoneThisWeek;

          return (
            <button
              key={w.id}
              onClick={() => onSelectWorkout(w.id)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 active:scale-95 relative border ${
                isActive
                  ? 'bg-white text-black shadow-md shadow-white/10 border-white'
                  : isSuggested
                  ? 'bg-zinc-900/90 text-zinc-100 border-ios-accent/50 hover:bg-zinc-850'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 border-white/5'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {/* Indicador de Feito na Semana */}
                {isDoneThisWeek ? (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-black text-white' : 'bg-ios-accentGreen text-black'
                  }`}>
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                ) : isSuggested ? (
                  <span className="w-2 h-2 rounded-full bg-ios-accent animate-pulse" />
                ) : null}

                <span className="font-bold">{w.name}</span>

                {w.category && (
                  <span className={`text-[10px] font-normal truncate max-w-[130px] ${
                    isActive ? 'text-zinc-600' : isSuggested ? 'text-zinc-300' : 'text-zinc-500'
                  }`}>
                    • {w.category}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        <button
          onClick={onNewWorkout}
          className="flex-shrink-0 px-3 py-2 rounded-2xl text-xs font-medium text-zinc-500 hover:text-zinc-300 bg-zinc-900/40 border border-dashed border-zinc-700/60 transition-colors"
        >
          + Novo
        </button>
      </div>
    </div>
  );
};

