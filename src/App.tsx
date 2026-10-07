import { useState, useEffect } from 'react';
import { useWorkouts } from './hooks/useWorkouts';
import { Header } from './components/Header';
import { OverallProgress } from './components/OverallProgress';
import { WorkoutTabs } from './components/WorkoutTabs';
import { ExerciseCard } from './components/ExerciseCard';
import { RestTimerBar } from './components/RestTimerBar';
import { FinishWorkoutModal } from './components/FinishWorkoutModal';
import { HistoryModal } from './components/HistoryModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { NewExerciseModal } from './components/NewExerciseModal';
import { NewWorkoutModal } from './components/NewWorkoutModal';
import { SettingsModal } from './components/SettingsModal';
import { ExerciseGuideModal } from './components/ExerciseGuideModal';
import { MonthCalendarModal } from './components/MonthCalendarModal';
import { StreakModal } from './components/StreakModal';
import { ShareStoryModal } from './components/ShareStoryModal';
import { Exercise, WorkoutHistoryEntry } from './types/workout';
import { Plus, Dumbbell } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { useWorkoutRoom } from './hooks/useWorkoutRoom';
import { AuthModal } from './components/AuthModal';
import { WorkoutRoomModal } from './components/WorkoutRoomModal';
import { RoomLiveBar } from './components/RoomLiveBar';
import { workoutSyncService } from './services/workoutSync';

