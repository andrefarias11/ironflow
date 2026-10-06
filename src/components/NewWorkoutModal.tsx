import React, { useState } from 'react';
import { X, FolderPlus } from 'lucide-react';

interface NewWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkout: (name: string, category: string) => void;
}

export const NewWorkoutModal: React.FC<NewWorkoutModalProps> = ({
  isOpen,
  onClose,
  onCreateWorkout
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateWorkout(name.trim(), category.trim() || 'Geral');
    setName('');
    setCategory('');
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
            <FolderPlus className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Criar Nova Rotina</h2>
            <p className="text-xs text-zinc-400">Adicione uma nova divisão de treino</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Nome da Rotina *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Treino D, Full Body, Cardio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ios-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Foco / Categoria
            </label>
            <input
              type="text"
              placeholder="Ex: Ombros & Trapézio, Braços, Pernas"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ios-accent text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-ios-accent text-black font-extrabold text-sm tracking-wide shadow-glow-accent hover:brightness-110 active:scale-95 transition-all"
          >
            Criar Treino
          </button>
        </form>
      </div>
    </div>
  );
};

