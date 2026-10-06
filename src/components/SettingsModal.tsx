import React from 'react';
import { UserPreferences } from '../types/workout';
import { X, Volume2, Vibrate, PlayCircle, Clock, Settings, RotateCcw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onResetToDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onResetToDefaults
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 p-6 shadow-2xl relative">
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
            <h2 className="text-lg font-bold text-white">Configurações</h2>
            <p className="text-xs text-zinc-400">Preferências do seu treino</p>
          </div>
        </div>

        <div className="space-y-4">
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

        <div className="mt-5 pt-3 border-t border-white/5">
          <button
            onClick={() => {
              if (confirm('Deseja restaurar os treinos padrão de fábrica (Treino A, B, C)? Seus treinos personalizados serão resetados.')) {
                onResetToDefaults();
                onClose();
              }
            }}
            className="w-full py-2.5 rounded-xl text-xs text-zinc-500 hover:text-red-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar treinos padrão de fábrica</span>
          </button>
        </div>
      </div>
    </div>
  );
};

