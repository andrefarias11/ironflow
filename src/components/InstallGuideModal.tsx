import React, { useState } from 'react';
import { X, Share2, PlusSquare, Smartphone, Check, MoreVertical } from 'lucide-react';
import { useDialogClose } from '../hooks/useDialogClose';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');

  useDialogClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Como instalar o aplicativo no celular"
        className="ironflow-dialog w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-white/10 p-6 shadow-2xl relative"
      >
        <button
          type="button"
          aria-label="Fechar guia de instalação"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mt-1 mb-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-ios-accent mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Instalar no Celular
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Use em tela cheia e acesse offline direto da sua tela inicial.
          </p>
        </div>

        {/* Seletor de Plataforma */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPlatform('ios')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              platform === 'ios'
                ? 'bg-ios-accent text-black'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            iPhone (Safari)
          </button>
          <button
            type="button"
            onClick={() => setPlatform('android')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              platform === 'android'
                ? 'bg-ios-accent text-black'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            Android (Chrome)
          </button>
        </div>

        {platform === 'ios' ? (
          <div className="space-y-3 my-4">
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Abra no Safari do iPhone</p>
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
                  Toque em <Share2 className="w-3.5 h-3.5 text-ios-accent inline" /> Compartilhar
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Na barra inferior do Safari (ícone de quadrado com seta para cima).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-ios-accentGreen/20 text-ios-accentGreen flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                  Escolha <PlusSquare className="w-3.5 h-3.5 text-ios-accentGreen inline" /> &quot;Adicionar à Tela de Início&quot;
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Confirme em &quot;Adicionar&quot; no canto superior direito.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 my-4">
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Abra no Google Chrome</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Acesse o aplicativo usando o navegador Chrome no Android.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-ios-accent/20 text-ios-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                  Toque no menu <MoreVertical className="w-3.5 h-3.5 text-ios-accent inline" /> (3 pontinhos)
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Localizado no canto superior direito do navegador.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-ios-accentGreen/20 text-ios-accentGreen flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                  Toque em <PlusSquare className="w-3.5 h-3.5 text-ios-accentGreen inline" /> &quot;Instalar aplicativo&quot;
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Ou &quot;Adicionar à tela inicial&quot; e confirme a instalação.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-3 rounded-2xl bg-zinc-950/60 border border-white/5 mb-5 flex items-center justify-around text-[11px] text-zinc-300">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-ios-accentGreen" /> Tela Cheia
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-ios-accentGreen" /> Offline
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-ios-accentGreen" /> Acesso Rápido
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
        >
          Entendi, pronto para treinar!
        </button>
      </div>
    </div>
  );
};
