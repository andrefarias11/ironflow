# 📋 Demanda / Feature

## Identificação

| Campo | Valor |
|-------|-------|
| **Título** | Reformulação de Usabilidade, Foco em Uso Geral e Fichas de Fácil Execução (Upper/Lower Guiado) |
| **Solicitante** | Produto / Usuário Final |
| **Data** | 24/11/2026 |
| **Prioridade** | [ ] Crítica [x] Alta [ ] Média [ ] Baixa |
| **Módulo** | Fichas de Treino, UX Mobile/Desktop e Agente Especialista |
| **Camada** | [x] Frontend [ ] Backend [ ] Ambos |

---

## Resumo

> Substituir o plano rígido de 5 dias com foco em meta específica de peso corporal por uma experiência universal de fácil execução para uso geral (4 fichas Upper/Lower guiadas em máquinas e polias), acompanhada da criação permanente do agente `.agents/agents/especialista-treino.md` e melhorias abrangentes de usabilidade no registro de séries, cronômetro e modais.

---

## Escopo Técnico

### Frontend

**Agente de Prescrição & Customização:**

| Caminho | Tipo | Ação |
|---------|------|------|
| `.agents/agents/especialista-treino.md` | Agente de Workspace | Criar com diretrizes científicas (ACSM, NSCA, Haugen et al. 2023, Iversen & Schoenfeld 2021), árvore de substituição e contrato `Workout` |

**Telas / Componentes / Hooks:**

| Arquivo | Símbolo / Componente | Ação |
|---------|----------------------|------|
| `src/components/ProgramPlanModal.tsx` | `ProgramPlanModal` | Remover componente específico de meta de peso (`111 kg → 90 kg`) |
| `src/data/defaultWorkouts.ts` | `DEFAULT_WORKOUTS`, `CURRENT_TEMPLATE_VERSION`, `needsDefaultMigration`, `prepareWorkouts` | Atualizar para versão `5` com 4 fichas acessíveis em máquinas/polias (Treinos A, B, C e D, 15–18 séries/sessão) e migração automática preservando treinos customizados |
| `src/utils/streak.ts` | `isScheduledRestDay` | Alinhar descansos programados para Quarta (`3`), Sábado (`6`) e Domingo (`0`) no ciclo de 4 fichas |
| `src/hooks/useDialogClose.ts` | `useDialogClose` | Criar hook reutilizável para fechar modais via `Escape` e bloquear scroll do `body` |
| `src/hooks/useWorkouts.ts` | `useWorkouts` | Atualizar `STORAGE_KEYS` para `_v5`, limpar chaves obsoletas, estimar duração real via `sessionStartedAt`, adicionar `deleteWorkout` e usar total real de séries em `addPastWorkoutEntry` |
| `src/App.tsx` | `App` | Remover banners/botões de meta de peso, migrar rotinas da nuvem via `needsDefaultMigration`, adicionar botão de exclusão de ficha (quando > 1) e ajustar cronômetro + espaçamento inferior (`pb-28`) |
| `src/components/Header.tsx` | `Header` | Remover botão `Target` da antiga meta e padronizar `type="button"` |
| `src/components/ExerciseCard.tsx` | `ExerciseCard`, `RepsStepper` | Adicionar controles táteis `−` / `+` de fácil toque com uma mão, edição fluida de repetições, exibição de `repRange` e opções de descanso `[45, 60, 75, 90, 120]` |
| `src/components/RestTimerBar.tsx` | `RestTimerBar` | Exibir estado de conclusão `"Pronto! Próxima série"` e botão rápido `-15s` junto a `+30s` |
| `src/components/WorkoutTabs.tsx` | `WorkoutTabs` | Exibir badge `Sugerido` no mobile para orientar a próxima ficha do ciclo |
| `src/components/InstallGuideModal.tsx` | `InstallGuideModal` | Suportar instruções tanto para iPhone (Safari) quanto para Android (Chrome) |
| `src/components/FinishWorkoutModal.tsx` | `FinishWorkoutModal` | Usar duração estimada da sessão, respeitar preferências sonoras/hápticas e generalizar rótulo de smartwatch |
| `src/components/SettingsModal.tsx` | `SettingsModal` | Atualizar atalhos e texto de restauração para `"Restaurar fichas padrão (A, B, C e D)"` |
| `src/components/RoomLiveBar.tsx` | `RoomLiveBar` | Liberar botões de reação rápida (`💪`, `🔥`, `⚡`) também no mobile |
| `src/index.css` & `index.html` | CSS global / Meta tags | Restaurar rótulo visível de `Histórico` no mobile, responsividade do `.set-stepper-wrap` até `360px` e remover meta tag duplicada no `index.html` |

**Estado & Persistência:**
- Chaves ativas no `localStorage`: `treino_app_workouts_general_v5` e `treino_app_active_id_general_v5`.
- Chaves obsoletas removidas automaticamente na inicialização: `treino_app_workouts_upper_lower_v3`, `treino_app_active_id_upper_lower_v3`, `treino_app_workouts_recomp_v4`, `treino_app_active_id_recomp_v4`, `treino_notification_tracker_v1`.
- Persistência em nuvem mantida sem alterações de schema SQL no Supabase (`public.user_workouts.workouts_data` em JSONB).

---

## Critérios de Aceite

- [x] Zero referências residuais à antiga meta (`111 kg`, `90 kg`, `ProgramPlanModal`, `Diretrizes`) em `src/`.
- [x] Fichas padrão `Treino A, B, C e D` estruturadas com exercícios guiados, repetições confortáveis (`10–15`), descansos de `60s–90s` e alternativas imediatas para aparelhos ocupados.
- [x] Digitação e ajuste com botões `−`/`+` de repetições funcionam sem saltos para `0` e sem overflow em viewport de `360px`.
- [x] Todos os 12 modais fecham com tecla `Escape` e clique fora, sem vazar rolagem ao fundo.
- [x] Build de produção (`tsc && vite build`) executado sem erros.

---

## Dependências

- [ ] Migração de banco necessária? Não (migração de template ocorre em runtime no frontend antes de salvar `workouts_data` no Supabase).
- [ ] Feature flag? Não.
- [x] Documentação relacionada: [2026-11-correcao-bugs-usabilidade-modais-timer.md](../bugs/2026-11-correcao-bugs-usabilidade-modais-timer.md)

---

## Observações

- Usuários com treinos personalizados criados manualmente (`id` fora de `LEGACY_DEFAULT_IDS`) têm suas fichas preservadas durante a migração automática do template.
