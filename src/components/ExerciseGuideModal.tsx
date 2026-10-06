import React from 'react';
import { Exercise } from '../types/workout';
import { X, Play, CheckCircle2, AlertTriangle, Lightbulb, ExternalLink, Target } from 'lucide-react';

interface ExerciseGuideModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const ExerciseGuideModal: React.FC<ExerciseGuideModalProps> = ({
  exercise,
  onClose
}) => {
  if (!exercise) return null;

  const guide = exercise.guide;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    guide?.videoQuery || `execucao correta ${exercise.name}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full sm:max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 flex flex-col shadow-2xl overflow-hidden">
        {/* Header do Guia */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-900/90 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ios-accent">
              <Target className="w-3.5 h-3.5" />
              <span>Guia de Execução & Postura</span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
              {exercise.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Botão de Demonstração em Vídeo */}
          <a
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-red-600/20 via-zinc-900 to-zinc-900 border border-red-500/30 hover:border-red-500/60 active:scale-98 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  Ver Demonstração Rápida
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-white" />
                </p>
                <p className="text-[11px] text-zinc-400">
                  Vídeo de execução e postura técnica
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-red-400">Abrir ↗</span>
          </a>

          {/* Músculos Trabalhados */}
          {guide?.primaryMuscle && (
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Músculos Alvo
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-ios-accent text-black font-bold text-[11px]">
                  {guide.primaryMuscle}
                </span>
                {guide.secondaryMuscles?.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-2 py-0.5 rounded-lg bg-white/10 text-zinc-300 text-[11px]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Passo a Passo de Execução */}
          {guide?.instructions && guide.instructions.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-ios-accentGreen" />
                <span>Passo a Passo da Postura</span>
              </p>
              <ol className="space-y-2 pl-1">
                {guide.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-zinc-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Dicas do Personal / Biomecânica */}
          {guide?.tips && guide.tips.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-ios-accent/5 border border-ios-accent/20 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ios-accent flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-ios-accent" />
                <span>Dica de Ouro</span>
              </p>
              <ul className="space-y-1.5 pl-1">
                {guide.tips.map((tip, idx) => (
                  <li key={idx} className="text-zinc-300 leading-relaxed flex items-start gap-2">
                    <span className="text-ios-accent text-xs">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Erros Comuns a Evitar */}
          {guide?.mistakes && guide.mistakes.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>Erros Comuns (Cuidado)</span>
              </p>
              <ul className="space-y-1.5 pl-1">
                {guide.mistakes.map((mistake, idx) => (
                  <li key={idx} className="text-zinc-400 leading-relaxed flex items-start gap-2">
                    <span className="text-red-400 text-xs">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="p-3 border-t border-white/10 bg-zinc-950/80">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
          >
            Entendido, fazer o exercício
          </button>
        </div>
      </div>
    </div>
  );
};
