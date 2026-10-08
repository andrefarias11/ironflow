import React, { useState } from 'react';
import { UserPreferences } from '../types/workout';
import { X, Volume2, Vibrate, PlayCircle, Clock, Settings, RotateCcw, Share2, History, Bell, BellRing, Sparkles, Flame } from 'lucide-react';
import { notificationService } from '../services/notificationService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onResetToDefaults: () => void;
  onOpenInstallGuide?: () => void;
  onOpenHistory?: () => void;
  onResetWorkout?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onResetToDefaults,
  onOpenInstallGuide,
  onOpenHistory,
  onResetWorkout
}) => {
  const [permission, setPermission] = useState<NotificationPermission>(() => notificationService.getPermission());

  if (!isOpen) return null;

  const handleEnableNotifications = async () => {
    const granted = await notificationService.requestPermission();
    setPermission(notificationService.getPermission());
    if (granted) {
      onUpdatePreferences(prev => ({ ...prev, notificationsEnabled: true }));
      notificationService.sendSystemNotification('Ironflow Notificações Ativadas! 🚀', {
        body: 'Você receberá avisos do cronômetro, parceiro e lembretes de treino.'
      });
      notificationService.playBeep('rest-finish');
    }
  };

  const handleTestNotification = () => {
    notificationService.sendSystemNotification('Teste Ironflow 💪', {
      body: 'Notificação funcionando perfeitamente no seu dispositivo!'
    });
    notificationService.playBeep('rest-finish');
    notificationService.vibrate([200, 100, 200]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-zinc-200">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Ajustes & Mais</h2>
            <p className="text-xs text-zinc-400">Preferências e opções do app</p>
          </div>
        </div>

        {/* Atalhos Rápidos */}
        <div className="space-y-2 mb-5">
          {onOpenInstallGuide && (
            <button
              onClick={() => {
                onClose();
                onOpenInstallGuide();
              }}
              className="w-full p-3.5 rounded-2xl bg-ios-accent/10 border border-ios-accent/25 flex items-center justify-between text-left active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-ios-accent flex items-center justify-center text-black font-bold">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Instalar no iPhone (PWA)</p>
                  <p className="text-[11px] text-zinc-400">Adicionar à tela de início como app</p>
                </div>
              </div>
              <span className="text-xs text-ios-accent font-bold">Ver ↗</span>
            </button>
          )}

          {onOpenHistory && (
            <button
              onClick={() => {
                onClose();
                onOpenHistory();
              }}
              className="w-full p-3 rounded-2xl bg-zinc-950/70 border border-white/5 flex items-center justify-between text-left hover:bg-zinc-800/60 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-zinc-400" />
                <span className="text-xs font-semibold text-zinc-200">Histórico de Treinos Anteriores</span>
              </div>
              <span className="text-xs text-zinc-500">›</span>
            </button>
          )}

          {onResetWorkout && (
            <button
              onClick={() => {
                if (confirm('Deseja zerar as séries marcadas de hoje para recomeçar o treino?')) {
                  onResetWorkout();
                  onClose();
                }
              }}
              className="w-full p-3 rounded-2xl bg-zinc-950/70 border border-white/5 flex items-center justify-between text-left hover:bg-zinc-800/60 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-orange-400" />
                <span className="text-xs font-semibold text-zinc-200">Reiniciar Séries de Hoje</span>
              </div>
              <span className="text-xs text-zinc-500">Zerar</span>
            </button>
          )}
        </div>

        {/* Preferências de Treino */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2 px-1">
          Preferências
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-ios-accent" />
              <div>
                <p className="text-xs font-semibold text-white">Sons & Alertas</p>
                <p className="text-[11px] text-zinc-400">Feedback sonoro ao marcar séries</p>
              </div>
            </div>
            <button
              onClick={() => onUpdatePreferences(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.soundEnabled ? 'bg-ios-accentGreen' : 'bg-zinc-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5">
            <div className="flex items-center gap-3">
              <Vibrate className="w-5 h-5 text-ios-accentGreen" />
              <div>
                <p className="text-xs font-semibold text-white">Vibração Háptica</p>
                <p className="text-[11px] text-zinc-400">Sentir resposta tátil no celular</p>
              </div>
            </div>
            <button
              onClick={() => onUpdatePreferences(prev => ({ ...prev, vibrateEnabled: !prev.vibrateEnabled }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.vibrateEnabled ? 'bg-ios-accentGreen' : 'bg-zinc-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.vibrateEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5">
            <div className="flex items-center gap-3">
              <PlayCircle className="w-5 h-5 text-ios-accent" />
              <div>
                <p className="text-xs font-semibold text-white">Auto Iniciar Descanso</p>
                <p className="text-[11px] text-zinc-400">Abrir cronômetro ao marcar série</p>
              </div>
            </div>
            <button
              onClick={() => onUpdatePreferences(prev => ({ ...prev, autoStartTimer: !prev.autoStartTimer }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.autoStartTimer ? 'bg-ios-accentGreen' : 'bg-zinc-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.autoStartTimer ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-ios-accent" />
                <span className="text-xs font-semibold text-white">Descanso Padrão</span>
              </div>
              <span className="text-xs font-mono font-bold text-ios-accent">{preferences.defaultRestTime}s</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[45, 60, 90, 120].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => onUpdatePreferences(prev => ({ ...prev, defaultRestTime: sec }))}
                  className={`py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                    preferences.defaultRestTime === sec
                      ? 'bg-ios-accent text-black font-bold'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notificações & Lembretes */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Notificações & Lembretes
            </p>
            {permission === 'granted' ? (
              <span className="text-[10px] text-ios-accentGreen font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ios-accentGreen animate-pulse" />
                Ativado no Celular
              </span>
            ) : (
              <span className="text-[10px] text-zinc-500 font-medium">Permissão Pendente</span>
            )}
          </div>

          <div className="space-y-2.5">
            {/* Solicitar permissão se não autorizado */}
            {permission !== 'granted' ? (
              <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-black flex items-center justify-center font-bold shrink-0">
                    <BellRing className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Ativar Notificações no Celular</p>
                    <p className="text-[11px] text-zinc-400">
                      Receba avisos de fim de descanso, parceiro na sala e lembrete das 18h
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleEnableNotifications}
                  className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5 fill-current" />
                  <span>Permitir Notificações</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/70 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-ios-accentGreen" />
                  <div>
                    <p className="text-xs text-white font-semibold">Notificações do Sistema</p>
                    <p className="text-[10px] text-zinc-400">Descanso, parceiro e lembretes</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleTestNotification}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold active:scale-95 transition-all"
                >
                  Testar
                </button>
              </div>
            )}

            {/* Lembrete das 18h (Proteção de Sequência) */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-xs font-semibold text-white">Lembrete das 18h (Streak)</p>
                  <p className="text-[11px] text-zinc-400">Avisa no fim da tarde se ainda não treinou</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onUpdatePreferences(prev => ({
                  ...prev,
                  notificationsEnabled: prev.notificationsEnabled === false ? true : false
                }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  preferences.notificationsEnabled !== false ? 'bg-ios-accentGreen' : 'bg-zinc-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences.notificationsEnabled !== false ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Frases de Foco & Motivação (3 a 4x ao dia) */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-xs font-semibold text-white">Foco & Disciplina (3-4x/dia)</p>
                  <p className="text-[11px] text-zinc-400">Frases moderadas para manter a mente no treino</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onUpdatePreferences(prev => ({
                  ...prev,
                  motivationalQuotesEnabled: prev.motivationalQuotesEnabled === false ? true : false
                }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  preferences.motivationalQuotesEnabled !== false ? 'bg-ios-accentGreen' : 'bg-zinc-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences.motivationalQuotesEnabled !== false ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Restaurar treinos originais */}
        <div className="mt-5 pt-3 border-t border-white/5">
          <button
            onClick={() => {
              if (confirm('Deseja restaurar a planilha padrão Upper / Lower? Seus pesos e edições voltarão ao padrão inicial.')) {
                onResetToDefaults();
                onClose();
              }
            }}
            className="w-full py-2.5 rounded-xl text-xs text-zinc-500 hover:text-red-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar planilha padrão de fábrica</span>
          </button>
        </div>
      </div>
    </div>
  );
};
