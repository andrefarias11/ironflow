/**
 * Serviço de Notificações, Áudio Háptico e Lembretes de Treino
 * Suporta Notification API, Service Worker Push PWA e Web Audio API.
 */

export const MOTIVATIONAL_QUOTES = [
  "A dor que você sente hoje é a força que você terá amanhã. Não pare.",
  "Disciplina é escolher entre o que você quer agora e o que você mais quer.",
  "O ferro nunca mente para você. Ele sempre pesa os mesmos quilos. Seja forte.",
  "Não negocie com a sua mente. O plano está traçado: cumpra o treino.",
  "A motivação faz você começar, mas é o hábito que te mantém evoluindo.",
  "Cada repetição conta. Cada série constrói a sua melhor versão.",
  "O único treino ruim é aquele que você não fez. Vá em frente!",
  "Seus músculos não conhecem desculpas, eles só conhecem esforço e consistência.",
  "Construa o corpo que você respeita e a mente que ninguém consegue quebrar.",
  "A preguiça promete descanso, mas só a disciplina entrega orgulho.",
  "Não espere ter vontade. Atletas de verdade treinam mesmo sem vontade.",
  "A constância vence o talento toda vez que o talento não tem constância.",
  "O cansaço passa, mas a vergonha de ter desistido fica. Vença o dia!",
  "Mais uma carga, mais uma vitória sobre a sua zona de conforto.",
  "Se fosse fácil, qualquer um faria. Você não é qualquer um.",
  "O resultado que você nunca teve exige a disciplina que você nunca teve.",
  "Concentre-se em cada contração muscular. Conexão mente-músculo é tudo.",
  "Treino feito é mente blindada. Honre o seu compromisso de hoje.",
  "Hoje você está mais perto do seu objetivo do que ontem. Não quebre o ritmo.",
  "Dias difíceis se resolvem no ferro. Descarregue o estresse nas anilhas.",
  "Foque na execução perfeita. Carga é vaidade, técnica é longevidade.",
  "Você não precisa ser o melhor da academia, só precisa ser melhor do que ontem.",
  "A evolução acontece no silêncio e na repetição diária. Mantenha o foco.",
  "Não troque anos de resultados por 1 hora de procrastinação no sofá.",
  "A sua única competição é com a pessoa que você vê no espelho.",
  "Alimente sua disciplina todos os dias e veja suas desculpas passarem fome.",
  "Cansado? Descanse entre as séries, mas nunca desista do treino.",
  "Suor é a fraqueza saindo do corpo. Mantenha a guarda alta e o foco firme!",
  "Grandes físicos são esculpidos dia após dia, repetição por repetição.",
  "Você já começou. Agora termine como um campeão!"
];

interface NotificationTracker {
  date: string; // YYYY-MM-DD
  motivationCountToday: number;
  lastMotivationSentTime: number;
  streakReminderSentToday: boolean;
}

const TRACKER_STORAGE_KEY = 'treino_notification_tracker_v1';

