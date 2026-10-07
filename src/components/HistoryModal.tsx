import React from 'react';
import { WorkoutHistoryEntry } from '../types/workout';
import { X, Calendar, Dumbbell, Clock, Weight, Trash2, Share2 } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: WorkoutHistoryEntry[];
  onClearHistory: () => void;
  onShareEntry?: (entry: WorkoutHistoryEntry) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onShareEntry
}) => {
  if (!isOpen) return null;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d);
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 flex flex-col shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-ios-accent">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Histórico de Treinos</h2>
              <p className="text-xs text-zinc-400">{history.length} sessões registradas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-10 h-10 mx-auto text-zinc-700 stroke-1 mb-2" />
              <p className="text-sm font-medium text-zinc-400">Nenhum treino concluído ainda</p>
              <p className="text-xs text-zinc-600 mt-1">Marque suas séries e clique em "Concluir Treino"</p>
            </div>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                className="p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{entry.workoutName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-zinc-500 font-mono">
                      {formatDate(entry.completedAt)}
                    </span>
                    {onShareEntry && (
                      <button
                        onClick={() => onShareEntry(entry)}
                        className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                        title="Compartilhar no Story"
                      >
                        <Share2 className="w-3.5 h-3.5 text-orange-400" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-1">
                    <span className="text-ios-accent font-semibold">{entry.completedSets}</span>
                    <span className="text-zinc-600">/</span>
                    <span>{entry.totalSets} séries</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Weight className="w-3 h-3 text-zinc-500" />
                    <span>{entry.totalVolumeKg.toLocaleString('pt-BR')} kg</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span>{entry.durationMinutes} min</span>
                  </div>

                  {entry.caloriesBurned && (
                    <div className="flex items-center gap-1 text-orange-400 font-semibold bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                      <span>🔥 {entry.caloriesBurned} kcal</span>
                    </div>
                  )}

                  {entry.avgHeartRate && (
                    <div className="flex items-center gap-1 text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20">
                      <span>❤️ {entry.avgHeartRate} bpm</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="p-3 border-t border-white/5 flex justify-end">
            <button
              onClick={() => {
                if (confirm('Tem certeza que deseja apagar o histórico de treinos?')) {
                  onClearHistory();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Histórico</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