export function App() {
  const {
    workouts,
    activeWorkoutId,
    setActiveWorkoutId,
    activeWorkout,
    progress,
    history,
    preferences,
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
    setPreferences,
    resetToDefault,
    currentStreak,
    streakHistory,
    isTodayRestDay,
    cycleInfo
  } = useWorkouts();

  // Autenticação e Perfil
  const { user, profile } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);

  // Sala de Treino em Dupla (Multiplayer Realtime)
  const {
    activeRoom,
    members,
    partnerSets,
    latestReaction,
    syncedRestTimer,
    createRoom,
    joinRoom,
    leaveRoom,
    broadcastSetProgress,
    broadcastReaction,
    broadcastRestTimer
  } = useWorkoutRoom();

  // Estados dos Modais
  const [isStreakOpen, setIsStreakOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFinishWorkoutOpen, setIsFinishWorkoutOpen] = useState(false);
  const [isNewExerciseOpen, setIsNewExerciseOpen] = useState(false);
  const [isNewWorkoutOpen, setIsNewWorkoutOpen] = useState(false);
  const [selectedGuideExercise, setSelectedGuideExercise] = useState<Exercise | null>(null);
  const [storyData, setStoryData] = useState<{
    workoutName: string;
    category?: string;
    completedSets: number;
    totalSets: number;
    exercisesCount?: number;
    durationMinutes: number;
    caloriesBurned?: number;
    avgHeartRate?: number;
  } | null>(null);

  // Estados do Cronômetro de Descanso
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimerTime, setTotalTimerTime] = useState(60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timerExerciseName, setTimerExerciseName] = useState<string | undefined>(undefined);

  // Loop do Cronômetro de Descanso
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (timerActive && !isTimerPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isTimerPaused, timeLeft]);

  // Sincroniza cronômetro acionado pelo parceiro de treino
  useEffect(() => {
    if (syncedRestTimer) {
      startRestTimer(syncedRestTimer.seconds, `Iniciado por ${syncedRestTimer.startedBy}`);
    }
  }, [syncedRestTimer]);

  // Sincronização em nuvem quando o usuário está autenticado
  useEffect(() => {
    if (user && workouts.length > 0) {
      workoutSyncService.saveWorkoutsToCloud(user.id, workouts, activeWorkoutId);
    }
  }, [user, workouts, activeWorkoutId]);

  const startRestTimer = (seconds: number, exerciseName?: string) => {
    const validSec = Math.max(5, seconds);
    setTotalTimerTime(validSec);
    setTimeLeft(validSec);
    setIsTimerPaused(false);
    setTimerActive(true);
    setTimerExerciseName(exerciseName);
  };

  const handleToggleSet = (exerciseId: string, setId: string) => {
    const { justCompleted, restSeconds } = toggleSetComplete(exerciseId, setId);

    const currentEx = activeWorkout?.exercises.find(e => e.id === exerciseId);
    const targetSet = currentEx?.sets.find(s => s.id === setId);

    if (justCompleted && preferences.autoStartTimer) {
      startRestTimer(restSeconds || preferences.defaultRestTime, currentEx?.name);
      if (activeRoom) {
        broadcastRestTimer(restSeconds || preferences.defaultRestTime);
      }
    }

    // Se estiver em sala com parceiro, envia a atualização em tempo real
    if (activeRoom && targetSet) {
      broadcastSetProgress(exerciseId, targetSet.setNumber, justCompleted, targetSet.weight, targetSet.reps);
    }
  };

  const handleConfirmFinish = (
    durationMinutes: number,
    stats?: { caloriesBurned?: number; avgHeartRate?: number; maxHeartRate?: number }
  ) => {
    finishWorkout(durationMinutes, stats);
    if (user) {
      workoutSyncService.saveWorkoutsToCloud(user.id, workouts, activeWorkoutId);
    }
    setIsFinishWorkoutOpen(false);
    setTimerActive(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans safe-bottom">
      {/* 1. Cabeçalho iOS Minimalista */}
      <Header
        onOpenCalendar={() => setIsCalendarOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenStreakModal={() => setIsStreakOpen(true)}
        onOpenRoomModal={() => setIsRoomOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        currentStreak={currentStreak}
        percentage={progress.percentage}
        isTodayRestDay={isTodayRestDay}
        isInRoom={!!activeRoom}
        userName={profile?.name}
        userColor={profile?.color}
        isLoggedIn={!!user}
      />

      {/* Barra de Treino em Dupla (Quando sala estiver ativa) */}
      {activeRoom && (
        <RoomLiveBar
          activeRoom={activeRoom}
          members={members}
          currentUserId={user?.id}
          latestReaction={latestReaction}
          onSendReaction={broadcastReaction}
          onOpenRoomModal={() => setIsRoomOpen(true)}
          onLeaveRoom={leaveRoom}
        />
      )}

      {/* 2. Seletor de Divisões de Treino */}
      <div className="pt-2">
        <WorkoutTabs
          workouts={workouts}
          activeWorkoutId={activeWorkoutId}
          onSelectWorkout={(id) => setActiveWorkoutId(id)}
          onNewWorkout={() => setIsNewWorkoutOpen(true)}
          completedWorkoutIdsThisWeek={cycleInfo.completedWorkoutIdsThisWeek}
          nextSuggestedWorkoutId={cycleInfo.nextSuggestedWorkoutId}
          missedWorkoutPrevWeek={cycleInfo.missedWorkoutPrevWeek}
        />
      </div>

      {/* 3. Barra de Progresso Geral & Métricas */}
      <OverallProgress
        percentage={progress.percentage}
        completedSets={progress.completedSets}
        totalSets={progress.totalSets}
        exercisesCount={progress.exercisesCount}
        onFinishWorkout={() => setIsFinishWorkoutOpen(true)}
      />

      {/* 4. Lista de Exercícios */}
      <main className="flex-1 pb-24">
        {activeWorkout && activeWorkout.exercises.length > 0 ? (
          <div>
            {activeWorkout.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onToggleSet={handleToggleSet}
                onUpdateSet={updateSet}
                onAddSet={addSet}
                onRemoveSet={removeSet}
                onRemoveExercise={removeExercise}
                onUpdateRestTime={updateExerciseRest}
                onStartCustomTimer={(sec, name) => startRestTimer(sec, name)}
                onOpenGuide={(ex) => setSelectedGuideExercise(ex)}
                partnerSets={partnerSets}
                userColor={profile?.color || '#30D158'}
              />
            ))}

            <div className="px-4 mt-4 mb-8">
              <button
                type="button"
                onClick={() => setIsNewExerciseOpen(true)}
                className="w-full py-3.5 rounded-3xl bg-zinc-950/70 hover:bg-zinc-900 border border-dashed border-white/15 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <Plus className="w-4 h-4 text-ios-accent" />
                <span>Adicionar Exercício a este treino</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-6">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-600 mb-3">
              <Dumbbell className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="text-base font-bold text-white">Nenhum exercício cadastrado</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              Adicione os exercícios para começar a marcar suas séries e acompanhar seu progresso.
            </p>
            <button
              onClick={() => setIsNewExerciseOpen(true)}
              className="mt-5 px-5 py-3 rounded-2xl bg-ios-accent text-black font-bold text-xs uppercase tracking-wider shadow-glow-accent active:scale-95 transition-all"
            >
              + Adicionar Primeiro Exercício
            </button>
          </div>
        )}
      </main>

      {/* 5. Cronômetro de Descanso Flutuante */}
      <RestTimerBar
        isActive={timerActive}
        timeLeft={timeLeft}
        totalTime={totalTimerTime}
        isPaused={isTimerPaused}
        exerciseName={timerExerciseName}
        onPauseToggle={() => setIsTimerPaused(!isTimerPaused)}
        onAddSeconds={(sec) => setTimeLeft(prev => prev + sec)}
        onStop={() => setTimerActive(false)}
      />

      {/* 6. Modais */}
      <FinishWorkoutModal
        isOpen={isFinishWorkoutOpen}
        onClose={() => setIsFinishWorkoutOpen(false)}
        onConfirmFinish={handleConfirmFinish}
        onOpenShareStory={(stats) => {
          setStoryData({
            workoutName: activeWorkout?.name || 'Treino Concluído',
            category: activeWorkout?.category,
            completedSets: progress.completedSets,
            totalSets: progress.totalSets,
            exercisesCount: progress.exercisesCount,
            durationMinutes: stats.durationMinutes,
            caloriesBurned: stats.caloriesBurned,
            avgHeartRate: stats.avgHeartRate
          });
        }}
        completedSets={progress.completedSets}
        totalSets={progress.totalSets}
        exercisesCount={progress.exercisesCount}
        workoutName={activeWorkout?.name || 'Treino'}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={() => {
          localStorage.removeItem('treino_app_history_v1');
          window.location.reload();
        }}
        onShareEntry={(entry: WorkoutHistoryEntry) => {
          setStoryData({
            workoutName: entry.workoutName,
            category: 'Treino Finalizado',
            completedSets: entry.completedSets,
            totalSets: entry.totalSets,
            exercisesCount: entry.exercisesCount || 6,
            durationMinutes: entry.durationMinutes,
            caloriesBurned: entry.caloriesBurned,
            avgHeartRate: entry.avgHeartRate
          });
        }}
      />

      <InstallGuideModal
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
      />

      <NewExerciseModal
        isOpen={isNewExerciseOpen}
        onClose={() => setIsNewExerciseOpen(false)}
        onAddExercise={addExercise}
      />

      <NewWorkoutModal
        isOpen={isNewWorkoutOpen}
        onClose={() => setIsNewWorkoutOpen(false)}
        onCreateWorkout={createWorkout}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onUpdatePreferences={setPreferences}
        onResetToDefaults={resetToDefault}
        onOpenInstallGuide={() => setIsInstallGuideOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onResetWorkout={resetWorkout}
      />

      <ExerciseGuideModal
        exercise={selectedGuideExercise}
        onClose={() => setSelectedGuideExercise(null)}
      />

      <MonthCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        streakHistory={streakHistory}
        workoutHistory={history}
      />

      <StreakModal
        isOpen={isStreakOpen}
        onClose={() => setIsStreakOpen(false)}
        currentStreak={currentStreak}
        percentage={progress.percentage}
        isTodayRestDay={isTodayRestDay}
        streakHistory={streakHistory}
      />

      {storyData && (
        <ShareStoryModal
          isOpen={!!storyData}
          onClose={() => setStoryData(null)}
          workoutName={storyData.workoutName}
          category={storyData.category}
          completedSets={storyData.completedSets}
          totalSets={storyData.totalSets}
          exercisesCount={storyData.exercisesCount}
          durationMinutes={storyData.durationMinutes}
          caloriesBurned={storyData.caloriesBurned}
          avgHeartRate={storyData.avgHeartRate}
          currentStreak={currentStreak}
        />
      )}

      {/* Modal de Autenticação e Perfil do Atleta */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Modal de Sala de Treino em Dupla */}
      <WorkoutRoomModal
        isOpen={isRoomOpen}
        onClose={() => setIsRoomOpen(false)}
        activeRoom={activeRoom}
        members={members}
        currentWorkoutName={activeWorkout?.name || 'Treino do Dia'}
        category={activeWorkout?.category}
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        onLeaveRoom={leaveRoom}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </div>
  );
}

export default App;

