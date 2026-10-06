# 📱 Treino Pro — Documentação Completa do Aplicativo

> **Aplicativo Web Progressivo (PWA) de Musculação Minimalista focado no iPhone, com Estética iOS, Progress Bars em Tempo Real, Gamificação de Streaks estilo Strava e Ficha Upper/Lower.**

---

## 📑 Sumário
1. [Visão Geral & Proposta](#1-visão-geral--proposta)
2. [Identidade Visual & Experiência Mobile (iOS)](#2-identidade-visual--experiência-mobile-ios)
3. [Ficha de Treino Cadastrada (Upper / Lower 4 Dias)](#3-ficha-de-treino-cadastrada-upper--lower-4-dias)
4. [Funcionalidades Principais](#4-funcionalidades-principais)
   - [Progress Bar & Métricas em Tempo Real](#-progress-bar--métricas-em-tempo-real)
   - [Controle e Progressão de Séries](#-controle-e-progressão-de-séries)
   - [Guia de Execução & Vídeo ("Ver Movimento")](#-guia-de-execução--vídeo-ver-movimento)
   - [Cronômetro de Descanso (Dynamic Island)](#-cronômetro-de-descanso-dynamic-island)
   - [Gamificação & Streaks Estilo Strava](#-gamificação--streaks-estilo-strava)
   - [Calendário Mensal Responsivo](#-calendário-mensal-responsivo)
   - [Finalização Festiva & Histórico de Treinos](#-finalização-festiva--histórico-de-treinos)
   - [Painel de Ajustes & Preferências](#-painel-de-ajustes--preferências)
5. [Arquitetura Técnica & Stack](#5-arquitetura-técnica--stack)
6. [Armazenamento de Dados & Privacidade](#6-armazenamento-de-dados--privacidade)
7. [Configuração PWA para iPhone (Tela de Início)](#7-configuração-pwa-para-iphone-tela-de-início)
8. [Publicação e Deploy na Vercel](#8-publicação-e-deploy-na-vercel)

---

## 1. Visão Geral & Proposta

O **Treino Pro** foi concebido para resolver os maiores problemas dos aplicativos de academia tradicionais: excesso de poluição visual, necessidade de cadastros lentos, propagandas invasivas e interfaces complexas que atrapalham o ritmo do treino.

O foco é oferecer uma experiência **100% pensada para o iPhone**:
- **Fluida e rápida**: Zero delay ao marcar séries, registrar pesos ou acionar o descanso.
- **Visual Apple Fitness**: Tema escuro profundo (OLED AMOLED), cantos arredondados, fontes tabulares e tons neon.
- **Offline first**: Opera sem conexão com a internet, ideal para o subsolo de academias.
- **PWA Standalone**: Fixado na tela de início do celular sem nenhuma barra de navegação de navegador.

---

## 2. Identidade Visual & Experiência Mobile (iOS)

- **Paleta de Cores**:
  - `Preto Absoluto (#000000)`: Economia de energia em telas OLED e estética Apple Health/Fitness.
  - `Cinzas Escuros (#121214, #1C1C1E, #2C2C2E)`: Cards e superfícies com *glassmorphism* (desfoque e transparência sutis).
  - `Neon Lime (#D4FF00)` & `iOS Green (#30D158)`: Destaques de ação, anéis de atividade e progresso concluído.
  - `Laranja Incandescente (#FF5500, #F97316)`: Níveis de intensidade da chama de consistência (*Streak*).
- **Tratamento de Telas iPhone**:
  - **Suporte à Dynamic Island e Notch**: Safe area insets superiores e inferiores respeitados (`env(safe-area-inset-top)` e `env(safe-area-inset-bottom)`).
  - **Anti-Zoom em Inputs**: Tipografia travada em 16px mínimo para evitar o zoom involuntário do Safari ao focar campos numéricos.
  - **Prevenção de Toques Fantasmas**: `-webkit-tap-highlight-color: transparent` e `user-select: none` em controles interativos.
  - **Inputs Touch-Friendly**: Botões e áreas de toque com no mínimo 44px de diâmetro para uso confortável mesmo com dedos suados.

---

## 3. Ficha de Treino Cadastrada (Upper / Lower 4 Dias)

O aplicativo já vem pré-configurado com uma divisão de alta eficiência biomecânica voltada para hipertrofia e progressão de força com suporte de creatina:

### 🟢 Segunda-feira — Superiores A
1. **Supino Reto (Barra ou Halteres)** — 3 séries × 8 a 12 reps | *Descanso: 90s*
2. **Remada Curvada com Barra** — 3 séries × 8 a 12 reps | *Descanso: 90s*
3. **Desenvolvimento com Halteres (Ombros)** — 3 séries × 8 a 12 reps | *Descanso: 90s*
4. **Puxada Alta (Costas)** — 3 séries × 8 a 12 reps | *Descanso: 90s*
5. **Tríceps no Pulley** — 3 séries × 8 a 12 reps | *Descanso: 90s*
6. **Rosca Direta** — 3 séries × 8 a 12 reps | *Descanso: 90s*

### 🦵 Terça-feira — Inferiores A
1. **Agachamento Livre ou no Hack** — 3 séries × 8 a 12 reps | *Descanso: 120s*
2. **Leg Press 45º** — 3 séries × 8 a 12 reps | *Descanso: 90s*
3. **Cadeira Extensora** — 3 séries × 8 a 12 reps | *Descanso: 90s*
4. **Mesa Flexora (Posterior de Coxa)** — 3 séries × 8 a 12 reps | *Descanso: 90s*
5. **Panturrilha em Pé** — 3 séries × 15 reps | *Descanso: 90s*

### 🌙 Quarta-feira — Descanso Programado (Rest Day)
- Recuperação ativa, regeneração de glicogênio e descanso articular.
- **A sequência (Streak) é protegida e congelada.**

### 🟢 Quinta-feira — Superiores B
1. **Supino Inclinado com Halteres** — 3 séries × 8 a 12 reps | *Descanso: 90s*
2. **Remada Serrote (Unilateral c/ Halter)** — 3 séries × 8 a 12 reps | *Descanso: 90s*
3. **Elevação Lateral com Halteres** — 3 séries × 8 a 12 reps | *Descanso: 90s*
4. **Barra Fixa (ou Puxador Frente c/ Triângulo)** — 3 séries × 8 a 12 reps | *Descanso: 90s*
5. **Tríceps Testa ou Corda** — 3 séries × 8 a 12 reps | *Descanso: 90s*
6. **Rosca Martelo** — 3 séries × 8 a 12 reps | *Descanso: 90s*

### 🦵 Sexta-feira — Inferiores B
1. **Levantamento Terra Romeno (RDL)** — 3 séries × 8 a 12 reps | *Descanso: 120s*
2. **Afundo ou Agachamento Búlgaro** — 3 séries × 8 a 12 reps | *Descanso: 90s*
3. **Cadeira Flexora** — 3 séries × 8 a 12 reps | *Descanso: 90s*
4. **Panturrilha Sentado (Máquina)** — 3 séries × 15 reps | *Descanso: 90s*
5. **Abdominal (Prancha ou Máquina)** — 3 séries × 15 reps | *Descanso: 60s*

### 🌙 Sábado & Domingo — Descanso de Fim de Semana
- Foco em recuperação protéica e hidratação.
- **A sequência (Streak) é protegida e congelada.**

---

## 4. Funcionalidades Principais

### 📊 Progress Bar & Métricas em Tempo Real
- **Barra de Progresso Central**: Gradiente animado em tons de lima/esmeralda que preenche suavemente conforme cada série é checada.
- **Percentual Dinâmico**: Exibição em tipografia grande (`0%` até `100%`).
- **Contador de Séries**: Badge indicando `X / Total` séries realizadas no dia.
- **Volume Total Acumulado**: Cálculo em tempo real da tonelagem total levantada no treino (`peso × repetições`).
- **Botão de Finalização Rápida**: Ativado quando o atleta atinge 100% ou decide concluir a sessão.

### 🏋️‍♂️ Controle e Progressão de Séries
- **Memória de Carga Anterior**: Cada linha de série exibe o peso e repetições feitos na sessão anterior (ex: `20kg × 10`), garantindo que o atleta aplique sobrecarga progressiva semanalmente.
- **Ajustes Rápidos de Peso e Repetições**: Campos numéricos livres com precisão decimal (`0.5kg`).
- **Botão de Check Tátil**:
  - Quando desmarcado: Cinza escuro discreto.
  - Quando marcado: Verde brilhante com ícone de confirmação.
  - Aciona **som tátil pop** (via Web Audio API) e **vibração háptica**.
  - Opcionalmente inicia o cronômetro de descanso do exercício de forma automática.
- **Adicionar/Remover Séries**: Botão `+ Adicionar Série` e `-1 série` por exercício.

### 🎬 Guia de Execução & Vídeo ("Ver Movimento")
Ao lado de cada exercício há o botão `▶ Ver Movimento`, abrindo uma gaveta modal (*iOS Bottom Sheet*) contendo:
1. **Atalho em 1 Toque para Vídeo no YouTube**: Abre buscas técnicas diretas (Shorts/vídeos de 15 a 30s) sem precisar digitar.
2. **Músculos Alvo**: Músculo primário em destaque e músculos sinergistas/estabilizadores.
3. **Passo a Passo da Postura**: Posição dos pés, pegada, ângulo dos cotovelos, trajetória e respiração.
4. **Dicas do Personal**: Macetes biomecânicos para otimizar ativação e sensação muscular.
5. **Erros Comuns (Cuidado)**: Alertas sobre sobrecarga na lombar, ombros ou joelhos.

### ⏱️ Cronômetro de Descanso (Dynamic Island)
- **Barra Flutuante no Rodapé**: Estilo Dynamic Island, presente discretamente na tela enquanto o atleta descansa.
- **Contagem Regressiva e Barra Linear**: Tempo restante em minutos e segundos (`01:30`).
- **Controles Rápidos**:
  - Botão `+30s` (adiciona tempo extra com um toque).
  - Pausar / Continuar.
  - Encerrar descanso (`X`).
- **Alerta ao Zerar**: Toca um chime sonoro harmonioso (estilo Apple Watch) e aciona padrão de vibração háptica no celular.

### 🔥 Gamificação & Streaks Estilo Strava
- **Chama com 4 Estágios de Brilho**:
  1. `0% (Início)`: Chama apagada em tom brasa/frio (`text-zinc-600`).
  2. `1% a 39%`: Chama acendendo em tom âmbar (`text-amber-400`).
  3. `40% a 99%`: Chama quente e alaranjada vibrante (`text-orange-500`).
  4. `100% (Concluído)`: **Super Acesa / On Fire! 🔥** (laranja incandescente `#FF5500` com brilho expansivo, pulso dinâmico e partículas estreladas).
- **Regra de Folgas e Fins de Semana**:
  - **Quartas, Sábados e Domingos** são dias de recuperação oficial e **não quebram o streak**.
  - Apenas faltar em um dia de treino obrigatório (Seg, Ter, Qui ou Sex) reinicia o contador.
- **Painel Semanal**: Tocar na chama abre um modal com os 7 dias da semana mostrando quais foram completados (`✅`), quais foram descanso (`🌙`) e o status do dia de hoje.

### 📅 Calendário Mensal Responsivo
- Acessível com um toque no ícone `Calendar` do cabeçalho.
- Grade de 7 colunas (`Seg` a `Dom`) desenhada especificamente para telas de iPhone.
- **Marcadores por Dia**:
  - Fogo incandescente nos dias de treino com 100%.
  - Ponto âmbar nos dias com treino parcial.
  - Lua azul (`🌙`) nos dias de descanso programado.
  - Anel iluminado no dia de hoje.
- **Card de Inspeção ao Tocar**: Exibe o resumo de qualquer dia passado (data completa, percentual, séries feitas e total de kg levantados).
- Navegação entre meses passados e futuros com botão de atalho para `Hoje`.

### 🏆 Finalização Festiva & Histórico de Treinos
- Ao tocar em **"Concluir Treino"**, uma chuva de confetes animados (`canvas-confetti`) celebra o término da sessão.
- Modal com resumo completo: séries feitas, volume total e controle deslizante para estimar o tempo total do treino (ex: 45 min).
- Salva no histórico persistente do app com data e hora.
- Opção de visualizar sessões anteriores e limpar histórico quando desejado.

### ⚙️ Painel de Ajustes & Preferências
- **Atalhos Rápidos**:
  - 📲 Como instalar no iPhone (guia ilustrado).
  - 📜 Histórico de Treinos Anteriores.
  - 🔄 Reiniciar séries de hoje (para iniciar uma nova sessão limpa).
- **Toggles com Visual iOS**:
  - Sons & Alertas Sonoros (`Liga / Desliga`).
  - Vibração Háptica (`Liga / Desliga`).
  - Auto-iniciar cronômetro de descanso ao marcar a série (`Liga / Desliga`).
  - Tempo padrão de descanso (45s, 60s, 90s, 120s).
- **Restauração de Fábrica**: Permite restaurar a planilha original Upper/Lower caso o usuário queira recomeçar do zero.

---

## 5. Arquitetura Técnica & Stack

```
App Academia/
├── public/
│   ├── apple-touch-icon.png    # Ícone nativo 180x180 para tela de início iOS
│   ├── icon-192.png            # Ícone 192x192 para Android/PWA
│   ├── icon-512.png            # Ícone 512x512 de alta definição
│   ├── icon.svg                # Ícone vetorial com haltere e anel Apple Fitness
│   └── manifest.json           # Manifesto PWA com display standalone
├── src/
│   ├── components/
│   │   ├── ExerciseCard.tsx        # Card do exercício com séries, peso, reps e botão de check
│   │   ├── ExerciseGuideModal.tsx  # Modal de instruções posturais e link do YouTube
│   │   ├── FinishWorkoutModal.tsx  # Celebração de término de treino com confetes
│   │   ├── Header.tsx              # Cabeçalho responsivo otimizado para Dynamic Island
│   │   ├── HistoryModal.tsx        # Lista de sessões finalizadas
│   │   ├── InstallGuideModal.tsx   # Tutorial passo a passo para o Safari do iPhone
│   │   ├── MonthCalendarModal.tsx  # Calendário mensal com marcadores por dia
│   │   ├── NewExerciseModal.tsx    # Formulário para cadastrar novos exercícios
│   │   ├── NewWorkoutModal.tsx     # Formulário para criar novas divisões de treino
│   │   ├── OverallProgress.tsx     # Card principal com porcentagem, volume e barra animada
│   │   ├── RestTimerBar.tsx        # Dynamic Island do cronômetro de descanso
│   │   ├── SettingsModal.tsx       # Ajustes de áudio, vibração, atalhos e reset
│   │   ├── StreakFlame.tsx         # Chama animada com níveis de brilho e painel semanal
│   │   └── WorkoutTabs.tsx         # Segmented control para troca rápida de treinos
│   ├── data/
│   │   └── defaultWorkouts.ts      # Dados da planilha Upper/Lower com guias e instruções
│   ├── hooks/
│   │   └── useWorkouts.ts          # Hook central de estado, métricas, streak e persistência
│   ├── types/
│   │   └── workout.ts              # Tipos TypeScript para Treinos, Séries e Guias
│   ├── utils/
│   │   ├── sound.ts                # Web Audio API sintetizada e vibração háptica nativa
│   │   └── streak.ts               # Algoritmo de cálculo de consistência e regras de descanso
│   ├── App.tsx                     # Componente raiz que orquestra telas e modais
│   ├── index.css                   # Tailwind base com safe areas e glassmorphism
│   └── main.tsx                    # Ponto de entrada React 19
├── vercel.json                     # Roteamento SPA e cabeçalhos de segurança na Vercel
├── vite.config.ts                  # Configuração do Vite com React
└── package.json                    # Dependências e scripts de build
```

### Tecnologias Utilizadas:
- **React 19**: Renderização moderna com máxima velocidade.
- **TypeScript**: Tipagem estrita de treinos, exercícios, séries e preferências.
- **Tailwind CSS**: Estilização atômica personalizada para o design system da Apple.
- **Lucide React**: Ícones de alta legibilidade estilo iOS.
- **Web Audio API**: Geração nativa de bipes e chimes sem necessidade de carregar arquivos MP3 pesados.
- **Canvas Confetti**: Motor de física leve para animações de comemoração ao término do treino.
- **Vite 6**: Compilação ultrarrápida com bundle minificado (`~100kB gzipped`).

---

## 6. Armazenamento de Dados & Privacidade

Todos os treinos, repetições, pesos registrados, histórico e streak são gravados no **armazenamento local interno do seu iPhone** (`localStorage`):
- **100% Offline**: Pode ser usado em subsolos de academia ou no modo avião.
- **Zero Latência**: Não depende de respostas de servidores lentos.
- **Privacidade Total**: Nenhum dado corporal ou de treino é enviado para servidores de terceiros.

---

## 7. Configuração PWA para iPhone (Tela de Início)

O app conta com suporte nativo aos padrões de Web App da Apple:
1. Abra o link da Vercel no **Safari do iPhone**.
2. Toque no ícone de **Compartilhar** (quadrado com uma seta para cima na barra inferior do Safari).
3. Role a lista e toque em **"Adicionar à Tela de Início"** (`+`).
4. Toque em **"Adicionar"** no canto superior direito.

Ao abrir pelo ícone da tela inicial:
- O app roda em **tela cheia (sem barra de URL do navegador)**.
- O ícone preto com anel de progresso verde e haltere aparece em alta resolução na grade do iOS.
- A barra de status se integra ao design preto translúcido do app.

---

## 8. Publicação e Deploy na Vercel

### Deploy com 1 Comando (Vercel CLI):
```bash
npx vercel --prod
```

### Deploy via GitHub:
1. Envie o código para o seu repositório:
   ```bash
   git add .
   git commit -m "feat: app academia completo"
   git push origin main
   ```
2. No painel do [vercel.com](https://vercel.com), importe o repositório.
3. O build é automático e gera um link seguro `https://seu-app.vercel.app` com certificado SSL gratuito.

