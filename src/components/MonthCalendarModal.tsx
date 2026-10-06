import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Flame, Moon, Check, Dumbbell, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { DayActivity, isScheduledRestDay, formatDateToKey } from '../utils/streak';
import { WorkoutHistoryEntry } from '../types/workout';

interface MonthCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakHistory: Record<string, DayActivity>;
  workoutHistory: WorkoutHistoryEntry[];
}

export const MonthCalendarModal: React.FC<MonthCalendarModalProps> = ({
  isOpen,
  onClose,
  streakHistory,
  workoutHistory
}) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDayKey, setSelectedDayKey] = useState<string>(() => formatDateToKey(new Date()));

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

  // Dias vazios/anteriores
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    const prevDate = new Date(year, month - 1, d);
    calendarCells.push({
      dateNumber: d,
      dateObj: prevDate,
      isCurrentMonth: false,
      key: formatDateToKey(prevDate)
    });
  }

  // Dias do mês atual
  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(year, month, d);
    calendarCells.push({
      dateNumber: d,
      dateObj: thisDate,
      isCurrentMonth: true,
      key: formatDateToKey(thisDate)
    });
  }

  // Dias do próximo mês para completar grade múltipla de 7
  const remainingCells = (7 - (calendarCells.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const nextDate = new Date(year, month + 1, d);
    calendarCells.push({
      dateNumber: d,
      dateObj: nextDate,
      isCurrentMonth: false,
      key: formatDateToKey(nextDate)
    });
  }

  const todayKey = formatDateToKey(new Date());

  // Dados do dia selecionado
  const selectedDayActivity = streakHistory[selectedDayKey];
  const selectedDateObj = new Date(selectedDayKey + 'T12:00:00');
  const isSelectedRest = isScheduledRestDay(selectedDateObj);
  const selectedWorkoutLog = workoutHistory.find(h => {
    try {
      return formatDateToKey(new Date(h.completedAt)) === selectedDayKey;
    } catch {
      return false;
    }
  });

  // Estatísticas do Mês Atual
  let totalWorkoutsInMonth = 0;
  let totalPerfectDaysInMonth = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    const k = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const act = streakHistory[k];
    if (act && act.percentage > 0) {
      totalWorkoutsInMonth++;
      if (act.percentage === 100) totalPerfectDaysInMonth++;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full sm:max-w-md max-h-[92vh] rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 flex flex-col shadow-2xl overflow-hidden">
        {/* Header do Calendário */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-ios-accent/15 flex items-center justify-center text-ios-accent">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                {monthNames[month]} {year}
              </h2>
              <p className="text-[11px] text-zinc-400">
                {totalWorkoutsInMonth} treinos realizados este mês
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleGoToToday}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-semibold text-zinc-300"
              title="Ir para hoje"
            >
              Hoje
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Calendário */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Navegação de Mês */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 active:scale-95 transition-all"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {monthNames[month]} de {year}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 active:scale-95 transition-all"
              aria-label="Próximo mês"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grade do Mês */}
          <div className="p-3.5 rounded-3xl bg-zinc-950/80 border border-white/5 shadow-inner">
            {/* Cabeçalho dos Dias da Semana */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekDayLabels.map((lbl, idx) => (
                <span
                  key={lbl}
                  className={`text-[10px] font-semibold uppercase tracking-wider py-1 ${
                    idx === 2 || idx === 5 || idx === 6 ? 'text-blue-400/70' : 'text-zinc-500'
                  }`}
                >
                  {lbl}
                </span>
              ))}
            </div>

            {/* Células dos Dias */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {calendarCells.map((cell) => {
                const activity = streakHistory[cell.key];
                const hasTrained = activity && activity.percentage > 0;
                const is100 = activity && activity.percentage === 100;
                const isRest = isScheduledRestDay(cell.dateObj);
                const isToday = cell.key === todayKey;
                const isSelected = cell.key === selectedDayKey;

                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => setSelectedDayKey(cell.key)}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-1 transition-all duration-200 active:scale-90 ${
                      !cell.isCurrentMonth
                        ? 'opacity-20 pointer-events-none'
                        : isSelected
                        ? 'ring-2 ring-white shadow-md shadow-white/20 scale-105 z-10'
                        : ''
                    } ${
                      is100
                        ? 'bg-gradient-to-tr from-orange-600 to-yellow-500 text-black font-extrabold shadow-glow-accent'
                        : hasTrained
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                        : isToday
                        ? 'bg-white/15 text-white border border-white/30 font-bold'
                        : isRest
                        ? 'bg-zinc-900/60 text-blue-300/60'
                        : 'bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800/60'
                    }`}
                  >
                    <span className="text-xs font-mono">{cell.dateNumber}</span>

                    {/* Mini indicador em baixo do número */}
                    <div className="h-3 flex items-center justify-center mt-0.5">
                      {is100 ? (
                        <Flame className="w-3 h-3 text-white fill-white" />
                      ) : hasTrained ? (
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
          <div className="p-4 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-2">
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

            {selectedDayActivity && selectedDayActivity.percentage > 0 ? (
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/5 flex items-center gap-2">
                  <Check className="w-4 h-4 text-ios-accentGreen" />
                  <span>
                    <strong>{selectedDayActivity.completedSets}</strong> de {selectedDayActivity.totalSets} séries
                  </span>
                </div>
                {selectedWorkoutLog ? (
                  <div className="p-2.5 rounded-xl bg-white/5 flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-ios-accent" />
                    <span>{selectedWorkoutLog.totalVolumeKg.toLocaleString('pt-BR')} kg</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-white/5 flex items-center gap-2 text-zinc-400">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span>Treino Ativo</span>
                  </div>
                )}
              </div>
            ) : isSelectedRest ? (
              <p className="text-xs text-zinc-400 pt-1 leading-relaxed">
                Quartas e fins de semana são dias dedicados para sua suplementação agir, regeneração das fibras e crescimento muscular. Sua sequência permanece protegida!
              </p>
            ) : (
              <p className="text-xs text-zinc-500 pt-1">
                Nenhuma série registrada nesta data.
              </p>
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
