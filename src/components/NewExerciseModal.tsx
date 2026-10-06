import React, { useState } from 'react';
import { X, Dumbbell, Clock } from 'lucide-react';

interface NewExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExercise: (data: { name: string; muscleGroup: string; notes?: string; restSeconds: number }) => void;
}

const MUSCLE_GROUPS = [
  'Peitoral',
  'Costas',
  'Pernas',
  'Quadríceps',
  'Posterior',
  'Ombros',
  'Bíceps',
  'Tríceps',
  'Abdômen',
  'Panturrilha',
  'Outro'
];

export const NewExerciseModal: React.FC<NewExerciseModalProps> = ({
  isOpen,
  onClose,
  onAddExercise
}) => {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Peitoral');
  const [notes, setNotes] = useState('');
  const [restSeconds, setRestSeconds] = useState(60);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddExercise({
      name: name.trim(),
      muscleGroup,
      notes: notes.trim(),
      restSeconds
    });

    setName('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-ios-accent/20 text-ios-accent flex items-center justify-center">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Novo Exercício</h2>
            <p className="text-xs text-zinc-400">Adicione ao treino atual</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Nome do Exercício *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Supino Inclinado c/ Halteres"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ios-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Grupo Muscular
            </label>
            <div className="flex flex-wrap gap-1.5">
              {MUSCLE_GROUPS.map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setMuscleGroup(mg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    muscleGroup === mg
                      ? 'bg-ios-accent text-black font-bold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {mg}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-ios-accent" />
                Descanso Entre Séries
              </span>
              <span className="font-mono text-white lowercase">{restSeconds}s</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[45, 60, 90, 120].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setRestSeconds(sec)}
                  className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    restSeconds === sec
                      ? 'bg-white text-black'
                      : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Observações / Instruções (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Pegada fechada, banco a 30 graus"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ios-accent text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-ios-accent text-black font-extrabold text-sm tracking-wide shadow-glow-accent hover:brightness-110 active:scale-95 transition-all"
          >
            Adicionar ao Treino
          </button>
        </form>
      </div>
    </div>
  );
};

