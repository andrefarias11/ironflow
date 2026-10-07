import React, { useState } from 'react';
import { Exercise } from '../types/workout';
import { Check, Plus, Trash2, Clock, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface ExerciseCardProps {
  exercise: Exercise;
  onToggleSet: (exerciseId: string, setId: string) => void;
  onUpdateSet: (exerciseId: string, setId: string, field: 'weight' | 'reps', value: number) => void;
  onAddSet: (exerciseId: string) => void;
  onRemoveSet: (exerciseId: string, setId: string) => void;
  onRemoveExercise: (exerciseId: string) => void;
  onUpdateRestTime: (exerciseId: string, seconds: number) => void;
  onStartCustomTimer: (seconds: number, exerciseName: string) => void;
  onOpenGuide: (exercise: Exercise) => void;
  partnerSets?: Record<string, import('../types/auth').RoomSetEvent>;
  userColor?: string;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onToggleSet,
  onUpdateSet,
  onAddSet,
  onRemoveSet,
  onRemoveExercise,
  onUpdateRestTime,
  onStartCustomTimer,
  onOpenGuide,
  partnerSets,
  userColor
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showRestPicker, setShowRestPicker] = useState(false);

  const completedSetsCount = exercise.sets.filter(s => s.completed).length;
  const totalSetsCount = exercise.sets.length;
  const isAllComplete = completedSetsCount === totalSetsCount && totalSetsCount > 0;
  const exerciseProgressPct = totalSetsCount > 0 ? (completedSetsCount / totalSetsCount) * 100 : 0;

  const handleToggle = (setId: string, currentState: boolean) => {
    if (!currentState) {
      soundManager.playCheckSound(true);
      soundManager.vibrate(25, true);
    } else {
      soundManager.playUncheckSound(true);
    }
    onToggleSet(exercise.id, setId);
  };

  const restTimeOptions = [45, 60, 75, 90, 120];

  return (
    <article className="mx-4 my-3 rounded-3xl bg-zinc-950/80 border border-white/10 overflow-hidden shadow-lg transition-all duration-300">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center justify-between cursor-pointer select-none active:bg-white/5 transition-colors"
      >
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5 shrink-0">
              {exercise.muscleGroup || 'Geral'}
            </span>

            {/* Botão Ver Movimento */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenGuide(exercise);
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-ios-accent/15 text-ios-accent hover:bg-ios-accent/25 active:scale-95 transition-all text-[10px] font-bold whitespace-nowrap shrink-0"
              title="Ver movimento, postura e vídeo demonstrativo"
            >
              <PlayCircle className="w-3 h-3 shrink-0" />
              <span>Ver Movimento</span>
            </button>

            {isAllComplete && (
              <span className="text-[10px] font-bold text-ios-accentGreen flex items-center gap-1 shrink-0">
                <Check className="w-3 h-3 stroke-[3]" /> Concluído
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-1">
            {exercise.name}
          </h3>
          {exercise.notes && (
            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 italic">
              {exercise.notes}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex-1 h-1.5 rounded-full bg-zinc-800/80 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  isAllComplete ? 'bg-ios-accentGreen' : 'bg-ios-accent'
                }`}
                style={{ width: `${exerciseProgressPct}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 font-medium">
              {completedSetsCount}/{totalSetsCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowRestPicker(!showRestPicker);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 text-[11px] font-medium text-zinc-300 hover:text-white border border-white/5 active:scale-95 transition-all"
            title="Ajustar tempo de descanso"
          >
            <Clock className="w-3 h-3 text-ios-accent" />
            <span>{exercise.restSeconds || 60}s</span>
          </button>

          <div className="p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {showRestPicker && (
        <div className="px-4 py-2 bg-zinc-900/90 border-t border-b border-white/5 flex items-center justify-between animate-fadeIn">
          <span className="text-xs text-zinc-400 font-medium">Tempo de descanso:</span>
          <div className="flex items-center gap-1.5">
            {restTimeOptions.map(sec => (
              <button
                key={sec}
                onClick={() => {
                  onUpdateRestTime(exercise.id, sec);
                  setShowRestPicker(false);
                }}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  exercise.restSeconds === sec
                    ? 'bg-ios-accent text-black font-bold'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-white/5">
          <div className="grid grid-cols-12 gap-1 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 text-center">
            <span className="col-span-1 text-left">Set</span>
            <span className="col-span-3 text-center">Anterior</span>
            <span className="col-span-3 text-center">Carga (kg)</span>
            <span className="col-span-3 text-center">Reps</span>
            <span className="col-span-2 text-right">Feito</span>
          </div>

          <div className="space-y-1.5 mt-0.5">
            {exercise.sets.map((set) => {
              const partnerSet = partnerSets?.[`${exercise.id}_${set.setNumber}`];

              return (
                <div
                  key={set.id}
                  className={`grid grid-cols-12 gap-1 items-center px-2 py-2 rounded-2xl transition-all duration-200 ${
                    set.completed
                      ? 'bg-ios-accentGreen/10 border border-ios-accentGreen/20'
                      : 'bg-zinc-900/50 border border-white/5'
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold ${
                      set.completed ? 'bg-ios-accentGreen text-black' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {set.setNumber}
                    </span>
                  </div>

                  <div className="col-span-3 text-center">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {set.previousWeight !== undefined ? `${set.previousWeight}kg × ${set.previousReps || 10}` : '—'}
                    </span>
                  </div>

                  <div className="col-span-3 flex items-center justify-center">
                    <div className="relative flex items-center bg-black/60 rounded-xl border border-white/10 px-1 py-1 w-full max-w-[76px] justify-between">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={set.weight}
                        onChange={(e) => onUpdateSet(exercise.id, set.id, 'weight', parseFloat(e.target.value) || 0)}
                        className="w-full text-center bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                      />
                      <span className="text-[9px] text-zinc-500 pr-0.5 select-none font-medium">k</span>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center justify-center">
                    <div className="relative flex items-center bg-black/60 rounded-xl border border-white/10 px-1 py-1 w-full max-w-[64px] justify-between">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={set.reps}
                        onChange={(e) => onUpdateSet(exercise.id, set.id, 'reps', parseInt(e.target.value, 10) || 0)}
                        className="w-full text-center bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-1.5">
                    {partnerSet && partnerSet.completed && (
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-black shadow-md ring-1 ring-white/20 animate-scaleIn shrink-0"
                        style={{ backgroundColor: partnerSet.userColor || '#00E5FF' }}
                        title={`${partnerSet.userName} concluiu (${partnerSet.weight || 0}kg × ${partnerSet.reps || 0})`}
                      >
                        {partnerSet.userName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleToggle(set.id, set.completed)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
                        set.completed
                          ? 'text-black shadow-glow-green scale-100'
                          : 'bg-zinc-800/90 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-700/80 border border-white/10'
                      }`}
                      style={set.completed ? { backgroundColor: userColor || '#30D158' } : undefined}
                      aria-label={`Marcar série ${set.setNumber} como concluída`}
                    >
                      <Check className={`w-4 h-4 stroke-[3] transition-transform ${
                        set.completed ? 'scale-110' : 'scale-90 opacity-40'
                      }`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => onAddSet(exercise.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-medium active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-ios-accent" />
              <span>Adicionar Série</span>
            </button>

            <div className="flex items-center gap-1">
              {exercise.sets.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveSet(exercise.id, exercise.sets[exercise.sets.length - 1].id)}
                  className="px-2.5 py-1.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Remover última série"
                >
                  -1 série
                </button>
              )}

              <button
                type="button"
                onClick={() => onStartCustomTimer(exercise.restSeconds || 60, exercise.name)}
                className="px-2.5 py-1.5 rounded-xl text-zinc-400 hover:text-ios-accent hover:bg-white/5 transition-colors"
                title="Iniciar cronômetro de descanso para este exercício"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remover "${exercise.name}" do treino?`)) {
                    onRemoveExercise(exercise.id);
                  }
                }}
                className="p-1.5 rounded-xl text-zinc-600 hover:text-red-400 transition-colors"
                title="Excluir exercício"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

