import { useState, useEffect, useMemo } from 'react';
import { Workout, Exercise, ExerciseSet, WorkoutHistoryEntry, UserPreferences } from '../types/workout';
import { DEFAULT_WORKOUTS } from '../data/defaultWorkouts';
import { DayActivity, calculateStreak, formatDateToKey, isScheduledRestDay, getWeekRange, getPreviousWeekRange } from '../utils/streak';

const STORAGE_KEYS = {
  WORKOUTS: 'treino_app_workouts_upper_lower_v3',
  ACTIVE_WORKOUT_ID: 'treino_app_active_id_upper_lower_v3',
  HISTORY: 'treino_app_history_v1',
  PREFERENCES: 'treino_app_preferences_v1',
  STREAK_HISTORY: 'treino_app_streak_history_v1'
};

const DEFAULT_PREFERENCES: UserPreferences = {
  soundEnabled: true,
  vibrateEnabled: true,
  autoStartTimer: true,
  defaultRestTime: 60,
  notificationsEnabled: true,
  dailyReminderHour: 18,
  motivationalQuotesEnabled: true
};

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading workouts from localStorage', e);
    }
    return DEFAULT_WORKOUTS;
  });

  const [activeWorkoutId, setActiveWorkoutId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT_ID);
      if (saved) return saved;
    } catch (e) {
      console.error('Error loading active ID', e);
    }
    return DEFAULT_WORKOUTS[0]?.id || '';
  });

  const [history, setHistory] = useState<WorkoutHistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading history', e);
    }
    return [];
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (saved) return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error loading preferences', e);
    }
    return DEFAULT_PREFERENCES;
  });

  const [streakHistory, setStreakHistory] = useState<Record<string, DayActivity>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading streak history', e);
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK_HISTORY, JSON.stringify(streakHistory));
    } catch (e) {
      console.error('Failed to save streak history', e);
    }
  }, [streakHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
    } catch (e) {
      console.error('Failed to save workouts', e);
    }
  }, [workouts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT_ID, activeWorkoutId);
    } catch (e) {
      console.error('Failed to save active workout ID', e);
    }
  }, [activeWorkoutId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save preferences', e);
    }
  }, [preferences]);

  const activeWorkout = useMemo(() => {
    return workouts.find(w => w.id === activeWorkoutId) || workouts[0] || null;
  }, [workouts, activeWorkoutId]);

  const progress = useMemo(() => {
    if (!activeWorkout) {
      return { totalSets: 0, completedSets: 0, percentage: 0, totalVolumeKg: 0, exercisesCount: 0 };
    }

    let totalSets = 0;
    let completedSets = 0;
    let totalVolumeKg = 0;

    activeWorkout.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        totalSets += 1;
        if (set.completed) {
          completedSets += 1;
          totalVolumeKg += (set.weight || 0) * (set.reps || 0);
        }
      });
    });

    const percentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

    return {
      totalSets,
      completedSets,
      percentage,
      totalVolumeKg,
      exercisesCount: activeWorkout.exercises.length
    };
  }, [activeWorkout]);

  // Atualiza atividade diária para o cálculo do Streak
  useEffect(() => {
    const todayKey = formatDateToKey(new Date());
    if (progress.completedSets > 0) {
      setStreakHistory(prev => {
        const current = prev[todayKey];
        if (
          current &&
          current.percentage === progress.percentage &&
          current.completedSets === progress.completedSets
        ) {
          return prev;
        }
        return {
          ...prev,
          [todayKey]: {
            date: todayKey,
            percentage: progress.percentage,
            completedSets: progress.completedSets,
            totalSets: progress.totalSets
          }
        };
      });
    }
  }, [progress.percentage, progress.completedSets, progress.totalSets]);

  // Sincroniza e consolida dias passados do streakHistory no histórico oficial
  useEffect(() => {
    const todayKey = formatDateToKey(new Date());

    setHistory(prevHistory => {
      let changed = false;
      const updatedHistory = [...prevHistory];
      const existingDateKeys = new Set(
        prevHistory.map(h => {
          try {
            return formatDateToKey(new Date(h.completedAt));
          } catch {
            return '';
          }
        })
      );

      Object.entries(streakHistory).forEach(([dateKey, activity]) => {
        if (activity && activity.completedSets > 0 && !existingDateKeys.has(dateKey) && dateKey !== todayKey) {
          const parts = dateKey.split('-').map(Number);
          const dateObj = new Date(parts[0], parts[1] - 1, parts[2], 18, 0, 0);

          const matchedWorkout = workouts.find(w => {
            const total = w.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
            return total === activity.totalSets;
          }) || workouts[0];

          const synthesizedEntry: WorkoutHistoryEntry = {
            id: `hist-streak-${dateKey}`,
            workoutId: matchedWorkout?.id || 'workout-1',
            workoutName: matchedWorkout?.name || 'Treino do Dia',
            completedAt: dateObj.toISOString(),
            totalSets: activity.totalSets || 12,
            completedSets: activity.completedSets,
            exercisesCount: matchedWorkout?.exercises?.length || 6,
            durationMinutes: Math.max(15, Math.round((activity.completedSets / (activity.totalSets || 12)) * 45)),
            caloriesBurned: Math.round((activity.completedSets / (activity.totalSets || 12)) * 320)
          };

          updatedHistory.push(synthesizedEntry);
          existingDateKeys.add(dateKey);
          changed = true;
        }
      });

      if (!changed) return prevHistory;

      return updatedHistory.sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
    });
  }, [streakHistory, workouts]);

  // Garante que todo item do histórico esteja refletido no streakHistory para marcar o calendário
  useEffect(() => {
    if (history.length === 0) return;

    setStreakHistory(prev => {
      let changed = false;
      const updated = { ...prev };

      history.forEach(item => {
        try {
          const dayKey = formatDateToKey(new Date(item.completedAt));
          if (!updated[dayKey]) {
            const pct = item.totalSets > 0 ? Math.round((item.completedSets / item.totalSets) * 100) : 100;
            updated[dayKey] = {
              date: dayKey,
              percentage: pct,
              completedSets: item.completedSets || 12,
              totalSets: item.totalSets || 12
            };
            changed = true;
          }
        } catch {}
      });

      return changed ? updated : prev;
    });
  }, [history]);

  // Análise Inteligente do Ciclo Semanal e Rotação Contínua
  const cycleInfo = useMemo(() => {
    const { start: weekStart, end: weekEnd } = getWeekRange(new Date());
    const { start: prevWeekStart, end: prevWeekEnd } = getPreviousWeekRange(new Date());

    // Treinos concluídos na semana atual (pelo histórico)
    const thisWeekHistory = history.filter(h => {
      const d = new Date(h.completedAt);
      return d >= weekStart && d <= weekEnd;
    });

    const completedWorkoutIdsThisWeek = new Set(thisWeekHistory.map(h => h.workoutId));

    // Treinos concluídos na semana anterior
    const prevWeekHistory = history.filter(h => {
      const d = new Date(h.completedAt);
      return d >= prevWeekStart && d <= prevWeekEnd;
    });
    const completedWorkoutIdsPrevWeek = new Set(prevWeekHistory.map(h => h.workoutId));

    // Identificar qual treino ficou pendente na semana passada (se treinou pelo menos 1 vez)
    let missedWorkoutPrevWeek: Workout | null = null;
    if (prevWeekHistory.length > 0 && prevWeekHistory.length < workouts.length) {
      const missed = workouts.find(w => !completedWorkoutIdsPrevWeek.has(w.id));
      if (missed) {
        missedWorkoutPrevWeek = missed;
      }
    }

    // Identificar o Próximo Treino Sugerido na Fila Contínua
    // 1) Primeiro, procura o primeiro treino do ciclo que ainda NÃO foi feito nesta semana
    let nextSuggestedWorkout = workouts.find(w => !completedWorkoutIdsThisWeek.has(w.id));

    // 2) Se todos já foram feitos nesta semana, sugere o primeiro do ciclo ou o que faz mais tempo
    if (!nextSuggestedWorkout && workouts.length > 0) {
      nextSuggestedWorkout = workouts[0];
    }

    return {
      completedWorkoutIdsThisWeek,
      nextSuggestedWorkoutId: nextSuggestedWorkout ? nextSuggestedWorkout.id : '',
      missedWorkoutPrevWeek,
      completedCountThisWeek: completedWorkoutIdsThisWeek.size,
      totalCycleWorkouts: workouts.length
    };
  }, [history, workouts]);

  const currentStreak = useMemo(() => {
    return calculateStreak(streakHistory);
  }, [streakHistory]);

  const isTodayRestDay = useMemo(() => {
    return isScheduledRestDay(new Date());
  }, []);

  const toggleSetComplete = (exerciseId: string, setId: string): { justCompleted: boolean; restSeconds: number } => {
    const currentEx = activeWorkout?.exercises.find(e => e.id === exerciseId);
    const currentSet = currentEx?.sets.find(s => s.id === setId);
    const justCompleted = currentSet ? !currentSet.completed : false;
    const restSeconds = currentEx?.restSeconds || 60;

    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;

        return {
          ...w,
          exercises: w.exercises.map(ex => {
            if (ex.id !== exerciseId) return ex;

            return {
              ...ex,
              sets: ex.sets.map(s => {
                if (s.id !== setId) return s;
                return { ...s, completed: !s.completed };
              })
            };
          })
        };
      })
    );

    return { justCompleted, restSeconds };
  };

  const updateSet = (
    exerciseId: string,
    setId: string,
    field: 'weight' | 'reps',
    val: number
  ) => {
    const value = Math.max(0, val);
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;
        return {
          ...w,
          exercises: w.exercises.map(ex => {
            if (ex.id !== exerciseId) return ex;
            return {
              ...ex,
              sets: ex.sets.map(s => {
                if (s.id !== setId) return s;
                return { ...s, [field]: value };
              })
            };
          })
        };
      })
    );
  };

  const addSet = (exerciseId: string) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;
        return {
          ...w,
          exercises: w.exercises.map(ex => {
            if (ex.id !== exerciseId) return ex;
            const lastSet = ex.sets[ex.sets.length - 1];
            const newSet: ExerciseSet = {
              id: `set-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              setNumber: ex.sets.length + 1,
              weight: lastSet ? lastSet.weight : 20,
              reps: lastSet ? lastSet.reps : 10,
              completed: false,
              previousWeight: lastSet ? lastSet.weight : 20,
              previousReps: lastSet ? lastSet.reps : 10,
            };
            return {
              ...ex,
              sets: [...ex.sets, newSet]
            };
          })
        };
      })
    );
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;
        return {
          ...w,
          exercises: w.exercises.map(ex => {
            if (ex.id !== exerciseId) return ex;
            if (ex.sets.length <= 1) return ex;
            const filtered = ex.sets.filter(s => s.id !== setId);
            const renumbered = filtered.map((s, idx) => ({ ...s, setNumber: idx + 1 }));
            return { ...ex, sets: renumbered };
          })
        };
      })
    );
  };

  const updateExerciseRest = (exerciseId: string, seconds: number) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;
        return {
          ...w,
          exercises: w.exercises.map(ex => {
            if (ex.id !== exerciseId) return ex;
            return { ...ex, restSeconds: Math.max(15, seconds) };
          })
        };
      })
    );
  };

  const addExercise = (exerciseData: Omit<Exercise, 'id' | 'sets'>) => {
    const newEx: Exercise = {
      id: `ex-${Date.now()}`,
      name: exerciseData.name,
      muscleGroup: exerciseData.muscleGroup || 'Geral',
      notes: exerciseData.notes || '',
      restSeconds: exerciseData.restSeconds || 60,
      sets: [
        { id: `s1-${Date.now()}`, setNumber: 1, weight: 20, reps: 10, completed: false },
        { id: `s2-${Date.now()}`, setNumber: 2, weight: 20, reps: 10, completed: false },
        { id: `s3-${Date.now()}`, setNumber: 3, weight: 20, reps: 10, completed: false },
      ]
    };

    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;
        return {
          ...w,
          exercises: [...w.exercises, newEx]
        };
      })
    );
  };

  const removeExercise = (exerciseId: string) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;
        return {
          ...w,
          exercises: w.exercises.filter(ex => ex.id !== exerciseId)
        };
      })
    );
  };

  const createWorkout = (name: string, category: string) => {
    const newWorkout: Workout = {
      id: `workout-${Date.now()}`,
      name: name.trim() || 'Novo Treino',
      category: category.trim() || 'Personalizado',
      description: 'Treino personalizado',
      exercises: []
    };
    setWorkouts(prev => [...prev, newWorkout]);
    setActiveWorkoutId(newWorkout.id);
  };

  const resetWorkout = () => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;
        return {
          ...w,
          exercises: w.exercises.map(ex => ({
            ...ex,
            sets: ex.sets.map(s => ({
              ...s,
              previousWeight: s.weight,
              previousReps: s.reps,
              completed: false
            }))
          }))
        };
      })
    );
  };

  const finishWorkout = (
    durationMinutes: number,
    stats?: { caloriesBurned?: number; avgHeartRate?: number; maxHeartRate?: number }
  ) => {
    if (!activeWorkout) return;

    const entry: WorkoutHistoryEntry = {
      id: `hist-${Date.now()}`,
      workoutId: activeWorkout.id,
      workoutName: activeWorkout.name,
      completedAt: new Date().toISOString(),
      totalSets: progress.totalSets,
      completedSets: progress.completedSets,
      exercisesCount: progress.exercisesCount,
      durationMinutes: Math.max(1, durationMinutes),
      caloriesBurned: stats?.caloriesBurned,
      avgHeartRate: stats?.avgHeartRate,
      maxHeartRate: stats?.maxHeartRate
    };

    setHistory(prev => [entry, ...prev].slice(0, 50));
    resetWorkout();
    return entry;
  };

  const addPastWorkoutEntry = (params: {
    workoutId: string;
    workoutName: string;
    completedAt: string;
    durationMinutes: number;
    exercisesCount?: number;
    caloriesBurned?: number;
  }): WorkoutHistoryEntry => {
    const dateObj = new Date(params.completedAt);
    const dayKey = formatDateToKey(dateObj);

    const entry: WorkoutHistoryEntry = {
      id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      workoutId: params.workoutId,
      workoutName: params.workoutName,
      completedAt: dateObj.toISOString(),
      totalSets: 12,
      completedSets: 12,
      exercisesCount: params.exercisesCount || 6,
      durationMinutes: Math.max(1, params.durationMinutes),
      caloriesBurned: params.caloriesBurned,
    };

    setHistory(prev => [entry, ...prev].sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    ));

    // Marca o dia retroativo como concluído no streakHistory
    setStreakHistory(prev => ({
      ...prev,
      [dayKey]: {
        date: dayKey,
        percentage: 100,
        completedSets: 12,
        totalSets: 12
      }
    }));

    return entry;
  };

  const deleteDayWorkout = (dateKey: string, entryId?: string): WorkoutHistoryEntry[] => {
    let removedEntries: WorkoutHistoryEntry[] = [];

    setHistory(prev => {
      const remaining: WorkoutHistoryEntry[] = [];
      prev.forEach(entry => {
        let entryDateKey = '';
        try {
          entryDateKey = formatDateToKey(new Date(entry.completedAt));
        } catch {}

        const isTarget = entryId ? entry.id === entryId : (entryDateKey === dateKey);

        if (isTarget) {
          removedEntries.push(entry);
        } else {
          remaining.push(entry);
        }
      });

      // Verifica se ainda sobraram outros treinos concluídos no mesmo dia
      const stillHasWorkoutOnDay = remaining.some(e => {
        try {
          return formatDateToKey(new Date(e.completedAt)) === dateKey;
        } catch {
          return false;
        }
      });

      // Se não sobrou nenhum treino para esse dia, remove do streakHistory
      if (!stillHasWorkoutOnDay) {
        setStreakHistory(prevStreak => {
          const nextStreak = { ...prevStreak };
          delete nextStreak[dateKey];
          return nextStreak;
        });
      }

      return remaining;
    });

    // Se o dia apagado for hoje, reseta os checkboxes de séries ativas
    const todayKey = formatDateToKey(new Date());
    if (dateKey === todayKey) {
      resetWorkout();
    }

    return removedEntries;
  };

  const resetToDefault = () => {
    setWorkouts(DEFAULT_WORKOUTS);
    setActiveWorkoutId(DEFAULT_WORKOUTS[0].id);
  };

  return {
    workouts,
    setWorkouts,
    activeWorkoutId,
    setActiveWorkoutId,
    activeWorkout,
    progress,
    history,
    setHistory,
    preferences,
    setPreferences,
    toggleSetComplete,
    updateSet,
    addSet,
    removeSet,
    updateExerciseRest,
    addExercise,
    removeExercise,
    createWorkout,
    resetWorkout,
    finishWorkout,
    addPastWorkoutEntry,
    deleteDayWorkout,
    resetToDefault,
    currentStreak,
    streakHistory,
    setStreakHistory,
    isTodayRestDay,
    cycleInfo
  };
}