export const notificationService = {
  /**
   * Verifica se o navegador atual suporta Notification API
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  },

  /**
   * Obtém o status da permissão atual
   */
  getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  },

  /**
   * Solicita permissão para o usuário
   */
  async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      const result = await Notification.requestPermission();
      return result === 'granted';
    } catch (e) {
      console.warn('Erro ao solicitar permissão de notificação:', e);
      return false;
    }
  },

  /**
   * Toca um bip sonoro limpo via Web Audio API (sem precisar carregar arquivos externos)
   */
  playBeep(type: 'rest-finish' | 'partner-action' | 'reminder' = 'rest-finish') {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'rest-finish') {
        // Dois bips modernos indicando fim do descanso
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'partner-action') {
        // Som agudo suave para evento de parceiro
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        // Lembrete
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // Navegadores que bloqueiam áudio automático
    }
  },

  /**
   * Vibra o celular com padrão háptico
   */
  vibrate(pattern: number[] = [200, 100, 200]) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  },

  /**
   * Dispara uma notificação do sistema com som e vibração
   */
  async sendSystemNotification(title: string, options?: NotificationOptions) {
    if (!this.isSupported() || Notification.permission !== 'granted') return;

    const fullOptions: NotificationOptions = {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options
    };

    // 1. Tenta enviar através do Service Worker (ideal para PWAs no iOS e Android)
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.showNotification) {
          await reg.showNotification(title, fullOptions);
          return;
        }
      } catch {}
    }

    // 2. Fallback direto para Notification API
    try {
      new Notification(title, fullOptions);
    } catch (e) {
      console.warn('Erro ao instanciar notificação:', e);
    }
  },

  /**
   * Notificação: Fim do Cronômetro de Descanso
   */
  async notifyRestTimerFinished(exerciseName?: string, soundEnabled: boolean = true, vibrateEnabled: boolean = true) {
    if (soundEnabled) this.playBeep('rest-finish');
    if (vibrateEnabled) this.vibrate([250, 100, 250]);

    await this.sendSystemNotification('⏱️ Descanso Concluído!', {
      body: exerciseName ? `Hora da próxima série de ${exerciseName}!` : 'Hora da próxima série! Mantenha o foco.',
      tag: 'rest-timer-finish',
    });
  },

  /**
   * Notificação: Parceiro concluiu uma série no Treino em Dupla
   */
  async notifyPartnerSet(
    partnerName: string,
    exerciseName: string,
    setNumber: number,
    soundEnabled: boolean = true,
    vibrateEnabled: boolean = true
  ) {
    if (soundEnabled) this.playBeep('partner-action');
    if (vibrateEnabled) this.vibrate([150, 80, 150]);

    await this.sendSystemNotification(`🔥 ${partnerName} concluiu uma série!`, {
      body: `Série ${setNumber} de ${exerciseName} finalizada. Sua vez de esmagar!`,
      tag: 'partner-set-completed',
    });
  },

  /**
   * Notificação: Parceiro enviou reação na sala
   */
  async notifyPartnerReaction(
    partnerName: string,
    emoji: string,
    soundEnabled: boolean = true,
    vibrateEnabled: boolean = true
  ) {
    if (soundEnabled) this.playBeep('partner-action');
    if (vibrateEnabled) this.vibrate([100, 50, 100]);

    await this.sendSystemNotification(`💪 ${partnerName} mandou incentivo!`, {
      body: `${emoji} Bora manter o foco juntos até a última série!`,
      tag: 'partner-reaction',
    });
  },

  /**
   * Recupera o controle de disparos diários
   */
  getTracker(todayKey: string): NotificationTracker {
    try {
      const saved = localStorage.getItem(TRACKER_STORAGE_KEY);
      if (saved) {
        const parsed: NotificationTracker = JSON.parse(saved);
        if (parsed.date === todayKey) {
          return parsed;
        }
      }
    } catch {}

    return {
      date: todayKey,
      motivationCountToday: 0,
      lastMotivationSentTime: 0,
      streakReminderSentToday: false,
    };
  },

  saveTracker(tracker: NotificationTracker) {
    try {
      localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(tracker));
    } catch {}
  },

  /**
   * Verifica e dispara as notificações agendadas do dia:
   * 1) Lembrete das 18h de Treino / Proteção de Streak
   * 2) Mensagens de foco / disciplina (com moderação: 3 a 4 no máximo por dia)
   */
  async checkDailySchedules(params: {
    todayKey: string;
    currentStreak: number;
    hasTrainedToday: boolean;
    reminderHour?: number; // Padrão: 18 (18h)
    motivationalQuotesEnabled?: boolean;
    soundEnabled?: boolean;
    vibrateEnabled?: boolean;
  }) {
    if (!this.isSupported() || Notification.permission !== 'granted') return;

    const {
      todayKey,
      currentStreak,
      hasTrainedToday,
      reminderHour = 18,
      motivationalQuotesEnabled = true,
      soundEnabled = true,
      vibrateEnabled = true
    } = params;

    const tracker = this.getTracker(todayKey);
    const now = new Date();
    const currentHour = now.getHours();
    const nowTimestamp = now.getTime();

    // 1. LEMBRETE DAS 18H (Horário de treino e proteção de streak)
    if (currentHour >= reminderHour && !hasTrainedToday && !tracker.streakReminderSentToday) {
      if (soundEnabled) this.playBeep('reminder');
      if (vibrateEnabled) this.vibrate([300, 150, 300]);

      const streakMsg = currentStreak > 0
        ? `⚡ Hora do treino! Sua sequência de ${currentStreak} dias está em jogo. Não deixe a chama apagar!`
        : `⚡ Hora do treino! Dedique 45 minutos para construir a sua melhor versão hoje.`;

      await this.sendSystemNotification('Ironflow - Hora do Treino! 🔥', {
        body: streakMsg,
        tag: 'daily-streak-reminder',
      });

      tracker.streakReminderSentToday = true;
      this.saveTracker(tracker);
      return;
    }

    // 2. MENSAGENS DE FOCO & DISCIPLINA (Máximo de 3 a 4 por dia, espaçadas em pelo menos 3 horas)
    if (motivationalQuotesEnabled) {
      const maxQuotesPerDay = 4;
      const minIntervalMs = 3 * 60 * 60 * 1000; // Pelo menos 3 horas de intervalo

      // Janela razoável de horário (entre 08h e 22h)
      if (currentHour >= 8 && currentHour <= 22) {
        const canSendMore = tracker.motivationCountToday < maxQuotesPerDay;
        const intervalPassed = nowTimestamp - tracker.lastMotivationSentTime >= minIntervalMs;

        if (canSendMore && intervalPassed) {
          // Seleciona uma frase aleatória do banco de 30
          const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
          const quote = MOTIVATIONAL_QUOTES[randomIndex];

          if (soundEnabled) this.playBeep('reminder');
          if (vibrateEnabled) this.vibrate([150, 80, 150]);

          await this.sendSystemNotification('Ironflow Foco & Disciplina 💪', {
            body: quote,
            tag: `motivation-${todayKey}-${tracker.motivationCountToday}`,
          });

          tracker.motivationCountToday += 1;
          tracker.lastMotivationSentTime = nowTimestamp;
          this.saveTracker(tracker);
        }
      }
    }
  }
};
