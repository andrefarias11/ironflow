import React, { useState } from 'react';
import { Exercise } from '../types/workout';
import { Check, Plus, Trash2, Clock, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface ExerciseCardProps {
  exercise: Exercise;
  position: number;
  soundEnabled?: boolean;
  vibrateEnabled?: boolean;
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
  position,
  soundEnabled = true,
  vibrateEnabled = true,
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
      soundManager.playCheckSound(soundEnabled);
      soundManager.vibrate(25, vibrateEnabled);
    } else {
      soundManager.playUncheckSound(soundEnabled);
    }
    onToggleSet(exercise.id, setId);
  };

  const restTimeOptions = [45, 60, 75, 90, 120];

  return (
    <article className={`exercise-card ${isAllComplete ? 'exercise-card-complete' : ''}`}>
      <div className="exercise-card-header">
        <div className="exercise-title-row">
          <span className="exercise-number">{String(position).padStart(2, '0')}</span>
          <div className="exercise-title-content"><h3>{exercise.name}</h3><span className="exercise-muscle">{exercise.muscleGroup || 'Geral'}</span></div>
          <button type="button" className="exercise-collapse" aria-label={isExpanded ? "Recolher exercício" : "Expandir exercício"} aria-expanded={isExpanded} aria-controls={`exercise-${exercise.id}`} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button>
        </div>
        {exercise.notes && <p className="exercise-notes">{exercise.notes}</p>}
        <div className="exercise-metadata">
          <button type="button" onClick={() => onOpenGuide(exercise)}><PlayCircle size={14} /> Técnica</button>
          <button type="button" aria-expanded={showRestPicker} onClick={() => setShowRestPicker(!showRestPicker)}><Clock size={14} /> {exercise.restSeconds || 60}s de descanso</button>
          <span className={`exercise-set-count ${isAllComplete ? 'is-complete' : ''}`}>{isAllComplete && <Check size={13} />}{isAllComplete ? 'Concluído' : `${completedSetsCount}/${totalSetsCount} séries`}</span>
        </div>
        <div className="exercise-mini-track" aria-hidden="true"><div style={{ width: `${exerciseProgressPct}%` }} /></div>
      </div>

      {showRestPicker && (
        <div className="rest-time-picker">
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
        <div id={`exercise-${exercise.id}`} className="exercise-table">
          <div className="set-grid set-grid-heading">
            <span className="set-cell">Série</span>
            <span className="set-cell">Anterior</span>
            <span className="set-cell">Carga (kg)</span>
            <span className="set-cell">Reps</span>
            <span className="set-cell">Feito</span>
          </div>

          <div className="space-y-1.5 mt-0.5">
            {exercise.sets.map((set) => {
              const partnerSet = partnerSets?.[`${exercise.id}_${set.setNumber}`];

              return (
                <div
                  key={set.id}
                  className={`set-grid set-row ${
                    set.completed
                      ? 'set-row-complete'
                      : ''
                  }`}
                >
                  <div className="set-cell">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold ${
                      set.completed ? 'bg-ios-accentGreen text-black' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {set.setNumber}
                    </span>
                  </div>

                  <div className="set-cell">
                    <span className="set-previous">
                      {set.previousWeight !== undefined ? `${set.previousWeight} × ${set.previousReps ?? 10}` : '—'}
                    </span>
                  </div>

                  <div className="set-cell">
                    <div className="set-input-wrap">
                      <input
                        aria-label={`Carga da série ${set.setNumber} de ${exercise.name}`}
                        inputMode="decimal"
                        type="number"
                        step="0.5"
                        min="0"
                        value={set.weight}
                        onChange={(e) => onUpdateSet(exercise.id, set.id, 'weight', parseFloat(e.target.value) || 0)}
                        className="w-full text-center bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="set-cell">
                    <div className="set-input-wrap">
                      <input
                        aria-label={`Repetições da série ${set.setNumber} de ${exercise.name}`}
                        inputMode="numeric"
                        type="number"
                        step="1"
                        min="0"
                        value={set.reps}
                        onChange={(e) => onUpdateSet(exercise.id, set.id, 'reps', parseInt(e.target.value, 10) || 0)}
                        className="w-full text-center bg-transparent text-white font-mono font-bold text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="set-cell set-completion-cell">
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
                      className={`set-check ${
                        set.completed
                          ? 'set-check-complete'
                          : ''
                      }`}
                      style={set.completed ? { backgroundColor: userColor || '#8da694' } : undefined}
                      aria-pressed={set.completed}
                      aria-label={`${set.completed ? "Desmarcar" : "Concluir"} série ${set.setNumber} de ${exercise.name}`}
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

          <div className="exercise-footer">
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

