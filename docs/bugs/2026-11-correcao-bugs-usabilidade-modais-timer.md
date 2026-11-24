# 🐛 Bug Report

## Identificação

| Campo | Valor |
|-------|-------|
| **Título** | Correção de Bugs no Cronômetro de Descanso, Input Numérico, Modais, Calendário e Layout Mobile |
| **Reportado por** | Revisão Técnica Completa |
| **Data** | 24/11/2026 |
| **Severidade** | [ ] Bloqueante [ ] Crítico [x] Moderado [ ] Baixo |
| **Ambiente** | [ ] Produção [ ] Homologação [x] Desenvolvimento |
| **Módulo** | Cronômetro, Execução de Séries, Modais e Calendário |
| **Camada** | [x] Frontend [ ] Backend [ ] Infra |

---

## Resumo

> Conjunto de bugs de interface e estado identificados durante auditoria geral do app: loop de recriação de `setInterval` e travamento visual no cronômetro de descanso, impossibilidade de apagar dígitos ao editar repetições, falta de fechamento consistente em modais (`Esc`/backdrop), deslocamento de fuso horário em registros retroativos no calendário e controles ocultos no mobile.

---

## Evidências e Análise Técnica

### Causa raiz

1. **Cronômetro (`src/App.tsx`, `src/components/RestTimerBar.tsx`)**:
   - O `useEffect` do timer incluía `timeLeft` no array de dependências, recriando `setInterval` e listeners de `visibilitychange` a cada segundo e mantendo a barra travada em `00:00` indefinidamente ao zerar.
   - `RestTimerBar` não guardava estado de disparo sonoro, podendo repetir som/vibração se houvesse re-render com `timeLeft === 0`.
2. **Input de Repetições (`src/components/ExerciseCard.tsx`, `src/hooks/useWorkouts.ts`)**:
   - `onChange` chamava `parseInt(e.target.value, 10) || 0` diretamente a cada tecla, substituindo o campo por `0` assim que o usuário apagava o número no teclado virtual do celular.
3. **Acessibilidade e Estado de Modais (`AuthModal.tsx`, `FinishWorkoutModal.tsx`, `MonthCalendarModal.tsx`, demais modais)**:
   - Ausência de listener de tecla `Escape` e clique no backdrop; `AuthModal` não sincronizava `tab`/`name`/`color` quando `user` ou `profile` carregavam de forma assíncrona; `FinishWorkoutModal` mantinha duração/calorias antigas de sessões anteriores e ignorava `preferences.soundEnabled`/`vibrateEnabled` e `prefers-reduced-motion`.
   - `MonthCalendarModal` usava `selectedDateObj.toISOString()` às `00:00` locais (podendo mudar de dia conforme fuso UTC) e gravava sempre `12` séries fixas em vez do total real da ficha escolhida.
4. **Layout Mobile (`src/index.css`, `src/components/RoomLiveBar.tsx`)**:
   - `.history-shortcut` definia `font-size: 0` abaixo de `720px`, escondendo o texto "Histórico".
   - `RoomLiveBar` usava `hidden sm:flex` nas reações rápidas (`💪`, `🔥`, `⚡`), ocultando o recurso justamente em celulares.

### Arquivo(s) afetado(s)

| Arquivo | Área | Correção |
|---------|------|----------|
| `src/App.tsx` | Timer / Cloud Sync | Dependências do timer reduzidas para `[timerActive, isTimerPaused]`, adição de `timeLeftRef`, auto-fechamento em `2800ms` ao zerar e `pb-28` no `main` |
| `src/components/RestTimerBar.tsx` | Alerta único / Controles | `notifiedRef` para alerta sonoro/háptico único, mensagem de conclusão e botão `-15s` |
| `src/components/ExerciseCard.tsx` | `RepsStepper` | Rascunho local `draft` durante foco, validação `>= 1` no `blur`/`Enter` e botões `−`/`+` |
| `src/hooks/useDialogClose.ts` | Modais (12 arquivos) | Fechamento por `Escape`, bloqueio de scroll no `body` e clique no backdrop em todos os modais |
| `src/components/AuthModal.tsx` | Estado ao abrir | Sincronização de `tab`, `name`, `selectedColor` via `useEffect([isOpen, user, profile])` |
| `src/components/FinishWorkoutModal.tsx` | Som/Confete/Reset | Reset de campos ao abrir, leitura de preferências sonoras/hápticas e `prefers-reduced-motion` |
| `src/components/MonthCalendarModal.tsx` | Registro retroativo | Uso de horário local `18:00` e total de séries calculado da ficha selecionada |
| `src/components/RoomLiveBar.tsx` | Reações Mobile | Remoção de `hidden sm:flex` para `flex` |
| `src/index.css` | CSS Mobile | Restauração de texto no `.history-shortcut` e grid do stepper responsivo até `360px` |

---

## Critérios de Aceite

- [x] Cronômetro faz contagem regressiva sem recriar intervalos por tick, toca o alerta uma única vez e fecha automaticamente após exibir `"Pronto! Próxima série"`.
- [x] Editar repetições pelo teclado permite apagar dígitos livremente antes de confirmar, ou ajustar em 1 toque via botões `−`/`+`.
- [x] Todos os modais respondem a `Escape`, clique no backdrop e mantêm foco/rolagem estáveis.
- [x] Registros retroativos no calendário respeitam a data local selecionada e o número real de séries da ficha.
- [x] Botões `"Histórico"` e reações em dupla visíveis e tocáveis no mobile.

---

## Correção

- [x] Fix implementado em `src/`
- [x] Verificado em build TypeScript/Vite e inspeção visual desktop/mobile
- **Demanda relacionada:** [2026-11-reformulacao-usabilidade-e-treinos-gerais.md](../demandas/2026-11-reformulacao-usabilidade-e-treinos-gerais.md)
