export interface ExerciseSet {
  id: string;
  setNumber: number;
  reps: number;
  completed: boolean;
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
  repRange?: { min: number; max: number };
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
  templateVersion?: number;
  lastCompleted?: string;
}

export interface WorkoutHistoryEntry {
  id: string;
  workoutId: string;
  workoutName: string;
  completedAt: string;
  totalSets: number;
  completedSets: number;
  exercisesCount?: number;
  durationMinutes: number;
  caloriesBurned?: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
}

export interface UserPreferences {
  soundEnabled: boolean;
  vibrateEnabled: boolean;
  autoStartTimer: boolean;
  defaultRestTime: number;
}
