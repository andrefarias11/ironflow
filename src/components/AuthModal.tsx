import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  LogOut, 
  Check, 
  Sparkles, 
  AlertCircle,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PALETTE_COLORS = [
  { name: 'Laranja Elétrico', hex: '#FF6B00' },
  { name: 'Azul Ciano', hex: '#00E5FF' },
  { name: 'Verde Neon', hex: '#10B981' },
  { name: 'Roxo Imperial', hex: '#A855F7' },
  { name: 'Rosa Magenta', hex: '#EC4899' },
  { name: 'Âmbar Dourado', hex: '#F59E0B' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, isConfigured, signIn, signUp, signOut, updateProfile } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup' | 'profile'>(user ? 'profile' : 'login');
  
  // Form fields
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedColor, setSelectedColor] = useState(profile?.color || '#FF6B00');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        setSuccessMsg('Login realizado com sucesso!');
        setTimeout(() => onClose(), 1000);
      } else if (tab === 'signup') {
        if (!name.trim()) throw new Error('Por favor, informe seu nome.');
        const { error } = await signUp(name, email, password);
        if (error) throw error;
        setSuccessMsg('Conta criada com sucesso!');
        setTimeout(() => onClose(), 1200);
      } else if (tab === 'profile') {
        const { error } = await updateProfile({ name, color: selectedColor });
        if (error) throw error;
        setSuccessMsg('Perfil atualizado!');
        setTimeout(() => setSuccessMsg(null), 2000);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ocorreu um erro. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setTab('login');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-[#121316] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        {/* Header Modal */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-wide">
                {user ? 'SEU PERFIL' : 'CONTA IRONFLOW'}
              </h2>
              <p className="text-[11px] text-zinc-400 font-medium">
                {user ? 'Dados e sincronização em nuvem' : 'Acesse seu progresso em qualquer celular'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Supabase Not Configured Warning (se faltar .env) */}
        {!isConfigured && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Configuração de Banco de Dados</span>
              <span className="text-[11px] text-amber-200/80 leading-relaxed block">
                Para ativar o login e o treino em dupla online, configure suas chaves do Supabase no arquivo <code className="bg-black/40 px-1 py-0.5 rounded">.env</code>.
              </span>
            </div>
          </div>
        )}

        {/* Tab Buttons (apenas se deslogado) */}
        {!user && (
          <div className="flex px-6 pt-4 gap-2">
            <button
              onClick={() => { setTab('login'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => { setTab('signup'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'signup'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              Criar Conta
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Campo Nome (Signup ou Profile) */}
          {(tab === 'signup' || tab === 'profile') && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Nome de Atleta
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ex: André"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Escolha de Cor no Perfil (usado para diferenciar no treino em dupla) */}
          {tab === 'profile' && (
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-zinc-400" />
                <span>Sua Cor no Treino em Dupla</span>
              </label>
              <div className="grid grid-cols-6 gap-2">
                {PALETTE_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setSelectedColor(c.hex)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.hex && <Check className="w-4 h-4 text-black stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campos E-mail e Senha (apenas login ou signup) */}
          {tab !== 'profile' && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* Botão de Submissão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {tab === 'login' && 'Entrar na Conta'}
                  {tab === 'signup' && 'Criar Conta Grátis'}
                  {tab === 'profile' && 'Salvar Alterações'}
                </span>
              </>
            )}
          </button>

          {/* Botão de Logout no modo Profile */}
          {user && tab === 'profile' && (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair da Conta</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

