import React from 'react';
import { Flame, X, Sparkles, Check, Clock } from 'lucide-react';
import { DayActivity, isScheduledRestDay } from '../utils/streak';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreak: number;
  percentage: number;
  isTodayRestDay: boolean;
  streakHistory: Record<string, DayActivity>;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  currentStreak,
  percentage,
  isTodayRestDay,
  streakHistory
}) => {
  if (!isOpen) return null;

  const isSuperHot = percentage === 100;
  const isMedium = percentage >= 40 && percentage < 100;
  const isLow = percentage > 0 && percentage < 40;
  const isOff = percentage === 0;

  // Dias da semana atual (Seg a Dom)
  const getWeekDaysStatus = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const week = [];
    const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${dayStr}`;

      const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isToday = d.toDateString() === today.toDateString();
      const isRest = isScheduledRestDay(d);
      const activity = streakHistory[key];

      week.push({
        label: labels[i],
        date: d.getDate(),
        isToday,
        isPast,
        isRest,
        completed: activity ? activity.percentage > 0 : false,
        fullComplete: activity ? activity.percentage === 100 : false
      });
    }

    return week;
  };

  const weekDays = getWeekDaysStatus();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm max-h-[85vh] rounded-3xl bg-zinc-900 border border-white/10 flex flex-col shadow-2xl overflow-hidden relative">
        {/* Botão de Fechar fixo no topo direito */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Conteúdo rolável se necessário */}
        <div className="p-6 overflow-y-auto">
          {/* Cabeçalho de Destaque */}
          <div className="text-center mt-1 mb-4">
            <div
              className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center relative mb-3 transition-all ${
                isSuperHot
                  ? 'bg-gradient-to-tr from-red-600 via-orange-500 to-yellow-400 shadow-[0_0_25px_rgba(255,85,0,0.5)] scale-105'
                  : isMedium
                  ? 'bg-gradient-to-tr from-orange-600 to-amber-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : isLow
                  ? 'bg-zinc-800 border border-orange-500/30'
                  : 'bg-zinc-850 border border-white/10'
              }`}
            >
              <Flame
                className={`w-9 h-9 ${
                  isSuperHot
                    ? 'text-white fill-white animate-pulse'
                    : isMedium
                    ? 'text-white fill-white'
                    : isLow
                    ? 'text-orange-400 fill-orange-400'
                    : 'text-zinc-500 fill-zinc-600'
                }`}
              />
              {isSuperHot && (
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
              )}
            </div>

            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl font-black font-mono text-white">
                {currentStreak}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                {currentStreak === 1 ? 'Dia de Sequência' : 'Dias de Sequência'}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
              {isSuperHot
                ? '🔥 Incrível! Você completou 100% do treino de hoje! A chama está no brilho máximo!'
                : isMedium
                ? '⚡ Treino em andamento! Complete todas as séries para acender forte!'
                : isLow
                ? 'Começou o treino! A chama acende mais forte com as séries feitas.'
                : isTodayRestDay
                ? '🌙 Hoje é dia de descanso programado. Sua sequência está segura!'
                : 'Treine hoje para manter e aumentar a sua sequência viva!'}
            </p>
          </div>

          {/* Visualizador Semanal Estilo Strava */}
          <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 my-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5 text-center">
              Consistência na Semana
            </p>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekDays.map((w, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[9px] text-zinc-500 font-medium">{w.label}</span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      w.isToday
                        ? isSuperHot
                          ? 'bg-orange-500 text-white shadow-[0_0_10px_#F97316] ring-2 ring-white/40'
                          : isMedium || isLow
                          ? 'bg-amber-600 text-white ring-2 ring-orange-400'
                          : 'bg-zinc-800 text-white border border-white/30'
                        : w.completed
                        ? 'bg-ios-accentGreen text-black'
                        : w.isRest
                        ? 'bg-zinc-800/80 text-blue-300 border border-blue-500/20'
                        : w.isPast
                        ? 'bg-zinc-900 text-zinc-600'
                        : 'bg-zinc-900/40 text-zinc-700'
                    }`}
                  >
                    {w.completed ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : w.isToday ? (
                      <Flame className={`w-3.5 h-3.5 ${isOff ? 'text-zinc-500' : 'text-white fill-white'}`} />
                    ) : (
                      <span className="text-[10px] font-normal">{w.date}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regras Claras */}
          <div className="p-3 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1.5 mb-4 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-200 font-semibold text-[10px] uppercase tracking-wider">
              <Clock className="w-3 h-3 text-ios-accent" />
              <span>Regras de Preservação:</span>
            </div>
            <p className="leading-relaxed">
              • <strong>Ciclo Livre:</strong> Acompanhe seus treinos de A a D em qualquer dia.
            </p>
            <p className="leading-relaxed">
              • <strong>Folgas Protegidas:</strong> Fins de semana e descansos <strong className="text-ios-accentGreen">não quebram seu streak</strong>.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md"
          >
            Continuar Treinando
          </button>
        </div>
      </div>
    </div>
  );
};
