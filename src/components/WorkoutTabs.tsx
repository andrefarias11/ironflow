import React from 'react';
import { Workout } from '../types/workout';

interface WorkoutTabsProps {
  workouts: Workout[];
  activeWorkoutId: string;
  onSelectWorkout: (id: string) => void;
  onNewWorkout: () => void;
}

export const WorkoutTabs: React.FC<WorkoutTabsProps> = ({
  workouts,
  activeWorkoutId,
  onSelectWorkout,
  onNewWorkout
}) => {
  return (
    <div className="px-4 py-1">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {workouts.map(w => {
          const isActive = w.id === activeWorkoutId;
          return (
            <button
              key={w.id}
              onClick={() => onSelectWorkout(w.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-white text-black shadow-md shadow-white/10'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 border border-white/5'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{w.name}</span>
                {w.category && (
                  <span className={`text-[10px] font-normal ${isActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
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

