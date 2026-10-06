# 🏋️‍♂️ Treino Pro - Minimalist iOS Gym Tracker

Um aplicativo web progressivo (PWA) minimalista, elegante e focado em mobile (estilo iOS / Apple Fitness), desenvolvido para acompanhar suas séries de academia, medir o progresso com progress bars dinâmicas e registrar seus treinos.

Projetado especialmente para ser adicionado à **Tela de Início do iPhone**, rodando em **tela cheia (sem barra de URL do Safari)** com ícone nativo em alta resolução e funcionando **100% offline** com salvamento automático local.

---

## ✨ Funcionalidades Principais

- 📊 **Progress Bar Geral em Destaque**:
  - Exibe a porcentagem exata de conclusão do treino (`0%` a `100%`).
  - Total de séries realizadas vs. planejadas (`Ex: 12 / 18 séries`).
  - Volume total de carga levantada acumulada no dia (`kg`).
- ⚡ **Mini Progress Bar por Exercício**:
  - Acompanhamento visual série por série em cada aparelho.
- 📱 **Design Minimalista & iOS Aesthetic**:
  - Visual dark profundo estilo OLED (Apple Fitness/Health).
  - Cantos arredondados suaves, cards translúcidos (*glassmorphism*), tipografia limpa.
  - Otimizado para **Safe Area do iPhone** (Dynamic Island, notch e barra inferior).
- 📅 **Calendário Mensal Completo (Otimizado para iPhone)**:
  - Visualização elegante estilo Apple Calendar do mês atual (ex: Outubro 2026).
  - Marcadores visuais em cada dia: **Chama Laranja 🔥** (treino 100%), ponto âmbar (treino parcial) e **Lua Azul 🌙** (dias de descanso programado).
  - Navegação entre meses anteriores e botão de atalho para voltar a "Hoje".
  - Toque em qualquer dia para inspecionar os detalhes: séries realizadas, porcentagem e carga total em kg.
- 🔥 **Sequência de Treinos Estilo Strava (Streaks Dinâmicos)**:
  - **Chama que acende de acordo com a barra**:
    - `0%`: Chama em modo brasa/fria.
    - `1% a 99%`: A chama ganha calor e vai acendendo em tons de âmbar/laranja vibrante.
    - `100%`: **Super Acesa / On Fire! 🔥** (fogo incandescente com partículas e pulso radiante).
  - **Desconto de Dias de Descanso e Fins de Semana**:
    - **Quartas-feiras, Sábados e Domingos** são dias de recuperação oficial e **NÃO QUEBRAM o streak**!
    - Se você faltar em um dia de treino obrigatório (Seg, Ter, Qui ou Sex), a sequência reseta.
  - **Painel Semanal Strava**: Toque na chama para ver o progresso dos 7 dias da semana e histórico de consistência.
- 🎬 **Guia de Execução & Vídeo Demonstrativo ("Ver Movimento")**:
  - Cada exercício possui um botão **`▶ Ver Movimento`**.
  - Abre um guia detalhado com **passo a passo da postura**, **músculos ativados**, **dicas de biomecânica** e **erros comuns a evitar**.
  - Atalho em 1 toque para abrir uma demonstração técnica rápida no **YouTube / Shorts**.
- ⏱ **Cronômetro de Descanso Estilo Dynamic Island**:
  - Ao marcar uma série, inicia automaticamente o tempo de descanso configurado (ex: 60s, 75s, 90s).
  - Barra flutuante com contagem regressiva, botão de `+30s` e alerta sonoro/vibração ao terminar.
- 🔊 **Feedback Tátil e Sonoro**:
  - Som sutil de check e vibração háptica nativa ao marcar as séries.
- 🏆 **Celebração com Confetes**:
  - Modal festivo ao concluir o treino com resumo da sessão (séries, volume e tempo).
- 📅 **Histórico de Treinos**:
  - Salva automaticamente as sessões finalizadas com data, duração e carga.
- 📂 **Treinos Pré-configurados & Personalização Total**:
  - Já vem com **Treino A (Peito & Tríceps)**, **Treino B (Costas & Bíceps)** e **Treino C (Pernas & Ombros)**.
  - Permite criar novas divisões, adicionar/remover exercícios e séries livremente.

---

## 🚀 Como Subir na Vercel (Passo a Passo)

### Opção 1: Pelo GitHub (Recomendado)
1. Crie um repositório no seu GitHub (pode ser privado ou público).
2. No terminal desta pasta, inicialize e envie o código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Treino App"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
3. Acesse [vercel.com](https://vercel.com) e faça login.
4. Clique em **"Add New..."** > **"Project"**.
5. Importe o repositório que você acabou de subir.
6. A Vercel detectará automaticamente as configurações do Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. Clique em **Deploy**. Em menos de 1 minuto seu link estará ativo!

---

### Opção 2: Pelo Vercel CLI (Direto do Terminal)
1. No terminal desta pasta, execute:
   ```bash
   npx vercel
   ```
2. Siga as instruções rápidas na tela (faça login na sua conta Vercel se solicitado).
3. Quando perguntado sobre configurações de build, basta apertar `Enter` nas opções padrão.
4. Pronto! O link de produção será exibido no terminal.

---

## 📲 Como colocar o Ícone na Tela de Início do iPhone

1. No seu **iPhone**, abra o **Safari** (precisa ser o Safari nativo da Apple).
2. Acesse o link gerado pela Vercel (ex: `https://seu-treino.vercel.app`).
3. Toque no botão de **Compartilhar** na barra inferior (o ícone de quadrado com uma seta apontando para cima).
4. Role a lista para baixo e toque em **"Adicionar à Tela de Início"** (ícone com um `+`).
5. Toque em **"Adicionar"** no canto superior direito.

> 🎉 **Pronto!** O ícone do app aparecerá na tela de início do seu celular. Ao tocar nele, ele abrirá como um aplicativo nativo independente, em tela cheia, sem barra de navegação do navegador.

---

## 💻 Testar Localmente no Computador

Para testar agora mesmo:
```bash
npm run dev
```
O app abrirá em `http://localhost:3000`.

