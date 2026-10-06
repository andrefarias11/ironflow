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
  defaultRestTime: 60
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
    let justCompleted = false;
    let restSeconds = 60;

    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => {
        if (w.id !== activeWorkoutId) return w;

        return {
          ...w,
          exercises: w.exercises.map(ex => {
            if (ex.id !== exerciseId) return ex;
            restSeconds = ex.restSeconds || 60;

            return {
              ...ex,
              sets: ex.sets.map(s => {
                if (s.id !== setId) return s;
                const nextState = !s.completed;
                if (nextState) {
                  justCompleted = true;
                }
                return { ...s, completed: nextState };
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
      totalVolumeKg: progress.totalVolumeKg,
      durationMinutes: Math.max(1, durationMinutes),
      caloriesBurned: stats?.caloriesBurned,
      avgHeartRate: stats?.avgHeartRate,
      maxHeartRate: stats?.maxHeartRate
    };

    setHistory(prev => [entry, ...prev].slice(0, 50));
    resetWorkout();
  };

  const resetToDefault = () => {
    setWorkouts(DEFAULT_WORKOUTS);
    setActiveWorkoutId(DEFAULT_WORKOUTS[0].id);
  };

  return {
    workouts,
    activeWorkoutId,
    setActiveWorkoutId,
    activeWorkout,
    progress,
    history,
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
    resetToDefault,
    currentStreak,
    streakHistory,
    isTodayRestDay,
    cycleInfo
  };
}

