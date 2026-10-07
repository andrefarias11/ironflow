import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { 
  X, 
  Share2, 
  Flame, 
  Trophy, 
  Clock, 
  Weight, 
  Heart, 
  Dumbbell, 
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutName: string;
  category?: string;
  completedSets: number;
  totalSets: number;
  totalVolumeKg: number;
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
  totalSets,
  totalVolumeKg,
  durationMinutes,
  caloriesBurned,
  avgHeartRate,
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
      // Gera imagem PNG em alta resolução
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 3, // Super alta definição para Story do Instagram
        cacheBust: true,
      });

      // Se o dispositivo tiver suporte a compartilhamento nativo com arquivo (iPhone/Safari)
      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `ironflow-${workoutName.toLowerCase().replace(/\s+/g, '-')}.png`, {
          type: 'image/png'
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Treino Concluído - ${workoutName}`,
            text: `🔥 Treino finalizado no Ironflow! ${totalVolumeKg.toLocaleString('pt-BR')}kg levantados.`
          });
          showToast('Compartilhado com sucesso!');
          setIsGenerating(false);
          return;
        }
      }

      // Fallback: Faz download direto da imagem
      const link = document.createElement('a');
      link.download = `ironflow-${workoutName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      showToast('Imagem salva! Agora abra o Instagram e poste no Story 📸');
    } catch (err) {
      console.error('Erro ao gerar card de story', err);
      showToast('Toque e segure na imagem para salvar!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      {/* Toast de Confirmação */}
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-sm max-h-[96vh] flex flex-col items-center relative overflow-y-auto no-scrollbar py-2">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white z-20 active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* CARD STORY 9:16 - DESIGN ULTRA LUXURY BLACK EDITION */}
        {/* ============================================================ */}
        <div
          ref={cardRef}
          className="w-[340px] h-[604px] rounded-[38px] p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl select-none"
          style={{
            background: 'radial-gradient(130% 100% at 50% 0%, #1c1c20 0%, #0d0d0f 50%, #050506 100%)',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(212, 255, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Luzes de Fundo (Atmospheric Glow) */}
          <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#D4FF00] opacity-[0.12] blur-[80px] pointer-events-none" />
          <div className="absolute top-1/3 -right-20 w-52 h-52 rounded-full bg-[#FF5500] opacity-[0.14] blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#30D158] opacity-[0.08] blur-[80px] pointer-events-none" />

          {/* Textura sutil de grade estilo cyberpunk/luxo */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />

          {/* 1. TOPO: Marca e Data */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D4FF00] to-[#99ea00] flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(212,255,0,0.4)]">
                <Dumbbell className="w-4 h-4 fill-current stroke-current" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold tracking-tight text-white text-sm font-sans">IRONFLOW</span>
                  <span className="text-[8px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.2 rounded bg-white/10 text-zinc-300">PRO</span>
                </div>
                <p className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">Workout Tracker</p>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-400 font-mono">
              <Calendar className="w-3 h-3 text-zinc-500" />
              <span>{todayFormatted}</span>
            </div>
          </div>

          {/* 2. CENTRO: TÍTULO DO TREINO & BADGE DE STATUS */}
          <div className="relative z-10 my-auto py-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 text-[11px] font-bold tracking-wide uppercase mb-2 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-orange-400" />
              <span>Treino Finalizado com Sucesso</span>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
              {workoutName}
            </h1>
            {category && (
              <p className="text-xs text-zinc-400 font-medium tracking-wide mt-0.5">
                {category}
              </p>
            )}

            {/* GRID DAS 4 PRINCIPAIS MÉTRICAS ESTILO APPLE FITNESS / STRAVA */}
            <div className="grid grid-cols-2 gap-2.5 mt-5">
              {/* Volume de Carga */}
              <div className="rounded-2xl p-3 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden group">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
                  <Weight className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>Volume Total</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-2xl font-black text-white font-mono tracking-tight">
                    {totalVolumeKg.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs text-[#D4FF00] font-mono font-bold">kg</span>
                </div>
              </div>

              {/* Séries Feitas */}
              <div className="rounded-2xl p-3 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#30D158]" />
                  <span>Séries Feitas</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-2xl font-black text-white font-mono tracking-tight">
                    {completedSets}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">/ {totalSets}</span>
                </div>
              </div>

              {/* Tempo de Treino */}
              <div className="rounded-2xl p-3 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#0A84FF]" />
                  <span>Tempo</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-2xl font-black text-white font-mono tracking-tight">
                    {durationMinutes}
                  </span>
                  <span className="text-xs text-[#0A84FF] font-mono font-bold">min</span>
                </div>
              </div>

              {/* Calorias ou Frequência Cardíaca */}
              <div className="rounded-2xl p-3 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
                  {caloriesBurned ? (
                    <>
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span>Calorias</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5 text-red-500" />
                      <span>Batimentos</span>
                    </>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-2xl font-black text-white font-mono tracking-tight">
                    {caloriesBurned ? caloriesBurned : avgHeartRate ? avgHeartRate : '100%'}
                  </span>
                  <span className="text-xs text-orange-400 font-mono font-bold">
                    {caloriesBurned ? 'kcal' : avgHeartRate ? 'bpm' : 'foco'}
                  </span>
                </div>
              </div>
            </div>

            {/* Faixa Secundária: Se tiver ambos BPM e Calorias */}
            {caloriesBurned && avgHeartRate && (
              <div className="mt-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-red-400 font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-red-500/30 text-red-500" />
                  <span>{avgHeartRate} bpm médio</span>
                </div>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 text-[11px]">Redmi Watch Sync</span>
              </div>
            )}
          </div>

          {/* 3. RODAPÉ DO CARD: STREAK EM CHAMAS & ASSINATURA */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,85,0,0.4)]">
                <Flame className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-white font-mono">{currentStreak}</span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 font-sans">
                    {currentStreak === 1 ? 'Dia de Sequência' : 'Dias de Sequência'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">Constância inabalável 🔥</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">APP EXCLUSIVO</span>
              <span className="text-xs font-black text-white tracking-wider font-sans">#IRONFLOW</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTÃO DE AÇÃO RÁPIDA (COMPARTILHAR NO INSTAGRAM) */}
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
