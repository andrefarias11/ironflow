import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { 
  X, 
  Share2, 
  Flame, 
  Trophy, 
  Dumbbell, 
  Sparkles
} from 'lucide-react';
import { MuscleFigure } from './MuscleFigure';

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutName: string;
  category?: string;
  completedSets: number;
  totalSets: number;
  exercisesCount?: number;
  totalVolumeKg?: number;
  durationMinutes: number;
  caloriesBurned?: number;
  avgHeartRate?: number;
  currentStreak: number;
}

export const ShareStoryModal: React.FC<ShareStoryModalProps> = ({
  isOpen,
  onClose,
  workoutName,
  category,
  completedSets,
  exercisesCount = 6,
  durationMinutes,
  caloriesBurned,
  currentStreak
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShareOrDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 3,
        cacheBust: true,
      });

      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `ironflow-${workoutName.toLowerCase().replace(/\s+/g, '-')}.png`, {
          type: 'image/png'
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Treino Concluído - ${workoutName}`,
            text: `🔥 Treino finalizado no Ironflow! ${completedSets} séries concluídas.`
          });
          showToast('Compartilhado com sucesso!');
          setIsGenerating(false);
          return;
        }
      }

      const link = document.createElement('a');
      link.download = `ironflow-${workoutName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      showToast('Imagem salva! Abra o Instagram e poste no Story 📸');
    } catch (err) {
      console.error('Erro ao gerar card de story', err);
      showToast('Toque e segure na imagem para salvar!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-sm max-h-[96vh] flex flex-col items-center relative overflow-y-auto no-scrollbar py-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white z-20 active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* CARD STORY 9:16 - DESIGN DA FOTO (ULTRA LUXO & MINIMALISTA) */}
        {/* ============================================================ */}
        <div
          ref={cardRef}
          className="w-[340px] h-[604px] rounded-[38px] p-7 relative flex flex-col justify-between overflow-hidden shadow-2xl select-none"
          style={{
            background: 'radial-gradient(130% 100% at 20% 0%, #15180f 0%, #0a0a0c 45%, #050506 100%)',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
          }}
        >
          {/* Atmosferas de Luz suaves (Acid Green no topo esquerdo e Warm Orange embaixo) */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#D4FF00] opacity-[0.14] blur-[70px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-[#FF5500] opacity-[0.16] blur-[80px] pointer-events-none" />

          {/* 1. TOPO: Marca & Data (Exatamente igual ao print) */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#D4FF00] flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(212,255,0,0.3)]">
                <Dumbbell className="w-4 h-4 fill-current stroke-current" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-white text-base font-sans">IRONFLOW</span>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#D4FF00]">PRO</span>
              </div>
            </div>

            <span className="text-[11px] text-zinc-400 font-sans tracking-wide">
              {todayFormatted}
            </span>
          </div>

          {/* 2. CENTRO: TÍTULO DO TREINO & ILUSTRAÇÃO ANATÔMICA MUSCULAR (ESTILO EXATO DA FOTO) */}
          <div className="relative z-10 my-auto py-1">
            <div className="flex items-center gap-1.5 text-orange-400 text-[10px] font-extrabold tracking-widest uppercase mb-1">
              <Trophy className="w-3.5 h-3.5 text-orange-400" />
              <span>TREINO FINALIZADO COM SUCESSO</span>
            </div>

            <h1 className="text-[34px] font-black text-white tracking-tight leading-none mb-1">
              {workoutName}
            </h1>
            {category && (
              <p className="text-xs text-zinc-400 font-medium tracking-wide">
                {category}
              </p>
            )}

            {/* ILUSTRAÇÃO ANATÔMICA DOS MÚSCULOS TRABALHADOS (IGUAL AO PRINT) */}
            <div className="my-3">
              <span className="text-[9px] text-zinc-500 font-mono font-bold tracking-widest uppercase block mb-1">
                RESUMO MUSCULAR
              </span>
              <div className="w-full h-44 flex items-center justify-center relative">
                <MuscleFigure 
                  workoutName={workoutName} 
                  category={category} 
                  className="w-48 h-44" 
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 mb-4" />

            {/* TRÊS MÉTRICAS ESSENCIAIS: EXERCÍCIOS, TEMPO, CALORIAS (LIMPO, SEM POLUIÇÃO) */}
            <div className="grid grid-cols-3 gap-2 text-left">
              {/* Métrica 1: Exercícios Feitos */}
              <div className="border-r border-white/5 pr-2">
                <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider block font-sans mb-1">
                  EXERCÍCIOS
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black text-white font-sans">
                    {exercisesCount}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-sans">feitos</span>
                </div>
              </div>

              {/* Métrica 2: Tempo */}
              <div className="border-r border-white/5 pr-2">
                <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider block font-sans mb-1">
                  TEMPO
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black text-white font-sans">
                    {durationMinutes}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-sans">min</span>
                </div>
              </div>

              {/* Métrica 3: Calorias */}
              <div>
                <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider block font-sans mb-1">
                  CALORIAS
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black text-white font-sans">
                    {caloriesBurned ? caloriesBurned : Math.round(durationMinutes * 7.5)}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-sans">
                    kcal
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. RODAPÉ: LINHA DIVISÓRIA & STREAK EM CHAMAS (ESTILO DO PRINT) */}
          <div className="relative z-10 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Flame className="w-8 h-8 text-orange-500 fill-orange-500 drop-shadow-[0_0_12px_rgba(255,85,0,0.6)]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-sans">
                  {currentStreak}
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-orange-400 font-sans">
                  {currentStreak === 1 ? 'DIA DE SEQUÊNCIA' : 'DIAS DE SEQUÊNCIA'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTÃO DE COMPARTILHAR */}
        {/* ============================================================ */}
        <div className="w-[340px] mt-4 space-y-2">
          <button
            onClick={handleShareOrDownload}
            disabled={isGenerating}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#D4FF00] via-[#99ea00] to-[#30D158] text-black font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(212,255,0,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
          >
            {isGenerating ? (
              <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
            ) : (
              <Share2 className="w-4 h-4 stroke-[2.5]" />
            )}
            <span>{isGenerating ? 'Criando Card 4K...' : 'Compartilhar no Story 📸'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-zinc-400 hover:text-white font-medium text-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
