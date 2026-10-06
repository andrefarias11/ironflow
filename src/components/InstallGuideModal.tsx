import React from 'react';
import { X, Share2, PlusSquare, Smartphone, Check } from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose
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

        <div className="text-center mt-1 mb-5">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-ios-accent shadow-glow-accent mb-3">
            <Smartphone className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Como instalar no seu iPhone
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Tenha a experiência de um aplicativo nativo direto na sua tela de início!
          </p>
        </div>

        <div className="space-y-3.5 my-4">
          <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Abra no Safari do iPhone
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Certifique-se de estar usando o navegador Safari padrão da Apple.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-ios-accent/20 text-ios-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                Toque no botão <Share2 className="w-3.5 h-3.5 text-ios-accent inline" /> Compartilhar
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Localizado na barra inferior do Safari (o ícone de quadrado com uma seta para cima).
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-ios-accentGreen/20 text-ios-accentGreen flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                Escolha <PlusSquare className="w-3.5 h-3.5 text-ios-accentGreen inline" /> "Adicionar à Tela de Início"
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Role o menu do Safari até encontrar esta opção e depois clique em "Adicionar" no canto superior.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-zinc-950/60 border border-white/5 mb-5 flex items-center justify-around text-[11px] text-zinc-300">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-ios-accentGreen" /> Tela Cheia
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-ios-accentGreen" /> Offline
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-ios-accentGreen" /> Sem Barras
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
        >
          Entendi, pronto para treinar!
        </button>
      </div>
    </div>
  );
};

