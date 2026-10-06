export interface ExerciseSet {
  id: string;
  setNumber: number;
  weight: number; // kg
  reps: number;
  completed: boolean;
  previousWeight?: number;
  previousReps?: number;
}

export interface ExerciseGuide {
  instructions: string[];
  tips: string[];
  mistakes: string[];
  primaryMuscle: string;
  secondaryMuscles?: string[];
  videoQuery?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  notes?: string;
  restSeconds: number; // descanso padrão entre séries
  sets: ExerciseSet[];
  guide?: ExerciseGuide;
}

export interface Workout {
  id: string;
  name: string;
  category: string;
  description?: string;
  exercises: Exercise[];
  lastCompleted?: string;
}

export interface WorkoutHistoryEntry {
  id: string;
  workoutId: string;
  workoutName: string;
  completedAt: string;
  totalSets: number;
  completedSets: number;
  totalVolumeKg: number;
  durationMinutes: number;
}

export interface UserPreferences {
  soundEnabled: boolean;
  vibrateEnabled: boolean;
  autoStartTimer: boolean;
  defaultRestTime: number;
}
