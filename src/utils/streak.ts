export interface DayActivity {
  date: string; // YYYY-MM-DD
  percentage: number;
  completedSets: number;
  totalSets: number;
}

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastTrainedDate: string | null;
  history: Record<string, DayActivity>;
}

// Retorna se o dia da semana é dia de descanso programado
// 0 = Domingo, 1 = Segunda, 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado
export function isScheduledRestDay(date: Date): boolean {
  const day = date.getDay();
  // Quarta (3), Sábado (6) e Domingo (0) são dias de descanso
  return day === 3 || day === 6 || day === 0;
}

export function formatDateToKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calcula o streak retroativo a partir de hoje
export function calculateStreak(history: Record<string, DayActivity>, todayDate: Date = new Date()): number {
  let streak = 0;
  const checkDate = new Date(todayDate);
  checkDate.setHours(0, 0, 0, 0);

  const todayKey = formatDateToKey(checkDate);
  const todayActivity = history[todayKey];

  // Se treinou hoje (fez pelo menos alguma porcentagem relevante, ex: > 0%), conta hoje
  if (todayActivity && todayActivity.percentage > 0) {
    streak += 1;
  }

  // Volta dia por dia no passado
  checkDate.setDate(checkDate.getDate() - 1);

  // Percorre até 90 dias atrás
  for (let i = 0; i < 90; i++) {
    const key = formatDateToKey(checkDate);
    const isRest = isScheduledRestDay(checkDate);
    const activity = history[key];

    if (activity && activity.percentage > 0) {
      // Treinou neste dia
      streak += 1;
    } else if (isRest) {
      // Dia de descanso programado (quarta ou fds): NÃO quebra o streak!
      // Apenas continua verificando os dias anteriores
    } else {
      // Era um dia de treino obrigatório (Seg, Ter, Qui, Sex) e não treinou: quebra a sequência
      break;
    }

    checkDate.setDate(checkDate.getDate() - 1);
  }

  return streak;
}
