import React from 'react';

export interface MuscleTargetProps {
  workoutName?: string;
  category?: string;
  className?: string;
}

/**
 * Render 3D Anatômico de alta resolução inspirado em apps fitness de luxo (Whoop / Apple Fitness / Hevy).
 * Exibe o modelo 3D com materiais em cinza fosco e músculos ativos brilhando em laranja neon.
 */
export const MuscleFigure: React.FC<MuscleTargetProps> = ({ 
  workoutName = '', 
  category = '', 
  className = 'w-full h-48' 
}) => {
  const text = `${workoutName} ${category}`.toLowerCase();

  // Detecta qual grupo focar para exibir o modelo correto
  const isBack = text.includes('costa') || text.includes('dorsal') || text.includes('remada') || text.includes('puxada') || text.includes('posterior');
  const isLegs = text.includes('perna') || text.includes('inferior') || text.includes('inferiores') || text.includes('quadr') || text.includes('agachamento') || text.includes('glúteo') || text.includes('gluteo');

  let imageSrc = '/muscle-torso-glow.jpg';
  let targetMuscles = 'PEITORAL • OMBROS • BRAÇOS';

  if (isLegs) {
    imageSrc = '/muscle-legs-glow.jpg';
    targetMuscles = 'QUADRÍCEPS • PANTURRILHAS';
  } else if (isBack) {
    imageSrc = '/muscle-back-glow.jpg';
    targetMuscles = 'DORSAIS • TRAPÉZIO • BRAÇOS';
  }

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Glow de fundo neon suave atrás da figura 3D */}
      <div 
        className="absolute w-44 h-44 rounded-full pointer-events-none blur-2xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.7) 0%, rgba(255, 107, 0, 0) 70%)'
        }}
      />

      {/* Modelo 3D Anatômico Renderizado */}
      <div className="relative z-10 w-full h-40 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={`Resumo Muscular - ${workoutName}`}
          className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] filter contrast-110"
          crossOrigin="anonymous"
          loading="eager"
        />
      </div>

      {/* Rótulo minimalista de músculos ativados */}
      <div className="relative z-10 mt-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-300 uppercase">
          {targetMuscles}
        </span>
      </div>
    </div>
  );
};
