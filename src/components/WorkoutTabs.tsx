import React from 'react';
import { Workout } from '../types/workout';
import { Check, Sparkles, ArrowRight, Lock, Plus } from 'lucide-react';

interface WorkoutTabsProps {
  workouts: Workout[];
  activeWorkoutId: string;
  onSelectWorkout: (id: string) => void;
  onNewWorkout: () => void;
  completedWorkoutIdsThisWeek?: Set<string>;
  nextSuggestedWorkoutId?: string;
  missedWorkoutPrevWeek?: Workout | null;
  isInRoom?: boolean;
  roomWorkoutName?: string;
}

export const WorkoutTabs: React.FC<WorkoutTabsProps> = ({
  workouts,
  activeWorkoutId,
  onSelectWorkout,
  onNewWorkout,
  completedWorkoutIdsThisWeek = new Set(),
  nextSuggestedWorkoutId = '',
  missedWorkoutPrevWeek = null,
  isInRoom = false,
  roomWorkoutName,
}) => {
  const currentWorkout = workouts.find((w) => w.id === activeWorkoutId);

  return (
    <div className="workout-selector">
      {/* Se estiver em sala em dupla: exibe apenas o treino da sala e bloqueia a troca */}
      {isInRoom ? (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-950/40 via-zinc-900 to-zinc-950 border border-orange-500/40 flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white tracking-wide truncate">
                  {currentWorkout?.name || roomWorkoutName || 'Treino da Sala'}
                </span>
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0">
                  TREINO DA SALA
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                {currentWorkout?.category || 'Sessão em Dupla Ativa'} • Outros treinos bloqueados
              </p>
            </div>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono shrink-0 pl-2">
            🔒 Sincronizado
          </span>
        </div>
      ) : (
        <>
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

          <div className="workout-options" role="group" aria-label="Fichas de treino">
            {workouts.map((workout) => {
              const isActive = workout.id === activeWorkoutId;
              const isDone = completedWorkoutIdsThisWeek.has(workout.id);
              const isSuggested = workout.id === nextSuggestedWorkoutId && !isDone;
              return (
                <button key={workout.id} aria-pressed={isActive} onClick={() => onSelectWorkout(workout.id)} className="workout-option">
                  <span className="workout-option-title">{workout.name}{isActive ? <span className="workout-selected-dot" aria-hidden="true" /> : isDone ? <Check size={14} aria-label="Feito nesta semana" /> : null}</span>
                  <span className="workout-option-category">{workout.category || 'Personalizado'}</span>
                  <span className="workout-option-status">{isDone ? 'Feito na semana' : isActive ? 'Ficha selecionada' : isSuggested ? 'Próximo na sequência' : `${workout.exercises.length} exercícios`}</span>
                </button>
              );
            })}
          </div>
          <button className="new-workout-button" onClick={onNewWorkout}><Plus size={14} /> Nova ficha</button>
        </>
      )}
    </div>
  );
};
