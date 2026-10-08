import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Workout, WorkoutHistoryEntry } from '../types/workout';

export const workoutSyncService = {
  /**
   * Salva as rotinas de treino do usuário na nuvem
   */
  async saveWorkoutsToCloud(userId: string, workouts: Workout[], activeWorkoutId?: string) {
    if (!isSupabaseConfigured || !userId) return;

    try {
      await supabase.from('user_workouts').upsert({
        user_id: userId,
        workouts_data: workouts,
        active_workout_id: activeWorkoutId,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    } catch (err) {
      console.error('Erro ao salvar treinos na nuvem', err);
    }
  },

  /**
   * Carrega as rotinas de treino salvas na nuvem para o usuário
   */
  async loadWorkoutsFromCloud(userId: string): Promise<{ workouts: Workout[] | null; activeWorkoutId: string | null }> {
    if (!isSupabaseConfigured || !userId) return { workouts: null, activeWorkoutId: null };

    try {
      const { data, error } = await supabase
        .from('user_workouts')
        .select('workouts_data, active_workout_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !data) return { workouts: null, activeWorkoutId: null };

      return {
        workouts: data.workouts_data as Workout[],
        activeWorkoutId: data.active_workout_id,
      };
    } catch (err) {
      console.error('Erro ao carregar treinos da nuvem', err);
      return { workouts: null, activeWorkoutId: null };
    }
  },

  /**
   * Salva um treino concluído no histórico em nuvem
   */
  async saveHistoryEntryToCloud(userId: string, entry: WorkoutHistoryEntry) {
    if (!isSupabaseConfigured || !userId) return;

    try {
      await supabase.from('workout_history').insert({
        user_id: userId,
        workout_id: entry.workoutId,
        workout_name: entry.workoutName,
        category: '',
        completed_at: entry.completedAt,
        duration_minutes: entry.durationMinutes,
        completed_sets: entry.completedSets,
        total_sets: entry.totalSets,
        exercises_count: entry.exercisesCount || 0,
        calories_burned: entry.caloriesBurned,
      });
    } catch (err) {
      console.error('Erro ao salvar histórico na nuvem', err);
    }
  },

  /**
   * Carrega o histórico completo de treinos do usuário na nuvem
   */
  async loadHistoryFromCloud(userId: string): Promise<WorkoutHistoryEntry[] | null> {
    if (!isSupabaseConfigured || !userId) return null;

    try {
      const { data, error } = await supabase
        .from('workout_history')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item) => ({
        id: item.id,
        workoutId: item.workout_id || '',
        workoutName: item.workout_name,
        completedAt: item.completed_at,
        durationMinutes: item.duration_minutes,
        completedSets: item.completed_sets,
        totalSets: item.total_sets,
        exercisesCount: item.exercises_count,
        caloriesBurned: item.calories_burned,
      }));
    } catch (err) {
      console.error('Erro ao buscar histórico da nuvem', err);
      return null;
    }
  },

  /**
   * Remove registros de treino de um dia específico ou por IDs no Supabase
   */
  async deleteHistoryEntryFromCloud(
    userId: string,
    options: { entryIds?: string[]; dateKey?: string; deleteAllDay?: boolean }
  ) {
    if (!isSupabaseConfigured || !userId) return;

    try {
      const { entryIds = [], dateKey, deleteAllDay = false } = options;

      // 1. Deletar por IDs válidos do banco (UUID)
      const validUuids = entryIds.filter(id => id && !id.startsWith('hist-'));
      if (validUuids.length > 0) {
        await supabase
          .from('workout_history')
          .delete()
          .in('id', validUuids)
          .eq('user_id', userId);
      }

      // 2. Deletar por data no Supabase se for para apagar o dia todo ou se eram IDs locais
      if (dateKey && (deleteAllDay || validUuids.length === 0)) {
        const parts = dateKey.split('-').map(Number);
        const startOfDay = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0).toISOString();
        const endOfDay = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59, 999).toISOString();

        await supabase
          .from('workout_history')
          .delete()
          .eq('user_id', userId)
          .gte('completed_at', startOfDay)
          .lte('completed_at', endOfDay);
      }
    } catch (err) {
      console.error('Erro ao deletar histórico da nuvem', err);
    }
  }
};

