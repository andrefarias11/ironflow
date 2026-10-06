import React, { useState } from 'react';
import { Flame, Moon, X, Sparkles, Check, Clock } from 'lucide-react';
import { DayActivity, isScheduledRestDay } from '../utils/streak';

interface StreakFlameProps {
  currentStreak: number;
  percentage: number;
  isTodayRestDay: boolean;
  streakHistory: Record<string, DayActivity>;
}

export const StreakFlame: React.FC<StreakFlameProps> = ({
  currentStreak,
  percentage,
  isTodayRestDay,
  streakHistory
}) => {
  const [showModal, setShowModal] = useState(false);

  // Determina o estágio da chama (0% apagada, crescendo até 100% super acesa)
  const isSuperHot = percentage === 100;
  const isMedium = percentage >= 40 && percentage < 100;
  const isLow = percentage > 0 && percentage < 40;
  const isOff = percentage === 0;

  // Dias da semana atual (Seg a Dom)
  const getWeekDaysStatus = () => {
    const today = new Date();
    // Achar a segunda-feira da semana atual
    const dayOfWeek = today.getDay(); // 0 Dom, 1 Seg...
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
    <>
      {/* Botão da Chama (Header ou Progress) */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 active:scale-95 transition-all shadow-sm"
        title="Ver seu Streak de Treinos"
      >
        {/* Glow dinâmico atrás da chama */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-700 pointer-events-none"
          style={{
            background: isSuperHot
              ? 'radial-gradient(circle, rgba(255, 85, 0, 0.4) 0%, transparent 70%)'
              : isMedium
              ? 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)'
              : isLow
              ? 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, transparent 70%)'
              : 'none'
          }}
        />

        {/* Ícone da Chama Animada */}
        <div className="relative">
          <Flame
            className={`w-4 h-4 transition-all duration-500 ${
              isSuperHot
                ? 'text-[#FF5500] fill-[#FF5500] drop-shadow-[0_0_8px_#FF5500] scale-125 animate-pulse'
                : isMedium
                ? 'text-orange-500 fill-orange-500 drop-shadow-[0_0_5px_#F97316] scale-110'
                : isLow
                ? 'text-amber-500/80 fill-amber-500/60 scale-100'
                : 'text-zinc-600 fill-zinc-800 scale-95 opacity-60'
            }`}
          />

          {isSuperHot && (
            <Sparkles className="w-2.5 h-2.5 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
          )}
        </div>

        {/* Contador do Streak */}
        <div className="flex items-center gap-1">
          <span
            className={`font-mono text-xs font-black tracking-tight ${
              isSuperHot
                ? 'text-orange-400'
                : isMedium
                ? 'text-orange-300'
                : isLow
                ? 'text-amber-200'
                : 'text-zinc-400'
            }`}
          >
            {currentStreak}
          </span>
          <span className="text-[10px] text-zinc-500 uppercase font-semibold">
            {currentStreak === 1 ? 'dia' : 'dias'}
          </span>
        </div>

        {/* Badge se hoje for Descanso */}
        {isTodayRestDay && isOff && (
          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-0.5">
            <Moon className="w-2.5 h-2.5" /> descanso
          </span>
        )}
      </button>

      {/* Modal de Detalhes do Streak (Estilo Strava) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho de Destaque */}
            <div className="text-center mt-2 mb-6">
              <div
                className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center relative mb-3 transition-all ${
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
                  className={`w-12 h-12 ${
                    isSuperHot
                      ? 'text-white fill-white animate-pulse'
                      : isMedium
                      ? 'text-white fill-white'
                      : isLow
                      ? 'text-orange-400 fill-orange-400'
                      : 'text-zinc-500 fill-zinc-600'
                  }`}
                />
              </div>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-black font-mono text-white">
                  {currentStreak}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                  {currentStreak === 1 ? 'Dia de Sequência' : 'Dias de Sequência'}
                </span>
              </div>

              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                {isSuperHot
                  ? '🔥 Incrível! Você completou 100% do treino de hoje! A chama está no brilho máximo!'
                  : isMedium
                  ? '⚡ Treino em andamento! A chama vai brilhar ainda mais forte se você completar todas as séries!'
                  : isLow
                  ? 'Começou o treino! Complete as séries para a chama acender forte.'
                  : isTodayRestDay
                  ? '🌙 Hoje é dia de descanso programado. Sua sequência está segura e congelada!'
                  : 'Treine hoje para manter e aumentar a sua chama viva!'}
              </p>
            </div>

            {/* Visualizador Semanal Estilo Strava */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 my-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-3 text-center">
                Consistência na Semana
              </p>
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {weekDays.map((w, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-zinc-500 font-medium">{w.label}</span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all ${
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
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : w.isRest ? (
                        <Moon className="w-3.5 h-3.5 text-blue-400" />
                      ) : w.isToday ? (
                        <Flame className={`w-4 h-4 ${isOff ? 'text-zinc-500' : 'text-white fill-white'}`} />
                      ) : (
                        <span className="text-[11px] font-normal">{w.date}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regras Claras de Preservação */}
            <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-2 mb-4 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold text-[11px]">
                <Clock className="w-3.5 h-3.5 text-ios-accent" />
                <span>Como funciona o ciclo contínuo:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                • <strong>Treinos Livres:</strong> Treine qualquer dia da semana. O app acompanha seu ciclo contínuo de A a D.
              </p>
              <p className="text-[11px] leading-relaxed">
                • <strong>Dias de Folga Protegidos:</strong> Dias de descanso entre treinos e fins de semana <strong className="text-ios-accentGreen">nunca quebram seu streak</strong>.
              </p>
              <p className="text-[11px] leading-relaxed">
                • A chama <strong>acende no brilho máximo 🔥</strong> quando você completa todas as séries do dia!
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
            >
              Continuar Treinando
            </button>
          </div>
        </div>
      )}
    </>
  );
};
