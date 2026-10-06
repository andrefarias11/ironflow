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

export function getWeekRange(date: Date = new Date()): { start: Date; end: Date; startKey: string; endKey: string } {
  const d = new Date(date);
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    start: monday,
    end: sunday,
    startKey: formatDateToKey(monday),
    endKey: formatDateToKey(sunday)
  };
}

export function getPreviousWeekRange(date: Date = new Date()): { start: Date; end: Date; startKey: string; endKey: string } {
  const currentMonday = getWeekRange(date).start;
  const prevMonday = new Date(currentMonday);
  prevMonday.setDate(currentMonday.getDate() - 7);
  return getWeekRange(prevMonday);
}

// Calcula o streak retroativo a partir de hoje permitindo dias de folga normais
export function calculateStreak(history: Record<string, DayActivity>, todayDate: Date = new Date()): number {
  let streak = 0;
  const checkDate = new Date(todayDate);
  checkDate.setHours(0, 0, 0, 0);

  const todayKey = formatDateToKey(checkDate);
  const todayActivity = history[todayKey];

  // Se treinou hoje, conta hoje
  if (todayActivity && todayActivity.percentage > 0) {
    streak += 1;
  }

  // Volta dia por dia no passado
  checkDate.setDate(checkDate.getDate() - 1);

  // Percorre até 90 dias atrás com tolerância de até 2 dias consecutivos sem quebrar se forem descanso
  let consecutiveRestDays = 0;

  for (let i = 0; i < 90; i++) {
    const key = formatDateToKey(checkDate);
    const activity = history[key];

    if (activity && activity.percentage > 0) {
      streak += 1;
      consecutiveRestDays = 0;
    } else {
      consecutiveRestDays += 1;
      // Permite até 2 dias de descanso consecutivos (ex: fim de semana ou folga entre treinos) sem quebrar
      if (consecutiveRestDays > 2) {
        break;
      }
    }

    checkDate.setDate(checkDate.getDate() - 1);
  }

  return streak;
}
