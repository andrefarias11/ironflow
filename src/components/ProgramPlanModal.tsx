import React, { useState } from 'react';
import { X, Target, Clock, ShieldAlert, TrendingUp, CheckCircle2, Activity } from 'lucide-react';

interface ProgramPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProgramPlanModal: React.FC<ProgramPlanModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'progression' | 'execution'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg max-h-[90vh] rounded-3xl bg-zinc-900 border border-white/10 flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header Fixo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-ios-accent/20 border border-ios-accent/40 flex items-center justify-center text-ios-accent shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate">
                Plano 111 kg → 90 kg
              </h2>
              <p className="text-[11px] text-zinc-400 truncate">
                Recomposição Corporal & Performance (12 a 16 Semanas)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas de Navegação */}
        <div className="px-3 pt-2 pb-1 border-b border-white/5 flex items-center gap-1 overflow-x-auto no-scrollbar bg-zinc-950/40">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-ios-accent text-black shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Meta & Realidade
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'schedule'
                ? 'bg-ios-accent text-black shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Rotina (60 min)
          </button>
          <button
            onClick={() => setActiveTab('progression')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'progression'
                ? 'bg-ios-accent text-black shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            12 Semanas
          </button>
          <button
            onClick={() => setActiveTab('execution')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'execution'
                ? 'bg-ios-accent text-black shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Dicas & Postura
          </button>
        </div>

        {/* Conteúdo Rolável */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-zinc-300">
          {/* ABA 1: OVERVIEW / ALERTA DE REALIDADE */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Alerta de Prazo */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-zinc-900 to-zinc-900 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Alerta de Realidade sobre o Prazo</span>
                </div>
                <p className="text-zinc-200 leading-relaxed text-xs">
                  Sair de <strong>111 kg para 90 kg</strong> significa eliminar <strong>21 kg</strong>.
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-[11px]">
                  <p className="text-red-300 font-semibold">
                    ❌ O Risco do Déficit Agressivo:
                  </p>
                  <p className="text-zinc-400 leading-relaxed">
                    Tentar perder mais de 1,5 kg toda semana derruba a testosterona, destrói massa magra (reduzindo sua taxa metabólica basal, causando flacidez) e multiplica o risco de lesão articular e tendinite com 111 kg na corrida.
                  </p>
                </div>
              </div>

              {/* A Meta Segura */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-ios-accentGreen font-bold text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>A Meta Realista e Sustentável</span>
                </div>
                <ul className="space-y-2 text-[11px] text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ios-accentGreen mt-1.5 shrink-0" />
                    <span><strong>Taxa ideal de perda:</strong> entre <strong>0,8% e 1%</strong> do peso corporal/semana (~<strong>0,9 kg a 1,1 kg/semana</strong>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ios-accentGreen mt-1.5 shrink-0" />
                    <span><strong>Até o fim de Fevereiro:</strong> Alvo saudável entre <strong>96 kg e 99 kg</strong> (12 a 15 kg eliminados de pura gordura, blindando sua massa muscular).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ios-accentGreen mt-1.5 shrink-0" />
                    <span><strong>Chegada aos 90 kg:</strong> Alvo sólido entre <strong>Abril e Maio</strong> com físico denso, atlético e metabolismo acelerado.</span>
                  </li>
                </ul>
              </div>

              {/* Recomposição Corporal */}
              <div className="p-3.5 rounded-2xl bg-ios-accent/10 border border-ios-accent/30 text-[11px] text-zinc-200 leading-relaxed">
                <strong className="text-ios-accent block mb-1">💡 Princípio da Recomposição Corporal:</strong>
                Foque em perder gordura visceral enquanto ganha densidade muscular nos treinos de força. Suas medidas e roupas mudarão muito mais rápido do que apenas o número na balança!
              </div>
            </div>
          )}

          {/* ABA 2: ROTINA DE 60 MINUTOS */}
          {activeTab === 'schedule' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Clock className="w-4 h-4 text-ios-accent" />
                  Divisão Upper / Lower / Condicionamento
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                  60 min cravados
                </span>
              </div>

              <div className="space-y-2">
                {/* Treino A */}
                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Segunda — Treino A</span>
                    <span className="text-[10px] text-ios-accent font-semibold">Superiores (Empurrar)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    5 min Mobilidade + 40 min Musculação (Peito/Ombro/Tríceps) + 15 min Esteira Inclinada
                  </p>
                </div>

                {/* Treino B */}
                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Terça — Treino B</span>
                    <span className="text-[10px] text-ios-accent font-semibold">Inferiores (Quadríceps)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    5 min Mobilidade + 45 min Musculação (Leg Press/Extensora/Core) + 10 min Bicicleta leve
                  </p>
                </div>

                {/* Treino C */}
                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Quarta — Treino C</span>
                    <span className="text-[10px] text-orange-400 font-semibold">Corrida + Core + Mobilidade</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    10 min Mobilidade + 15 min Core estabilizador + 35 min Treino de Corrida/Caminhada
                  </p>
                </div>

                {/* Treino D */}
                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Quinta — Treino D</span>
                    <span className="text-[10px] text-ios-accent font-semibold">Superiores (Puxar)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    5 min Mobilidade + 40 min Musculação (Costas/Delt. Post/Bíceps) + 15 min Elíptico/Bike
                  </p>
                </div>

                {/* Treino E */}
                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Sexta — Treino E</span>
                    <span className="text-[10px] text-ios-accent font-semibold">Inferiores (Posterior & Glúteo)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    5 min Mobilidade + 45 min Musculação (Stiff/Flexora/Elevação Pélvica) + 10 min Cardio sem impacto
                  </p>
                </div>

                {/* Sáb e Dom */}
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center justify-between">
                  <span>Sábado & Domingo: Descanso & Recuperação Muscular</span>
                  <span className="text-[10px] font-bold">Folga programada</span>
                </div>
              </div>

              {/* Regra de Ouro */}
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-zinc-300 space-y-1">
                <span className="font-bold text-amber-400 block">⭐ Regra de Ouro para 111 kg:</span>
                <p className="text-zinc-400 leading-relaxed">
                  Nos dias de musculação (Seg, Ter, Qui, Sex), o cardio final DEVE ser sem impacto (esteira inclinada em caminhada, bike ou elíptico). Deixe o impacto da corrida concentrado na quarta-feira para blindar seus joelhos e canelas de inflamações.
                </p>
              </div>
            </div>
          )}

          {/* ABA 3: PROGRESSÃO 12 SEMANAS */}
          {activeTab === 'progression' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-ios-accent" />
                  Evolução Planejada (Não troque os exercícios toda semana)
                </span>
                <p className="text-[11px] text-zinc-400">
                  O corpo gasta mais calorias e ganha mais força quando você domina a mecânica e aplica sobrecarga progressiva.
                </p>
              </div>

              {/* Semanas 1 a 3 */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ios-accent text-xs">Semanas 1 a 3</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                    Adaptação Neuromuscular
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  <strong>Musculação:</strong> Técnica limpa. Termine as séries sentindo que conseguiria fazer mais 2 ou 3 repetições (RIR 2-3). Não vá até a falha concêntrica.
                </p>
                <p className="text-[11px] text-zinc-400">
                  <strong>Corrida (Quarta):</strong> 1 min de trote leve (7,5 a 8,5 km/h) para 2 min de caminhada rápida (5,5 a 6,0 km/h) durante os 25 min principais.
                </p>
              </div>

              {/* Semanas 4 a 6 */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ios-accent text-xs">Semanas 4 a 6</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                    Progressão de Repetições & Carga
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  <strong>Musculação:</strong> Se bateu o topo de repetições (ex: 12 reps) em todas as séries, suba o peso em 5% a 10% na semana seguinte e volte para 10 repetições.
                </p>
                <p className="text-[11px] text-zinc-400">
                  <strong>Corrida (Quarta):</strong> 2 min de trote para 1 min de caminhada rápida durante os 25 min principais.
                </p>
              </div>

              {/* Semanas 7 a 10 */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ios-accent text-xs">Semanas 7 a 10</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                    Intensificação
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  <strong>Musculação:</strong> Trabalhe a 1 repetição da falha nas últimas séries de máquinas e polias. Reduza descansos de 75s para 60s em superiores para elevar gasto calórico.
                </p>
                <p className="text-[11px] text-zinc-400">
                  <strong>Corrida (Quarta):</strong> 3 a 4 min de corrida contínua para 1 min de caminhada (ou 20 min contínuos se estiver sem qualquer dor).
                </p>
              </div>

              {/* Semanas 11 e 12 */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ios-accentGreen text-xs">Semanas 11 e 12</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    Consolidação
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  <strong>Musculação:</strong> Mantenha as cargas máximas conquistadas. Não reduza peso na barra mesmo em déficit — a carga alta sinaliza para o corpo não catabolizar músculo!
                </p>
                <p className="text-[11px] text-zinc-400">
                  <strong>Corrida (Quarta):</strong> 25 min de corrida contínua em ritmo confortável (Zona 2/3, conseguindo falar frases curtas).
                </p>
              </div>
            </div>
          )}

          {/* ABA 4: DICAS & POSTURA */}
          {activeTab === 'execution' && (
            <div className="space-y-3 animate-fadeIn">
              {/* Dica da Academia Lotada */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/30 space-y-1.5">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Dica para Academia Cheia às 18h/19h
                </span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  Se um aparelho estiver ocupado, não fique 5 minutos parado esperando. Inverta a ordem dos exercícios do mesmo grupo (ex: faça a Máquina antes do Halter ou Polia). Mantenha a frequência cardíaca elevada e feche seus 60 minutos sem perder o ritmo!
                </p>
              </div>

              {/* Execuções Principais */}
              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1">
                  <span className="font-bold text-white text-xs">🦵 Agachamento Goblet & Leg Press:</span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Pés na largura dos ombros com pontas a 15°-30° para fora. Ao descer, empurre os joelhos na direção da ponta dos pés — <strong>nunca deixe os joelhos caírem para dentro</strong> (valgo dinâmico). No Leg Press, nunca estenda 100% os joelhos travando a articulação.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1">
                  <span className="font-bold text-white text-xs">🍑 Stiff com Halteres:</span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Movimento de <strong>dobradiça de quadril</strong>, não de coluna. Imagine que você quer encostar o quadril numa parede atrás de você. Joelhos levemente destravados e peito aberto. Halteres rente à canela.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1">
                  <span className="font-bold text-white text-xs">🦅 Puxadas e Remadas (Costas):</span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Iniciantes costumam puxar com o bíceps. Antes de dobrar o braço, <strong>abaixe os ombros</strong> (afaste das orelhas) e pense em cotoveladas para trás em direção aos bolsos.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1">
                  <span className="font-bold text-white text-xs">🛡️ Supinos e Desenvolvimento (Empurrar):</span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Nunca desça os cotovelos alinhados a 90° em formato de "T" (risco de impacto no manguito). Mantenha os cotovelos a 45°-60° do tronco em formato de seta.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé Fixo */}
        <div className="p-3 border-t border-white/10 bg-zinc-950 flex items-center justify-between">
          <span className="text-[10px] text-zinc-500 font-mono">
            Programa Ironflow 111kg → 90kg
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs active:scale-95 transition-all"
          >
            Entendido, Bom Treino!
          </button>
        </div>
      </div>
    </div>
  );
};
