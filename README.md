# Ironflow — Diário de Treino

Um aplicativo web progressivo (**PWA**) minimalista, escuro e direto ao ponto (inspirado em fichas reais de sala de treino), desenvolvido para registrar séries e repetições na academia, controlar descansos, acompanhar sua sequência semanal e treinar em dupla em tempo real.

---

## Funcionalidades Principais

- **Fichas Padrão de Fácil Execução (Uso Geral):**
  - Quatro fichas enxutas no modelo **Upper / Lower guiado**, priorizando máquinas articuladas e polias confortáveis, baixo risco articular e alternativas rápidas no campo de notas caso algum aparelho esteja ocupado:
    - **Treino A — Superiores A (Peito, Costas e Braços):** 6 exercícios (3×10–15)
    - **Treino B — Inferiores A (Pernas, Glúteos e Abdômen):** 6 exercícios (3×10–15)
    - **Treino C — Superiores B (Peito, Costas e Ombros):** 6 exercícios (3×10–15)
    - **Treino D — Inferiores B (Pernas, Posterior e Core):** 5 exercícios (3×10–15)
- **Registro Rápido com Uma Mão:**
  - Controles táteis **− / +** em cada série para ajustar repetições sem abrir o teclado, além de edição numérica livre com confirmação ao sair do campo.
  - Histórico comparativo discreto da última sessão (`Anterior`) e marcação visual de séries concluídas.
- **Cronômetro de Descanso Flutuante:**
  - Inicia automaticamente ao concluir uma série, suporta ajuste rápido (`-15s` / `+30s`), pausa/retomada sincronizada em tempo real e fecha suavemente após o alerta de conclusão.
- **Técnica e Postura em 1 Toque:**
  - Cada exercício traz passo a passo simples, dicas de segurança, erros comuns a evitar e busca rápida em vídeo demonstrativo.
- **Calendário Mensal & Sequência (Streak):**
  - Acompanhe dias treinados no mês, adicione treinos retroativos ou apague sessões por dia.
  - Quartas-feiras, Sábados e Domingos contam como descanso programado no ciclo padrão de 4 dias sem quebrar a sequência.
- **Treino em Dupla em Tempo Real & Nuvem (Supabase opcional):**
  - Conecte-se com outro aparelho usando código de sala de 6 dígitos para enxergar o progresso do parceiro e enviar reações rápidas (`💪`, `🔥`, `⚡`).
  - Gere e compartilhe card resumo 9:16 ao finalizar o treino.
- **Personalização Completa:**
  - Crie ou exclua fichas personalizadas, adicione ou remova exercícios/séries e restaure o padrão de fábrica quando quiser em **Ajustes**.

---

## Como Testar Localmente

```bash
npm install
npm run dev
```

Build de produção e validação de tipos TypeScript:

```bash
npm run build
```

Consulte o checklist completo de validação em [`scripts/VALIDATION.md`](./scripts/VALIDATION.md) e as diretrizes visuais em [`docs/VISUAL-IDENTITY.md`](./docs/VISUAL-IDENTITY.md).
