import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Flame, 
  Moon, 
  Check, 
  Dumbbell, 
  Calendar as CalendarIcon, 
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';
import { DayActivity, isScheduledRestDay, formatDateToKey } from '../utils/streak';
import { WorkoutHistoryEntry, Workout } from '../types/workout';

interface MonthCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakHistory: Record<string, DayActivity>;
  workoutHistory: WorkoutHistoryEntry[];
  workouts?: Workout[];
  onAddPastWorkout?: (params: {
    workoutId: string;
    workoutName: string;
    completedAt: string;
    durationMinutes: number;
    exercisesCount?: number;
    caloriesBurned?: number;
  }) => void;
  onDeleteDayWorkout?: (dateKey: string, entryId?: string) => void;
}

export const MonthCalendarModal: React.FC<MonthCalendarModalProps> = ({
  isOpen,
  onClose,
  streakHistory,
  workoutHistory,
  workouts = [],
  onAddPastWorkout,
  onDeleteDayWorkout
}) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDayKey, setSelectedDayKey] = useState<string>(() => formatDateToKey(new Date()));
  const [isAddingPast, setIsAddingPast] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>(workouts[0]?.id || '');
  const [pastDuration, setPastDuration] = useState<number>(50);
  const [pastCalories, setPastCalories] = useState<number>(360);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  // Navegar meses
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleGoToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDayKey(formatDateToKey(today));
    setIsAddingPast(false);
  };

  // Gerar grid do mês (Começando na Segunda-feira)
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Converter domingo (0) para 6, e seg (1) para 0
  const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7;

  // Dias do mês anterior para completar o início
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const calendarCells = [];

  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    const dateObj = new Date(year, month - 1, d);
    calendarCells.push({
      day: d,
      dateObj,
      key: formatDateToKey(dateObj),
      isCurrentMonth: false,
    });
  }

  // Dias do mês atual
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    calendarCells.push({
      day: d,
      dateObj,
      key: formatDateToKey(dateObj),
      isCurrentMonth: true,
    });
  }

  // Completar dias para fechar a última linha da semana
  const remainingCells = 7 - (calendarCells.length % 7);
  if (remainingCells < 7) {
    for (let d = 1; d <= remainingCells; d++) {
      const dateObj = new Date(year, month + 1, d);
      calendarCells.push({
        day: d,
        dateObj,
        key: formatDateToKey(dateObj),
        isCurrentMonth: false,
      });
    }
  }

  const todayKey = formatDateToKey(new Date());

  // Dados do dia selecionado
  const selectedDayActivity = streakHistory[selectedDayKey];
  const selectedDateParts = selectedDayKey.split('-').map(Number);
  const selectedDateObj = new Date(selectedDateParts[0], selectedDateParts[1] - 1, selectedDateParts[2]);
  const isSelectedRest = isScheduledRestDay(selectedDateObj);

  // Busca se há treino registrado nesta data no workoutHistory
  const selectedWorkoutLog = workoutHistory.find(h => {
    try {
      const hDate = formatDateToKey(new Date(h.completedAt));
      return hDate === selectedDayKey;
    } catch {
      return false;
    }
  });

  const handleSaveRetroactive = () => {
    if (!onAddPastWorkout) return;
    const chosen = workouts.find(w => w.id === selectedWorkoutId) || workouts[0];
    if (!chosen) return;

    onAddPastWorkout({
      workoutId: chosen.id,
      workoutName: chosen.name,
      completedAt: selectedDateObj.toISOString(),
      durationMinutes: pastDuration || 50,
      exercisesCount: chosen.exercises?.length || 6,
      caloriesBurned: pastCalories || 360
    });

    setIsAddingPast(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-[#121316] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Cabeçalho do Modal */}
        <div className="p-4 px-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                Calendário de Treinos
              </h2>
              <p className="text-[11px] text-zinc-400">
                Histórico mensal de assiduidade
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-4 space-y-4 overflow-y-auto no-scrollbar flex-1">
          
          {/* Navegação de Mês */}
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-extrabold text-white">
              {monthNames[month]} <span className="text-zinc-500 font-mono text-xs">{year}</span>
            </h3>

            <div className="flex items-center gap-1">
              <button
                onClick={handleGoToToday}
                className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] font-bold text-zinc-300 transition-colors active:scale-95"
              >
                Hoje
              </button>
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Mês anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Próximo mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid do Calendário */}
          <div className="p-3 rounded-3xl bg-zinc-950/60 border border-white/5">
            {/* Cabeçalho dos dias da semana */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekDayLabels.map((day, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] font-mono uppercase tracking-wider ${
                    idx >= 5 ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Células de Dias */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarCells.map((cell, idx) => {
                const activity = streakHistory[cell.key];
                const isToday = cell.key === todayKey;
                const isSelected = cell.key === selectedDayKey;
                const isRest = isScheduledRestDay(cell.dateObj);

                const hasCompletedWorkout = activity && activity.percentage >= 100;
                const hasPartialWorkout = activity && activity.percentage > 0 && activity.percentage < 100;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedDayKey(cell.key);
                      setIsAddingPast(false);
                    }}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1 relative transition-all duration-150 active:scale-90 ${
                      !cell.isCurrentMonth
                        ? 'opacity-20 text-zinc-600'
                        : isSelected
                        ? 'ring-2 ring-orange-500 font-bold bg-white/10'
                        : isToday
                        ? 'bg-white/5 text-white font-bold border border-white/20'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-[11px] font-mono leading-none">
                      {cell.day}
                    </span>

                    {/* Marcador de Status do Dia */}
                    <div className="h-3 flex items-center justify-center mt-0.5">
                      {hasCompletedWorkout ? (
                        <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                      ) : hasPartialWorkout ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      ) : isRest && cell.isCurrentMonth ? (
                        <Moon className="w-2.5 h-2.5 text-blue-400/50" />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legenda Minimalista */}
            <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-around text-[10px] text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500" /> Treino 100%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400/50" /> Parcial
              </span>
              <span className="flex items-center gap-1">
                <Moon className="w-2.5 h-2.5 text-blue-400" /> Descanso
              </span>
            </div>
          </div>

          {/* Card de Detalhes do Dia Selecionado */}
          <div className="p-4 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  {selectedDateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {selectedDayActivity && selectedDayActivity.percentage > 0
                    ? `Treino: ${selectedDayActivity.percentage}% Concluído`
                    : isSelectedRest
                    ? '🌙 Dia de Descanso Programado'
                    : 'Sem treino registrado'}
                </h3>
              </div>

              {selectedDayActivity && selectedDayActivity.percentage === 100 && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold">
                  <Flame className="w-3 h-3 fill-current" />
                  <span>On Fire!</span>
                </div>
              )}
            </div>

            {/* Treino Existente neste dia */}
            {selectedDayActivity && selectedDayActivity.percentage > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-ios-accentGreen" />
                    <span>
                      <strong>{selectedDayActivity.completedSets}</strong> de {selectedDayActivity.totalSets} séries
                    </span>
                  </div>
                  {selectedWorkoutLog ? (
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-ios-accent" />
                      <span className="truncate">{selectedWorkoutLog.workoutName}</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center gap-2 text-zinc-400">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span>Treino Ativo</span>
                    </div>
                  )}
                </div>

                {/* Botão de Excluir Registro Deste Dia */}
                {onDeleteDayWorkout && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500">
                      Deseja desmarcar este dia?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const dateFormatted = selectedDateObj.toLocaleDateString('pt-BR');
                        if (confirm(`Tem certeza que deseja apagar o registro de treino do dia ${dateFormatted}?`)) {
                          onDeleteDayWorkout(selectedDayKey, selectedWorkoutLog?.id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-[11px] font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Apagar Registro Deste Dia</span>
                    </button>
                  </div>
                )}
              </>
            ) : isSelectedRest ? (
              <p className="text-xs text-zinc-400 pt-1 leading-relaxed">
                Dia dedicado para regeneração das fibras e crescimento muscular. Sua sequência permanece protegida!
              </p>
            ) : (
              <p className="text-xs text-zinc-500 pt-1">
                Nenhuma série registrada nesta data.
              </p>
            )}

            {/* FORMULÁRIO DE REGISTRO RETROATIVO */}
            {isAddingPast ? (
              <div className="pt-2 border-t border-white/5 space-y-3 animate-fadeIn">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
                  Registrar Treino Retroativo
                </span>

                {/* Selecionar Treino */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 block font-medium">Divisão Feita:</label>
                  <select
                    value={selectedWorkoutId}
                    onChange={(e) => setSelectedWorkoutId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                  >
                    {workouts.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} {w.category ? `(${w.category})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duração & Calorias */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block font-medium">Duração (min):</label>
                    <input
                      type="number"
                      min="1"
                      value={pastDuration}
                      onChange={(e) => setPastDuration(parseInt(e.target.value, 10) || 45)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block font-medium">Calorias (kcal):</label>
                    <input
                      type="number"
                      min="0"
                      value={pastCalories}
                      onChange={(e) => setPastCalories(parseInt(e.target.value, 10) || 350)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingPast(false)}
                    className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-bold transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveRetroactive}
                    className="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Salvar Treino</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Botão para abrir o formulário retroativo */
              onAddPastWorkout && (
                <div className="pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedWorkoutId && workouts[0]) {
                        setSelectedWorkoutId(workouts[0].id);
                      }
                      setIsAddingPast(true);
                    }}
                    className="w-full py-2.5 px-3 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Registrar Treino Neste Dia ({selectedDateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })})</span>
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-3 border-t border-white/10 bg-zinc-950/80">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
          >
            Fechar Calendário
          </button>
        </div>
      </div>
    </div>
  );
};
