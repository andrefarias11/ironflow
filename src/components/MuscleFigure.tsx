import React from 'react';

export interface MuscleTargetProps {
  workoutName?: string;
  category?: string;
  className?: string;
}

/**
 * Ilustração anatômica vetorial SVG inspirada nos apps premium de musculação (estilo Hevy / Fitbod).
 * Destaca com brilho laranja/âmbar exatamente os grupos musculares trabalhados no treino.
 */
export const MuscleFigure: React.FC<MuscleTargetProps> = ({ workoutName = '', category = '', className = 'w-48 h-48' }) => {
  const text = `${workoutName} ${category}`.toLowerCase();

  // Detecta se é treino de Peito / Superiores A
  const isChest = text.includes('peito') || text.includes('supino') || text.includes('superiores a') || text.includes('treino a');
  // Detecta se é Ombros / Deltoides / Treino C
  const isShoulders = text.includes('ombro') || text.includes('deltoide') || text.includes('treino c') || text.includes('superiores b') || isChest;
  // Detecta Braços (Bíceps / Tríceps)
  const isArms = text.includes('braço') || text.includes('bíceps') || text.includes('biceps') || text.includes('tríceps') || text.includes('triceps') || isChest;
  // Detecta Costas / Dorsal
  const isBack = text.includes('costa') || text.includes('dorsal') || text.includes('remada') || text.includes('treino c');
  // Detecta Abdômen / Core
  const isAbs = text.includes('abdômen') || text.includes('abdomen') || text.includes('core');

  // Cores de contorno e sombras
  const activeGlow = '#FF8533';
  const shadowColor = '#181A1D';
  const outlineColor = '#32363D';

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* SVG Anatômico Detalhado de Tronco & Braços */}
      <svg
        viewBox="0 0 240 220"
        className="w-full h-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradiente Muscular Ativo (Orange Ember) */}
          <linearGradient id="activeMuscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA043" />
            <stop offset="50%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#E64A00" />
          </linearGradient>

          {/* Gradiente Muscular Base (Dark Metallic) */}
          <linearGradient id="baseMuscleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E3238" />
            <stop offset="100%" stopColor="#1B1D21" />
          </linearGradient>

          {/* Glow filter para músculos ativos */}
          <filter id="muscleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#FF6B00" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. PESCOÇO & TRAPÉZIO (Base) */}
        <path
          d="M106 28 L114 62 L120 64 L126 62 L134 28 C128 26 112 26 106 28 Z"
          fill="url(#baseMuscleGrad)"
          stroke={outlineColor}
          strokeWidth="1.2"
        />
        {/* Trapézio Superior Esquerdo */}
        <path
          d="M106 28 C92 38 82 52 76 68 L98 68 L114 62 Z"
          fill={isBack ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
          stroke={outlineColor}
          strokeWidth="1.2"
        />
        {/* Trapézio Superior Direito */}
        <path
          d="M134 28 C148 38 158 52 164 68 L142 68 L126 62 Z"
          fill={isBack ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
          stroke={outlineColor}
          strokeWidth="1.2"
        />

        {/* 2. DELTOIDES / OMBROS */}
        {/* Ombro Esquerdo */}
        <g filter={isShoulders ? 'url(#muscleGlow)' : undefined}>
          <path
            d="M74 68 C62 76 56 94 54 112 C60 114 68 110 74 98 C78 90 82 80 86 72 Z"
            fill={isShoulders ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isShoulders ? activeGlow : outlineColor}
            strokeWidth="1.5"
          />
          {/* Feixe Lateral Ombro Esquerdo */}
          <path
            d="M54 112 C52 124 54 136 58 144 C64 140 70 128 72 116 Z"
            fill={isShoulders ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isShoulders ? activeGlow : outlineColor}
            strokeWidth="1.2"
          />
        </g>

        {/* Ombro Direito */}
        <g filter={isShoulders ? 'url(#muscleGlow)' : undefined}>
          <path
            d="M166 68 C178 76 184 94 186 112 C180 114 172 110 166 98 C162 90 158 80 154 72 Z"
            fill={isShoulders ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isShoulders ? activeGlow : outlineColor}
            strokeWidth="1.5"
          />
          {/* Feixe Lateral Ombro Direito */}
          <path
            d="M186 112 C188 124 186 136 182 144 C176 140 170 128 168 116 Z"
            fill={isShoulders ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isShoulders ? activeGlow : outlineColor}
            strokeWidth="1.2"
          />
        </g>

        {/* 3. PEITORAL MAIOR & SUPERIOR */}
        {/* Peitoral Esquerdo (Destaque Principal) */}
        <g filter={isChest ? 'url(#muscleGlow)' : undefined}>
          <path
            d="M86 72 C98 70 114 70 118 78 C118 96 116 114 112 126 C98 128 84 122 76 108 C74 94 78 82 86 72 Z"
            fill={isChest ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isChest ? '#FFA043' : outlineColor}
            strokeWidth={isChest ? '1.8' : '1.2'}
          />
          {/* Fibra interna peitoral esquerdo */}
          <path
            d="M88 84 C98 84 108 86 114 92"
            stroke={isChest ? '#FFD099' : shadowColor}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Peitoral Direito (Destaque Principal) */}
        <g filter={isChest ? 'url(#muscleGlow)' : undefined}>
          <path
            d="M154 72 C142 70 126 70 122 78 C122 96 124 114 128 126 C142 128 156 122 164 108 C166 94 162 82 154 72 Z"
            fill={isChest ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isChest ? '#FFA043' : outlineColor}
            strokeWidth={isChest ? '1.8' : '1.2'}
          />
          {/* Fibra interna peitoral direito */}
          <path
            d="M152 84 C142 84 132 86 126 92"
            stroke={isChest ? '#FFD099' : shadowColor}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* 4. BRAÇOS (BÍCEPS & ANTEBRAÇOS) */}
        {/* Bíceps Esquerdo */}
        <g filter={isArms ? 'url(#muscleGlow)' : undefined}>
          <path
            d="M58 144 C54 154 50 168 44 182 C48 184 56 182 62 172 C66 162 70 152 70 142 Z"
            fill={isArms ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isArms ? activeGlow : outlineColor}
            strokeWidth="1.4"
          />
        </g>
        {/* Antebraço Esquerdo */}
        <path
          d="M44 182 C38 196 32 208 26 218 C30 220 38 218 44 206 C50 194 56 184 58 174 Z"
          fill="url(#baseMuscleGrad)"
          stroke={outlineColor}
          strokeWidth="1.2"
        />

        {/* Bíceps Direito */}
        <g filter={isArms ? 'url(#muscleGlow)' : undefined}>
          <path
            d="M182 144 C186 154 190 168 196 182 C192 184 184 182 178 172 C174 162 170 152 170 142 Z"
            fill={isArms ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={isArms ? activeGlow : outlineColor}
            strokeWidth="1.4"
          />
        </g>
        {/* Antebraço Direito */}
        <path
          d="M196 182 C202 196 208 208 214 218 C210 220 202 218 196 206 C190 194 184 184 182 174 Z"
          fill="url(#baseMuscleGrad)"
          stroke={outlineColor}
          strokeWidth="1.2"
        />

        {/* 5. ABDÔMEN / SERRÁTIL (GOMOS 6-PACK) */}
        {/* Linha Central Alba */}
        <line x1="120" y1="126" x2="120" y2="216" stroke={shadowColor} strokeWidth="2.5" />

        {/* Linha Horizontal 1 dos Gomos */}
        <g filter={isAbs ? 'url(#muscleGlow)' : undefined}>
          {/* Gomo Superior Esquerdo */}
          <path
            d="M106 128 C112 126 118 126 119 127 L119 146 C114 148 108 148 104 146 Z"
            fill={isAbs ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={outlineColor}
            strokeWidth="1.2"
          />
          {/* Gomo Superior Direito */}
          <path
            d="M134 128 C128 126 122 126 121 127 L121 146 C126 148 132 148 136 146 Z"
            fill={isAbs ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={outlineColor}
            strokeWidth="1.2"
          />

          {/* Gomo Médio Esquerdo */}
          <path
            d="M103 150 C110 150 118 150 119 151 L119 172 C113 174 107 174 102 172 Z"
            fill={isAbs ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={outlineColor}
            strokeWidth="1.2"
          />
          {/* Gomo Médio Direito */}
          <path
            d="M137 150 C130 150 122 150 121 151 L121 172 C127 174 133 174 138 172 Z"
            fill={isAbs ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={outlineColor}
            strokeWidth="1.2"
          />

          {/* Gomo Inferior Esquerdo */}
          <path
            d="M102 176 C110 176 118 176 119 177 L119 204 C112 208 106 204 100 198 Z"
            fill={isAbs ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={outlineColor}
            strokeWidth="1.2"
          />
          {/* Gomo Inferior Direito */}
          <path
            d="M138 176 C130 176 122 176 121 177 L121 204 C128 208 134 204 140 198 Z"
            fill={isAbs ? 'url(#activeMuscleGrad)' : 'url(#baseMuscleGrad)'}
            stroke={outlineColor}
            strokeWidth="1.2"
          />
        </g>

        {/* Serrátil / Oblíquos Laterais Esquerda */}
        <path
          d="M86 134 C94 138 98 144 100 152 L94 158 C90 152 86 142 86 134 Z"
          fill="url(#baseMuscleGrad)"
          stroke={outlineColor}
          strokeWidth="1"
        />
        <path
          d="M84 156 C92 160 96 166 98 174 L92 180 C88 174 84 164 84 156 Z"
          fill="url(#baseMuscleGrad)"
          stroke={outlineColor}
          strokeWidth="1"
        />

        {/* Serrátil / Oblíquos Laterais Direita */}
        <path
          d="M154 134 C146 138 142 144 140 152 L146 158 C150 152 154 142 154 134 Z"
          fill="url(#baseMuscleGrad)"
          stroke={outlineColor}
          strokeWidth="1"
        />
        <path
          d="M156 156 C148 160 144 166 142 174 L148 180 C152 174 156 164 156 156 Z"
          fill="url(#baseMuscleGrad)"
          stroke={outlineColor}
          strokeWidth="1"
        />

        {/* Linha Pélvica / V-Cut */}
        <path
          d="M98 200 C108 212 118 218 120 218 C122 218 132 212 142 200"
          stroke={shadowColor}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
};
