import { Workout } from '../types/workout';

export const DEFAULT_WORKOUTS: Workout[] = [
  // =========================================================================
  // TREINO A (Segunda-feira): Superiores Completo (Foco Empurrar)
  // 5 min Mobilidade + 40 min Musculação + 15 min Cardio sem impacto
  // =========================================================================
  {
<<<<<<< HEAD
    id: 'workout-a-upper-push',
    name: 'Treino A',
    category: 'Superiores (Empurrar)',
    description: 'Foco Empurrar: 5 min mobilidade + 40 min musculação + 15 min cardio esteira inclinada',
    exercises: [
      {
        id: 'ta-mob',
        name: 'Mobilidade Articular (Ombros & Torácica)',
        muscleGroup: 'Mobilidade / Aquecimento',
        notes: 'Rotação de ombros com bastão (2x15) + Abertura torácica na parede (2x10 cada lado). 5 min para destravar articulações.',
        restSeconds: 30,
        sets: [
          { id: 'ta-mob-s1', setNumber: 1, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
          { id: 'ta-mob-s2', setNumber: 2, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Manguito Rotador e Coluna Torácica',
          secondaryMuscles: ['Deltóides', 'Peitoral Menor'],
          instructions: [
            'Segure um bastão com pegada ampla e passe por cima da cabeça até as costas sem dobrar os braços (15 rotações).',
            'Em seguida, apoie um antebraço na parede e gire o tronco para o lado oposto para abrir a caixa torácica (10 reps por lado).',
            'Respire fundo e aumente a amplitude gradualmente sem forçar a articulação.'
          ],
          tips: [
            'Não pule esta etapa: ela aquece a articulação do ombro para o supino e o desenvolvimento pesado.',
            'Mantenha o abdômen firme durante todo o movimento para não compensar na lombar.'
          ],
          mistakes: [
            'Fazer movimentos bruscos ou com pressa.',
            'Dobrar os cotovelos na rotação com bastão.'
          ],
          videoQuery: 'mobilidade de ombro com bastao e abertura toracica'
        }
      },
      {
        id: 'ta-1',
        name: 'Supino Reto com Halteres (ou Máquina)',
        muscleGroup: 'Peitoral',
        notes: 'Escápulas travadas, cotovelos fechados a 45°-60° (formato de seta, nunca em "T"), 10 a 12 reps',
        restSeconds: 75,
        sets: [
          { id: 'ta-1-s1', setNumber: 1, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 },
          { id: 'ta-1-s2', setNumber: 2, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 },
          { id: 'ta-1-s3', setNumber: 3, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 },
          { id: 'ta-1-s4', setNumber: 4, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Peitoral Maior',
          secondaryMuscles: ['Tríceps', 'Deltóide Anterior'],
          instructions: [
            'Deite no banco com os pés bem firmes e cravados no chão.',
            'Aperte e abaixe as escápulas contra o banco para criar uma base sólida de estabilidade.',
            'Desça os halteres de forma controlada até a linha média/inferior do peitoral.',
            'Mantenha os cotovelos fechados a cerca de 45° a 60° em relação ao tronco (formato de seta).',
            'Empurre os halteres contraindo o peito, parando logo antes de esticar totalmente os cotovelos.'
          ],
          tips: [
            'Regra de postura: Nunca desça os cotovelos alinhados em 90° com a linha do ombro (formato de "T"), pois isso pinça o tendão do ombro.',
            'Pressione o peito para cima enquanto os halteres sobem.'
          ],
          mistakes: [
            'Abrir os cotovelos a 90° forçando o manguito rotador.',
            'Bater os halteres com força no topo perdendo a tensão.',
            'Tirar o quadril ou os pés do chão durante o esforço.'
          ],
          videoQuery: 'execucao correta supino reto com halteres'
        }
      },
      {
        id: 'ta-2',
        name: 'Puxada Alta na Polia (Pegada Aberta)',
        muscleGroup: 'Costas / Dorsal',
        notes: 'Abaixe os ombros antes de puxar, direcione os cotovelos para as costelas/bolsos, 10 a 12 reps',
        restSeconds: 75,
        sets: [
          { id: 'ta-2-s1', setNumber: 1, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'ta-2-s2', setNumber: 2, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'ta-2-s3', setNumber: 3, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'ta-2-s4', setNumber: 4, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Grande Dorsal (Costas)',
          secondaryMuscles: ['Bíceps', 'Braquial', 'Trapézio'],
          instructions: [
            'Ajuste o suporte das coxas para ficar bem travado no banco.',
            'Segure a barra com pegada pronada um pouco além da largura dos ombros.',
            'Antes de flexionar os cotovelos, abaixe ativamente as escápulas (afaste os ombros das orelhas).',
            'Puxe a barra em direção ao peito alto, pensando em colocar os cotovelos nos bolsos traseiros da bermuda.',
            'Suba controlando o peso até estender os braços e alongar a musculatura das costas.'
          ],
          tips: [
            'Iniciantes costumam puxar com o bíceps: pense em cotoveladas para baixo.',
            'Mantenha uma leve inclinação do tronco para trás (10° a 15°), sem balançar com a lombar.'
          ],
          mistakes: [
            'Puxar a barra por trás da cabeça.',
            'Dar tranco com a lombar para iniciar a puxada.',
            'Encolher os ombros junto ao pescoço no final do movimento.'
          ],
          videoQuery: 'execucao correta puxada alta pegada aberta pulley'
        }
      },
      {
        id: 'ta-3',
        name: 'Desenvolvimento com Halteres (Sentado)',
        muscleGroup: 'Ombros',
        notes: 'Banco a ~75°-80°, cotovelos no plano escapular (levemente à frente do corpo), 10 a 12 reps',
        restSeconds: 60,
        sets: [
          { id: 'ta-3-s1', setNumber: 1, weight: 14, reps: 10, completed: false, previousWeight: 14, previousReps: 10 },
          { id: 'ta-3-s2', setNumber: 2, weight: 14, reps: 10, completed: false, previousWeight: 14, previousReps: 10 },
          { id: 'ta-3-s3', setNumber: 3, weight: 14, reps: 10, completed: false, previousWeight: 14, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Deltóide Anterior e Lateral',
          secondaryMuscles: ['Tríceps', 'Trapézio Superior'],
          instructions: [
            'Sente-se em um banco ajustado a cerca de 75° a 80° (encosto quase reto).',
            'Suba os halteres na altura das orelhas, com os cotovelos apontando levemente à frente (plano escapular).',
            'Empurre os halteres para o alto em linha reta sem deixá-los bater no topo.',
            'Desça lentamente até os halteres ficarem alinhados ao queixo/orelha.'
          ],
          tips: [
            'Mantenha o peito aberto e a lombar apoiada.',
            'Nunca abra os cotovelos em 180° retilíneos para preservar a articulação dos ombros.'
          ],
          mistakes: [
            'Arquear excessivamente a coluna tirando as costas do encosto.',
            'Bater os halteres em cima perdendo a tensão muscular contínua.',
            'Descer muito pouco (meia repetição).'
          ],
          videoQuery: 'execucao correta desenvolvimento sentado com halteres'
        }
      },
      {
        id: 'ta-4',
        name: 'Remada Baixa no Triângulo',
        muscleGroup: 'Costas / Meio das Costas',
        notes: 'Tronco firme e reto, estufe o peito e puxe com os cotovelos até a linha da cintura, 12 reps',
        restSeconds: 60,
        sets: [
          { id: 'ta-4-s1', setNumber: 1, weight: 40, reps: 12, completed: false, previousWeight: 40, previousReps: 12 },
          { id: 'ta-4-s2', setNumber: 2, weight: 40, reps: 12, completed: false, previousWeight: 40, previousReps: 12 },
          { id: 'ta-4-s3', setNumber: 3, weight: 40, reps: 12, completed: false, previousWeight: 40, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Rombóides, Trapézio Médio e Dorsal',
          secondaryMuscles: ['Bíceps', 'Antebraço', 'Lombar Isométrica'],
          instructions: [
            'Sente-se com os pés firmes nos apoios e joelhos levemente destravados.',
            'Segure o triângulo, mantenha o peito estufado e a coluna neutra.',
            'Puxe o triângulo em direção ao umbigo, projetando os cotovelos rente às costelas para trás.',
            'Aperte as escápulas juntas por 1 segundo no ponto de pico.',
            'Retorne controladamente sentindo o alongamento das costas.'
          ],
          tips: [
            'Evite balançar o corpo para frente e para trás; o movimento deve ser feito pelos braços e escápulas.',
            'Foque na sensação de "esmagar uma caneta entre as omoplatas".'
          ],
          mistakes: [
            'Curvar as costas (arredondar a coluna lombar).',
            'Puxar com o bíceps trazendo o triângulo para o peito alto.'
          ],
          videoQuery: 'execucao correta remada baixa triangulo pulley'
        }
      },
      {
        id: 'ta-5',
        name: 'Tríceps Corda na Polia',
        muscleGroup: 'Tríceps',
        notes: 'Cotovelos travados ao lado das costelas, abra a corda na parte de baixo contraindo forte, 12 a 15 reps',
        restSeconds: 45,
        sets: [
          { id: 'ta-5-s1', setNumber: 1, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 },
          { id: 'ta-5-s2', setNumber: 2, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 },
          { id: 'ta-5-s3', setNumber: 3, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Tríceps Braquial (Cabeça Lateral e Longa)',
          secondaryMuscles: ['Antebraço'],
          instructions: [
            'Prenda a corda na polia alta. Incline o tronco sutilmente à frente.',
            'Trave os cotovelos firmes e grudados ao lado do tórax.',
            'Estenda os braços para baixo até que fiquem retos.',
            'No ponto final, afaste as pontas da corda para os lados forçando a contração máxima do tríceps.',
            'Suba a mão até a linha do peito sem mover os cotovelos do lugar.'
          ],
          tips: [
            'Os cotovelos funcionam como dobradiças fixas; se eles forem para frente e para trás, o ombro entra na jogada.'
          ],
          mistakes: [
            'Balançar o tronco para jogar o peso para baixo.',
            'Abrir os cotovelos para fora durante a descida.'
          ],
          videoQuery: 'execucao correta triceps corda pulley'
        }
      },
      {
        id: 'ta-6',
        name: 'Rosca Direta na Polia Baixa (ou Halteres)',
        muscleGroup: 'Bíceps',
        notes: 'Tronco fixo sem balanço lombar, amplitude completa controlando a descida, 12 a 15 reps',
        restSeconds: 45,
        sets: [
          { id: 'ta-6-s1', setNumber: 1, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 },
          { id: 'ta-6-s2', setNumber: 2, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 },
          { id: 'ta-6-s3', setNumber: 3, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Bíceps Braquial',
          secondaryMuscles: ['Braquial Anterior', 'Braquiorradial'],
          instructions: [
            'Fique em pé com pés paralelos na largura dos ombros.',
            'Segure a barra reta ou halteres com as palmas voltadas para cima.',
            'Mantenha os cotovelos colados ao lado do tronco.',
            'Flexione os antebraços erguendo a carga e contraindo o bíceps no topo.',
            'Desça lentamente em 2 a 3 segundos até a extensão quase total dos braços.'
          ],
          tips: [
            'A polia baixa mantém tensão constante mesmo no final do movimento.',
            'Mantenha os punhos retos e estáveis.'
          ],
          mistakes: [
            'Jogar os cotovelos para frente no topo.',
            'Balançar a coluna lombar para impulsionar a carga.'
          ],
          videoQuery: 'execucao correta rosca direta polia baixa'
        }
      },
      {
        id: 'ta-cardio',
        name: 'Cardio Final: Esteira Inclinada',
        muscleGroup: 'Cardio / Queima de Gordura',
        notes: 'Inclinação 5% a 8%, velocidade 5.0 a 5.5 km/h. Caminhada firme sem impacto articular por 15 minutos.',
        restSeconds: 60,
        sets: [
          { id: 'ta-cardio-s1', setNumber: 1, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Sistema Cardiovascular & Metabolismo',
          secondaryMuscles: ['Glúteos', 'Panturrilhas'],
          instructions: [
            'Suba na esteira e ajuste a inclinação entre 5% e 8%.',
            'Regule a velocidade entre 5.0 e 5.5 km/h (caminhada rápida e cadenciada).',
            'Mantenha os braços oscilando naturalmente ao lado do corpo, sem segurar nas barras de apoio.',
            'Mantenha a postura ereta e respire de forma controlada durante os 15 minutos.'
          ],
          tips: [
            'Regra para 111 kg: Caminhada inclinada gera o mesmo gasto calórico que um trote, mas com ZERO impacto destrutivo nos joelhos e canelas.',
            'Não se segure no painel; segurar no painel retira a carga de inclinação das pernas.'
          ],
          mistakes: [
            'Correr em dia de musculação pesada (guarde o impacto da corrida para a quarta-feira).',
            'Segurar o peso do corpo nos apoios da esteira.'
          ],
          videoQuery: 'beneficios caminhada esteira inclinada queima gordura'
=======
    "id": "workout-upper-a",
    "name": "Treino A",
    "category": "Superiores A — Peito e Costas",
    "description": "Base para 4 dias por semana: A/B, descanso, C/D. Faça aquecimento antes das séries. Termine com 1–3 repetições possíveis com boa técnica. Ao atingir o topo da faixa em todas as séries, aumente a resistência no menor incremento disponível.",
    "exercises": [
      {
        "id": "ua-1",
        "name": "Supino Reto (Barra ou Halteres)",
        "muscleGroup": "Peitoral",
        "notes": "4 séries de 8–12 repetições. Escápulas apoiadas e pés firmes.",
        "restSeconds": 150,
        "sets": [
          {
            "id": "ua-1-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-1-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-1-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-1-s4",
            "setNumber": 4,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Peitoral Maior",
          "secondaryMuscles": [
            "Tríceps",
            "Deltóide Anterior"
          ],
          "instructions": [
            "Deite no banco com os olhos alinhados à barra e pés apoiados no chão.",
            "Junte e empurre as escápulas para trás e para baixo contra o banco.",
            "Segure a barra com uma pegada um pouco mais larga que a linha dos ombros.",
            "Desça a barra de forma controlada até tocar suavemente a parte média/inferior do peito (linha dos mamilos).",
            "Empurre a barra estendendo os braços, sem projetar os ombros para frente no topo."
          ],
          "tips": [
            "Cotovelos devem formar um ângulo de 45° a 70° com o tronco (não abra a 90° para proteger os ombros).",
            "Mantenha o punho reto alinhado com o antebraço."
          ],
          "mistakes": [
            "Bater a barra no peito aproveitando o impulso.",
            "Tirar a lombar excessivamente ou tirar a bunda do banco.",
            "Abrir demais os cotovelos gerando atrito no ombro."
          ],
          "videoQuery": "execucao correta supino reto barra"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "ua-2",
        "name": "Remada Curvada com Barra",
        "muscleGroup": "Costas / Dorsal",
        "notes": "3 séries de 8–12 repetições. Tronco estável; puxe em direção ao quadril.",
        "restSeconds": 150,
        "sets": [
          {
            "id": "ua-2-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-2-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-2-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Dorsais e Trapézio Médio/Inferior",
          "secondaryMuscles": [
            "Bíceps",
            "Deltóide Posterior",
            "Lombar"
          ],
          "instructions": [
            "Pés na largura do quadril, joelhos levemente flexionados.",
            "Incline o tronco para frente a cerca de 45°, mantendo a coluna 100% reta.",
            "Segure a barra com pegada pronada (palmas para você) na largura dos ombros.",
            "Puxe a barra em direção ao umbigo / parte inferior do abdômen, puxando com os cotovelos.",
            "Aperte as costas no topo e desça a barra alongando as dorsais de forma controlada."
          ],
          "tips": [
            "Pense em cotoveladas para trás, não em dobrar o braço com o bíceps.",
            "Mantenha o abdômen contraído para proteger a lombar."
          ],
          "mistakes": [
            "Arredondar a coluna lombar (curvar as costas).",
            "Usar muito impulso balançando o tronco para cima.",
            "Puxar a barra muito alta no peito ao invés do abdômen."
          ],
          "videoQuery": "execucao correta remada curvada com barra"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "ua-4",
        "name": "Puxada Alta (Costas)",
        "muscleGroup": "Costas",
        "notes": "3 séries de 8–12 repetições. Puxe à frente do corpo com controle.",
        "restSeconds": 120,
        "sets": [
          {
            "id": "ua-4-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-4-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-4-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Grande Dorsal (Asas)",
          "secondaryMuscles": [
            "Bíceps",
            "Braquial",
            "Trapézio"
          ],
          "instructions": [
            "Ajuste o apoio das pernas para travar bem suas coxas no banco.",
            "Segure a barra com pegada pronada um pouco além da largura dos ombros.",
            "Incline o tronco levemente para trás (10° a 15°) e estufe o peito.",
            "Puxe a barra em direção à parte superior do peito, direcionando os cotovelos para baixo e para trás.",
            "Suba a barra controladamente permitindo que as escápulas subam e alonguem a musculatura dorsal."
          ],
          "tips": [
            "Pense em colocar os cotovelos dentro dos bolsos de trás da sua bermuda.",
            "Mantenha o peito aberto durante todo o movimento."
          ],
          "mistakes": [
            "Puxar a barra por trás do pescoço (risco articular desnecessário).",
            "Jogar o corpo excessivamente para trás usando a lombar.",
            "Encolher os ombros no final da puxada."
          ],
          "videoQuery": "execucao correta puxada alta costas pulley"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "ua-3",
        "name": "Desenvolvimento com Halteres",
        "muscleGroup": "Ombros",
        "notes": "2 séries de 8–12 repetições. Costas apoiadas; evite arquear a lombar.",
        "restSeconds": 120,
        "sets": [
          {
            "id": "ua-3-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ua-3-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Deltóide Anterior e Lateral",
          "secondaryMuscles": [
            "Tríceps",
            "Trapézio Superior"
          ],
          "instructions": [
            "Sente-se em um banco ajustado a cerca de 75° a 80° (quase reto).",
            "Suba os halteres na altura das orelhas, com os cotovelos levemente à frente do corpo (no plano escapular).",
            "Empurre os halteres para cima em uma trajetória suave até quase estender os braços.",
            "Desça lentamente até que os halteres fiquem na linha do queixo/orelha."
          ],
          "tips": [
            "Não bata os halteres no topo, mantenha a tensão nos ombros.",
            "Mantenha as costas firmemente apoiadas no encosto do banco."
          ],
          "mistakes": [
            "Abrir os cotovelos totalmente em 180° forçando o manguito.",
            "Arquear a lombar tirando as costas do banco.",
            "Fazer meia repetição descendo pouco."
          ],
          "videoQuery": "execucao correta desenvolvimento halteres ombros"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "ua-5",
        "name": "Tríceps no Pulley",
        "muscleGroup": "Tríceps",
        "notes": "2 séries de 10–15 repetições. Cotovelos junto ao corpo.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "ua-5-s1",
            "setNumber": 1,
            "reps": 10,
            "completed": false
          },
          {
            "id": "ua-5-s2",
            "setNumber": 2,
            "reps": 10,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Tríceps Braquial (Todas as 3 cabeças)",
          "secondaryMuscles": [
            "Antebraço"
          ],
          "instructions": [
            "Fique de pé com uma leve inclinação do tronco à frente e abdômen contraído.",
            "Trave os cotovelos rente às costelas e não mova eles do lugar.",
            "Empurre a barra ou corda para baixo estendendo completamente os cotovelos.",
            "No final, aperte o tríceps por 1 segundo e retorne até o antebraço formar 90° com o braço."
          ],
          "tips": [
            "O único movimento deve ser a articulação do cotovelo dobrando e esticando.",
            "Se estiver usando a corda, abra as pontas no final para contração máxima."
          ],
          "mistakes": [
            "Deixar os cotovelos subirem e descerem junto com o peso.",
            "Usar o peso do corpo para empurrar a barra."
          ],
          "videoQuery": "execucao correta triceps pulley barra corda"
        },
        "repRange": {
          "min": 10,
          "max": 15
        }
      },
      {
        "id": "ua-6",
        "name": "Rosca Direta",
        "muscleGroup": "Bíceps",
        "notes": "2 séries de 10–15 repetições. Evite balançar o tronco.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "ua-6-s1",
            "setNumber": 1,
            "reps": 10,
            "completed": false
          },
          {
            "id": "ua-6-s2",
            "setNumber": 2,
            "reps": 10,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Bíceps Braquial",
          "secondaryMuscles": [
            "Braquial",
            "Braquiorradial"
          ],
          "instructions": [
            "Fique de pé com os pés na largura dos ombros, segurando a barra ou halteres com palmas para cima.",
            "Cotovelos colados levemente à frente das costelas.",
            "Flexione os braços levantando a barra em direção aos ombros, contraindo forte o bíceps.",
            "Desça o peso lentamente estendendo o braço quase que por completo antes da próxima repetição."
          ],
          "tips": [
            "A descida (fase excêntrica) deve durar cerca de 2 a 3 segundos para maximizar hipertrofia."
          ],
          "mistakes": [
            "Jogar os quadris para frente ou balançar as costas para subir a carga.",
            "Levar os cotovelos muito para frente no topo aliviando a tensão do bíceps."
          ],
          "videoQuery": "execucao correta rosca direta barra w halteres"
        },
        "repRange": {
          "min": 10,
          "max": 15
>>>>>>> 1695103b45c374fcd4e61e586eb015f088b83e2a
        }
      }
    ],
    "templateVersion": 4
  },
  {
    "id": "workout-lower-a",
    "name": "Treino B",
    "category": "Inferiores A — Quadríceps",
    "description": "Base para 4 dias por semana: A/B, descanso, C/D. Faça aquecimento antes das séries. Termine com 1–3 repetições possíveis com boa técnica. Ao atingir o topo da faixa em todas as séries, aumente a resistência no menor incremento disponível.",
    "exercises": [
      {
        "id": "la-1",
        "name": "Agachamento Livre ou no Hack",
        "muscleGroup": "Quadríceps / Glúteos",
        "notes": "3 séries de 8–12 repetições. Joelhos acompanham os pés; amplitude confortável.",
        "restSeconds": 180,
        "sets": [
          {
            "id": "la-1-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "la-1-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "la-1-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Quadríceps e Glúteo Máximo",
          "secondaryMuscles": [
            "Posteriores de Coxa",
            "Adutores",
            "Core"
          ],
          "instructions": [
            "Posicione a barra apoiada nos trapézios (não no osso do pescoço).",
            "Pés na largura dos ombros, pontas dos pés viradas cerca de 15° a 30° para fora.",
            "Inspire fundo, contraia o abdômen e inicie o agachamento jogando o quadril para trás e dobrando os joelhos.",
            "Desça até as coxas ficarem paralelas ao chão (ou abaixo se tiver boa mobilidade).",
            "Empurre o chão com a sola do pé inteira para subir, mantendo o peito erguido."
          ],
          "tips": [
            "Os joelhos devem sempre acompanhar a direção das pontas dos pés.",
            "Se fizer no Hack, mantenha as costas e lombar 100% apoiadas na almofada."
          ],
          "mistakes": [
            "Deixar os joelhos entrarem para dentro (valgo dinâmico) ao subir.",
            "Tirar os calcanhares do chão.",
            "Curvar a coluna para a frente."
          ],
          "videoQuery": "execucao correta agachamento livre pernas"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "la-2",
        "name": "Leg Press 45º",
        "muscleGroup": "Pernas Geral",
        "notes": "3 séries de 10–15 repetições. Mantenha o quadril e a lombar apoiados.",
        "restSeconds": 150,
        "sets": [
          {
            "id": "la-2-s1",
            "setNumber": 1,
            "reps": 10,
            "completed": false
          },
          {
            "id": "la-2-s2",
            "setNumber": 2,
            "reps": 10,
            "completed": false
          },
          {
            "id": "la-2-s3",
            "setNumber": 3,
            "reps": 10,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Quadríceps e Glúteos",
          "secondaryMuscles": [
            "Posteriores"
          ],
          "instructions": [
            "Sente-se no aparelho mantendo o quadril e a coluna lombar colados no encosto.",
            "Pés na largura dos ombros no meio da plataforma.",
            "Destrave o aparelho e desça a plataforma controlando a carga até os joelhos dobrarem a ~90°.",
            "Empurre a plataforma de volta usando a força das pernas, parando antes de travar os joelhos."
          ],
          "tips": [
            "Segure firme nas alças laterais para puxar o quadril contra o assento.",
            "Nunca estenda 100% os joelhos (\"hiperestensão\") no topo com carga pesada."
          ],
          "mistakes": [
            "Deixar a lombar descolar do banco no fundo do movimento.",
            "Colocar as mãos sobre os joelhos para ajudar."
          ],
          "videoQuery": "execucao correta leg press 45"
        },
        "repRange": {
          "min": 10,
          "max": 15
        }
      },
      {
        "id": "la-4",
        "name": "Mesa Flexora (Posterior de coxa)",
        "muscleGroup": "Posterior de Coxa",
        "notes": "3 séries de 10–15 repetições. Mantenha o quadril apoiado.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "la-4-s1",
            "setNumber": 1,
            "reps": 10,
            "completed": false
          },
          {
            "id": "la-4-s2",
            "setNumber": 2,
            "reps": 10,
            "completed": false
          },
          {
            "id": "la-4-s3",
            "setNumber": 3,
            "reps": 10,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Isquiotibiais (Posterior de Coxa)",
          "secondaryMuscles": [
            "Panturrilhas"
          ],
          "instructions": [
            "Deite de bruços na mesa com a almofada de rolo ajustada logo abaixo das panturrilhas.",
            "Segure as manoplas e pressione o quadril ativamente contra o acolchoado.",
            "Flexione as pernas puxando o rolo em direção aos glúteos.",
            "No topo da contração segure por meio segundo e desça de forma cadenciada."
          ],
          "tips": [
            "Manter os pés em dorsiflexão (dedos apontados para você) aumenta a contração."
          ],
          "mistakes": [
            "Empinar a bunda ou levantar o quadril do acolchoado na subida.",
            "Dar tranco com a lombar."
          ],
          "videoQuery": "execucao correta mesa flexora posterior coxa"
        },
        "repRange": {
          "min": 10,
          "max": 15
        }
      },
      {
        "id": "la-3",
        "name": "Cadeira Extensora",
        "muscleGroup": "Quadríceps",
        "notes": "2 séries de 12–15 repetições. Subida controlada e pausa breve no topo.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "la-3-s1",
            "setNumber": 1,
            "reps": 12,
            "completed": false
          },
          {
            "id": "la-3-s2",
            "setNumber": 2,
            "reps": 12,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Quadríceps (Foco no Reto Femoral)",
          "secondaryMuscles": [],
          "instructions": [
            "Ajuste o encosto para que o joelho fique exatamente no eixo de rotação da máquina.",
            "A almofada deve ficar na parte inferior da canela, logo acima dos tornozelos.",
            "Segure as alças laterais para prender o quadril no banco.",
            "Estenda os joelhos até alinhar as pernas, contraindo forte a coxa no topo por 1 segundo.",
            "Desça o peso lentamente em 2 a 3 segundos."
          ],
          "tips": [
            "Não use impulso para subir o peso, sinta o quadríceps queimando."
          ],
          "mistakes": [
            "Tirar o quadril do banco ao subir a carga.",
            "Soltar o peso despencando na descida."
          ],
          "videoQuery": "execucao correta cadeira extensora quadriceps"
        },
        "repRange": {
          "min": 12,
          "max": 15
        }
      },
      {
        "id": "la-5",
        "name": "Panturrilha em Pé",
        "muscleGroup": "Panturrilhas",
        "notes": "3 séries de 12–20 repetições. Amplitude confortável e pausa no alongamento.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "la-5-s1",
            "setNumber": 1,
            "reps": 12,
            "completed": false
          },
          {
            "id": "la-5-s2",
            "setNumber": 2,
            "reps": 12,
            "completed": false
          },
          {
            "id": "la-5-s3",
            "setNumber": 3,
            "reps": 12,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Gastrocnêmio (Panturrilha)",
          "secondaryMuscles": [
            "Sóleo"
          ],
          "instructions": [
            "Posicione a ponta dos pés na borda da plataforma, joelhos estendidos (mas sem travar).",
            "Desça os calcanhares o máximo possível para alongar completamente a panturrilha.",
            "Segure 2 segundos no ponto mais baixo para dissipar a energia elástica do tendão.",
            "Empurre o chão com a ponta dos pés subindo na ponta dos pés ao máximo e aperte no topo."
          ],
          "tips": [
            "O segredo da panturrilha é a amplitude máxima e a pausa embaixo."
          ],
          "mistakes": [
            "Fazer repetições curtas e rápidas pulando no lugar.",
            "Dobrar os joelhos durante a subida."
          ],
          "videoQuery": "execucao correta panturrilha em pe maquina"
        },
        "repRange": {
          "min": 12,
          "max": 20
        }
      }
    ],
    "templateVersion": 4
  },
  {
    "id": "workout-upper-b",
    "name": "Treino C",
    "category": "Superiores B — Peito, Costas e Ombros",
    "description": "Base para 4 dias por semana: A/B, descanso, C/D. Faça aquecimento antes das séries. Termine com 1–3 repetições possíveis com boa técnica. Ao atingir o topo da faixa em todas as séries, aumente a resistência no menor incremento disponível.",
    "exercises": [
      {
        "id": "ub-1",
        "name": "Supino Inclinado com Halteres",
        "muscleGroup": "Peitoral Superior",
        "notes": "4 séries de 8–12 repetições. Escápulas apoiadas; descida controlada.",
        "restSeconds": 150,
        "sets": [
          {
            "id": "ub-1-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ub-1-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ub-1-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ub-1-s4",
            "setNumber": 4,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Peitoral Superior (Porção Clavicular)",
          "secondaryMuscles": [
            "Deltóide Anterior",
            "Tríceps"
          ],
          "instructions": [
            "Ajuste o banco em uma inclinação de 30° a 45° (mais de 45° trabalha mais ombro que peito).",
            "Sente-se com os halteres nas coxas e dê um impulso com os joelhos para posicioná-los no peito.",
            "Escápulas aduzidas, empurre os halteres para cima convergindo levemente no topo.",
            "Desça os halteres alongando a parte superior do peito até a linha dos ombros."
          ],
          "tips": [
            "Mantenha os cotovelos levemente fechados (~45° a 60°), não abra totalmente."
          ],
          "mistakes": [
            "Inclinar o banco em 60° transformando o exercício em desenvolvimento de ombros.",
            "Tirar a cabeça ou glúteos do banco."
          ],
          "videoQuery": "execucao correta supino inclinado halteres"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "ub-2",
        "name": "Remada Serrote (Unilateral Halter)",
        "muscleGroup": "Costas / Dorsal",
        "notes": "3 séries de 8–12 repetições. Apoie o tronco e evite girá-lo.",
        "restSeconds": 150,
        "sets": [
          {
            "id": "ub-2-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ub-2-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ub-2-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Grande Dorsal (Unilateral)",
          "secondaryMuscles": [
            "Trapézio",
            "Romboide",
            "Bíceps"
          ],
          "instructions": [
            "Apoie um joelho e a mão do mesmo lado em um banco plano.",
            "Mantenha o tronco paralelo ao chão e a coluna neutra e firme.",
            "Com a outra mão, segure o halter estendido em direção ao chão.",
            "Puxe o halter fazendo uma curva em direção ao quadril/bolso, guiando o cotovelo para cima e para trás.",
            "Aperte a asa da dorsal no topo e desça alongando completamente."
          ],
          "tips": [
            "Não gire o tronco para subir o peso, mantenha o peito voltado para o chão."
          ],
          "mistakes": [
            "Puxar o halter reto para a axila (usa mais bíceps e ombro do que dorsal).",
            "Girar e torcer a coluna para conseguir subir a carga."
          ],
          "videoQuery": "execucao correta remada serrote unilateral halter"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "ub-4",
        "name": "Barra Fixa ou Puxador c/ Triângulo",
        "muscleGroup": "Costas",
        "notes": "3 séries de 8–12 repetições. Peito aberto; puxe sem balançar o tronco.",
        "restSeconds": 120,
        "sets": [
          {
            "id": "ub-4-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ub-4-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "ub-4-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Dorsais e Miolo das Costas",
          "secondaryMuscles": [
            "Bíceps",
            "Braquiorradial"
          ],
          "instructions": [
            "Se fizer no puxador com triângulo (pegada neutra): trave as pernas e estufe o peito.",
            "Puxe o triângulo em direção ao peitoral superior, fechando as escápulas atrás.",
            "Segure 1 segundo no peito e suba alongando as costas até os braços estenderem quase por completo."
          ],
          "tips": [
            "A pegada neutra com triângulo é excelente para segurança dos ombros e ativação dorsal profunda."
          ],
          "mistakes": [
            "Jogar as costas totalmente para trás transformando em remada.",
            "Não estender os braços na subida, encurtando o movimento."
          ],
          "videoQuery": "execucao correta puxada frente triangulo pegada neutra"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "ub-7",
        "name": "Crucifixo na Máquina ou no Cabo",
        "muscleGroup": "Peitoral",
        "repRange": {
          "min": 12,
          "max": 15
        },
        "notes": "2 séries de 12–15 repetições. Cotovelos levemente flexionados; amplitude confortável.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "ub-7-s1",
            "setNumber": 1,
            "reps": 12,
            "completed": false
          },
          {
            "id": "ub-7-s2",
            "setNumber": 2,
            "reps": 12,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Peitoral maior",
          "secondaryMuscles": [
            "Deltóide anterior"
          ],
          "instructions": [
            "Ajuste os apoios ou cabos à altura do peito.",
            "Mantenha os cotovelos levemente flexionados e o tronco estável.",
            "Aproxime os braços à frente do peito e retorne com controle."
          ],
          "tips": [
            "Use uma amplitude confortável para os ombros."
          ],
          "mistakes": [
            "Usar impulso ou levar os braços excessivamente para trás."
          ],
          "videoQuery": "execucao crucifixo maquina peck deck"
        }
      },
      {
        "id": "ub-3",
        "name": "Elevação Lateral com Halteres",
        "muscleGroup": "Deltóide Lateral",
        "notes": "3 séries de 12–20 repetições. Eleve sem impulso, com cotovelos levemente flexionados.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "ub-3-s1",
            "setNumber": 1,
            "reps": 12,
            "completed": false
          },
          {
            "id": "ub-3-s2",
            "setNumber": 2,
            "reps": 12,
            "completed": false
          },
          {
            "id": "ub-3-s3",
            "setNumber": 3,
            "reps": 12,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Deltóide Lateral (Largura dos Ombros)",
          "secondaryMuscles": [
            "Trapézio Superior"
          ],
          "instructions": [
            "Fique de pé com tronco levemente inclinado para a frente (5° a 10°).",
            "Segure os halteres ao lado das coxas, cotovelos levemente flexionados.",
            "Eleve os braços lateralmente até a altura da linha dos ombros, com os cotovelos liderando o movimento.",
            "Desça controladamente sem bater os halteres nas coxas para manter a tensão constante."
          ],
          "tips": [
            "Imagine que você está derramando uma jarra de água no topo: o dedo mindinho fica levemente mais alto que o polegar."
          ],
          "mistakes": [
            "Usar peso pesado demais e ficar dando trancos com o corpo.",
            "Subir as mãos mais alto do que os cotovelos.",
            "Encolher os ombros ativando excessivamente o trapézio."
          ],
          "videoQuery": "execucao correta elevacao lateral halteres ombro"
        },
        "repRange": {
          "min": 12,
          "max": 20
        }
      },
      {
        "id": "ub-5",
        "name": "Tríceps Testa ou Corda",
        "muscleGroup": "Tríceps",
        "notes": "2 séries de 10–15 repetições. Braços estáveis; extensão controlada.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "ub-5-s1",
            "setNumber": 1,
            "reps": 10,
            "completed": false
          },
          {
            "id": "ub-5-s2",
            "setNumber": 2,
            "reps": 10,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Tríceps Braquial (Cabeça Longa)",
          "secondaryMuscles": [
            "Antebraço"
          ],
          "instructions": [
            "Deite em um banco plano segurando a barra W ou halteres acima dos olhos.",
            "Incline os braços ligeiramente para trás (cerca de 10° em relação à vertical) para manter a tensão constante.",
            "Dobre apenas os cotovelos, descendo a barra controladamente em direção ao topo da cabeça/testa.",
            "Estenda os cotovelos voltando à posição inicial sem mexer a parte superior dos braços."
          ],
          "tips": [
            "Não abra os cotovelos para os lados; mantenha-os paralelos."
          ],
          "mistakes": [
            "Balançar os braços para frente e para trás usando os ombros.",
            "Descer a carga muito rápido arriscando bater na testa."
          ],
          "videoQuery": "execucao correta triceps testa barra w"
        },
        "repRange": {
          "min": 10,
          "max": 15
        }
      },
      {
        "id": "ub-6",
        "name": "Rosca Martelo",
        "muscleGroup": "Bíceps / Braquial",
        "notes": "2 séries de 10–15 repetições. Pegada neutra; evite impulso.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "ub-6-s1",
            "setNumber": 1,
            "reps": 10,
            "completed": false
          },
          {
            "id": "ub-6-s2",
            "setNumber": 2,
            "reps": 10,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Braquial e Braquiorradial (Antebraço)",
          "secondaryMuscles": [
            "Bíceps Braquial"
          ],
          "instructions": [
            "Fique de pé segurando halteres com as palmas voltadas uma para a outra (pegada neutra).",
            "Cotovelos colados nas laterais do corpo.",
            "Suba os halteres sem girar os punhos, mantendo as palmas viradas para dentro.",
            "Aperte no topo e desça lentamente até a extensão total dos braços."
          ],
          "tips": [
            "Excelente exercício para dar espessura lateral ao braço e antebraço forte."
          ],
          "mistakes": [
            "Girar o punho durante o movimento (virando rosca tradicional).",
            "Balançar o tronco para dar impulso."
          ],
          "videoQuery": "execucao correta rosca martelo halteres"
        },
        "repRange": {
          "min": 10,
          "max": 15
        }
      }
    ],
    "templateVersion": 4
  },
  {
    "id": "workout-lower-b",
    "name": "Treino D",
    "category": "Inferiores B — Posteriores e Glúteos",
    "description": "Base para 4 dias por semana: A/B, descanso, C/D. Faça aquecimento antes das séries. Termine com 1–3 repetições possíveis com boa técnica. Ao atingir o topo da faixa em todas as séries, aumente a resistência no menor incremento disponível.",
    "exercises": [
      {
        "id": "lb-1",
        "name": "Levantamento Terra Romeno (RDL)",
        "muscleGroup": "Posterior / Glúteos",
        "notes": "3 séries de 8–12 repetições. Leve o quadril para trás; mantenha a coluna estável.",
        "restSeconds": 180,
        "sets": [
          {
            "id": "lb-1-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "lb-1-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "lb-1-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Isquiotibiais (Posterior de Coxa) e Glúteos",
          "secondaryMuscles": [
            "Eretores da Espinha / Lombar",
            "Antebraço"
          ],
          "instructions": [
            "Fique de pé com a barra ou halteres na frente das coxas, pés na largura do quadril.",
            "Destrave levemente os joelhos (mantenha esse ângulo fixo, não agache!).",
            "Inicie o movimento empurrando o quadril para trás, como se fosse tocar uma parede com a bunda.",
            "Desça a barra rente às pernas até sentir um alongamento forte nos posteriores da coxa (altura da canela).",
            "Contraia os glúteos e empurre o quadril de volta para a frente até ficar em pé."
          ],
          "tips": [
            "Mantenha a barra colada nas pernas o tempo todo.",
            "A coluna deve ficar 100% reta, com peito aberto."
          ],
          "mistakes": [
            "Dobrar os joelhos demais transformando em agachamento.",
            "Arredondar as costas na descida (risco para a lombar).",
            "Olhar para cima hiperestendendo o pescoço."
          ],
          "videoQuery": "execucao correta levantamento terra romeno rdl"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "lb-2",
        "name": "Afundo ou Agachamento Búlgaro",
        "muscleGroup": "Quadríceps / Glúteos",
        "notes": "3 séries de 8–12 repetições. Repetições por perna; use apoio para equilíbrio se necessário.",
        "restSeconds": 150,
        "sets": [
          {
            "id": "lb-2-s1",
            "setNumber": 1,
            "reps": 8,
            "completed": false
          },
          {
            "id": "lb-2-s2",
            "setNumber": 2,
            "reps": 8,
            "completed": false
          },
          {
            "id": "lb-2-s3",
            "setNumber": 3,
            "reps": 8,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Glúteos e Quadríceps (Unilateral)",
          "secondaryMuscles": [
            "Posteriores",
            "Adutores",
            "Core"
          ],
          "instructions": [
            "Fique a cerca de 2 a 3 passos à frente de um banco plano.",
            "Apoie o peito de um dos pés no banco atrás de você.",
            "Mantenha o tronco ereto ou com uma leve inclinação de 15° à frente.",
            "Desça flexionando o joelho da frente até a coxa ficar paralela ao chão.",
            "Empurre o chão com o calcanhar da perna da frente para subir."
          ],
          "tips": [
            "Se quiser focar mais no glúteo, incline o tronco um pouco mais para a frente.",
            "Se quiser focar mais no quadríceps, mantenha o tronco bem vertical."
          ],
          "mistakes": [
            "Deixar o joelho da frente entrar para dentro.",
            "Jogar o peso excessivamente no pé de trás (ele serve apenas para equilíbrio)."
          ],
          "videoQuery": "execucao correta agachamento bulgaro gluteo quadriceps"
        },
        "repRange": {
          "min": 8,
          "max": 12
        }
      },
      {
        "id": "lb-3",
        "name": "Cadeira Flexora",
        "muscleGroup": "Posterior de Coxa",
        "notes": "3 séries de 10–15 repetições. Alinhe os joelhos ao eixo da máquina.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "lb-3-s1",
            "setNumber": 1,
            "reps": 10,
            "completed": false
          },
          {
            "id": "lb-3-s2",
            "setNumber": 2,
            "reps": 10,
            "completed": false
          },
          {
            "id": "lb-3-s3",
            "setNumber": 3,
            "reps": 10,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Isquiotibiais (Posterior de Coxa)",
          "secondaryMuscles": [
            "Panturrilhas"
          ],
          "instructions": [
            "Sente-se com as costas apoiadas no encosto.",
            "Abaixe a almofada de retenção superior firmemente sobre as coxas.",
            "A almofada inferior deve ficar atrás dos tornozelos.",
            "Puxe os calcanhares para baixo e para trás flexionando os joelhos ao máximo.",
            "Retorne lentamente controlando a subida."
          ],
          "tips": [
            "Excelente para trabalhar o posterior em flexão de joelho com o quadril já flexionado."
          ],
          "mistakes": [
            "Não prender bem a almofada da coxa deixando as pernas soltas.",
            "Fazer repetições incompletas sem puxar até o final."
          ],
          "videoQuery": "execucao correta cadeira flexora posterior"
        },
        "repRange": {
          "min": 10,
          "max": 15
        }
      },
      {
        "id": "lb-4",
        "name": "Panturrilha Sentado (Máquina)",
        "muscleGroup": "Panturrilhas / Sóleo",
        "notes": "3 séries de 12–20 repetições. Amplitude confortável e movimento controlado.",
        "restSeconds": 90,
        "sets": [
          {
            "id": "lb-4-s1",
            "setNumber": 1,
            "reps": 12,
            "completed": false
          },
          {
            "id": "lb-4-s2",
            "setNumber": 2,
            "reps": 12,
            "completed": false
          },
          {
            "id": "lb-4-s3",
            "setNumber": 3,
            "reps": 12,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Sóleo (Músculo profundo da panturrilha)",
          "secondaryMuscles": [],
          "instructions": [
            "Sente-se na máquina com as pontas dos pés na plataforma.",
            "Ajuste o apoio estofado sobre a parte inferior das coxas, perto dos joelhos.",
            "Destrave a alavanca e desça os calcanhares sentindo o alongamento máximo.",
            "Segure 2 segundos no ponto mais baixo e empurre até a ponta dos pés no topo."
          ],
          "tips": [
            "Com os joelhos flexionados a 90°, o músculo Sóleo é o principal ativado, dando largura para a panturrilha."
          ],
          "mistakes": [
            "Quicar o peso rapidamente sem amplitude."
          ],
          "videoQuery": "execucao correta panturrilha sentada soleo"
        },
        "repRange": {
          "min": 12,
          "max": 20
        }
      },
      {
        "id": "lb-5",
        "name": "Abdominal na Máquina",
        "muscleGroup": "Abdômen / Core",
        "notes": "3 séries de 12–20 repetições. Flexione o tronco com controle, sem puxar o pescoço.",
        "restSeconds": 60,
        "sets": [
          {
            "id": "lb-5-s1",
            "setNumber": 1,
            "reps": 12,
            "completed": false
          },
          {
            "id": "lb-5-s2",
            "setNumber": 2,
            "reps": 12,
            "completed": false
          },
          {
            "id": "lb-5-s3",
            "setNumber": 3,
            "reps": 12,
            "completed": false
          }
        ],
        "guide": {
          "primaryMuscle": "Reto abdominal",
          "secondaryMuscles": [
            "Oblíquos"
          ],
          "instructions": [
            "Ajuste o banco e os apoios ao seu corpo.",
            "Expire ao aproximar as costelas do quadril, flexionando o tronco.",
            "Retorne de forma controlada, sem soltar a resistência."
          ],
          "tips": [
            "Mantenha o pescoço confortável e concentre o movimento no abdômen."
          ],
          "mistakes": [
            "Puxar com os braços ou dar impulso com o quadril."
          ],
          "videoQuery": "execucao abdominal maquina"
        },
        "repRange": {
          "min": 12,
          "max": 20
        }
      }
    ],
    "templateVersion": 4
  }
];

// Reconhece somente a estrutura original; rotinas personalizadas são preservadas.
const LEGACY_TEMPLATES = [
  {
    "id": "workout-upper-a",
    "names": [
      "Supino Reto (Barra ou Halteres)",
      "Remada Curvada com Barra",
      "Desenvolvimento com Halteres",
      "Puxada Alta (Costas)",
      "Tríceps no Pulley",
      "Rosca Direta"
    ]
  },

  // =========================================================================
  // TREINO B (Terça-feira): Inferiores Completo (Foco Quadríceps)
  // 5 min Mobilidade + 45 min Musculação + 10 min Caminhada leve
  // =========================================================================
  {
<<<<<<< HEAD
    id: 'workout-b-lower-quads',
    name: 'Treino B',
    category: 'Inferiores (Quadríceps)',
    description: 'Foco Quadríceps: 5 min mobilidade + 45 min musculação + 10 min bicicleta leve',
    exercises: [
      {
        id: 'tb-mob',
        name: 'Mobilidade Articular (Tornozelo & Quadril)',
        muscleGroup: 'Mobilidade / Aquecimento',
        notes: 'Mobilidade de tornozelo na parede (2x12 cada pé) + Agachamento profundo segurando no rack (2x30s). 5 min.',
        restSeconds: 30,
        sets: [
          { id: 'tb-mob-s1', setNumber: 1, weight: 0, reps: 12, completed: false, previousWeight: 0, previousReps: 12 },
          { id: 'tb-mob-s2', setNumber: 2, weight: 0, reps: 12, completed: false, previousWeight: 0, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Tornozelos e Articulação Coxofemoral',
          secondaryMuscles: ['Glúteos', 'Panturrilhas'],
          instructions: [
            'Fique em frente a uma parede com o pé a cerca de 10 cm. Empurre o joelho em direção à parede sem tirar o calcanhar do chão (12 reps cada pé).',
            'Depois, segure nas hastes de um rack/aparelho e desça em agachamento profundo, mantendo o peito alto e a coluna reta por 30 segundos.'
          ],
          tips: [
            'A dorsiflexão de tornozelo evita que seus calcanhares subam durante o Leg Press e o Agachamento.'
          ],
          mistakes: [
            'Tirar o calcanhar do chão na mobilidade de tornozelo.'
          ],
          videoQuery: 'mobilidade de tornozelo na parede agachamento'
        }
      },
      {
        id: 'tb-1',
        name: 'Leg Press 45°',
        muscleGroup: 'Quadríceps & Glúteos',
        notes: 'Pés largura dos ombros (15°-30° para fora). Joelhos acompanham os pés (sem valgo). Descer a 90° sem descolar a lombar e sem travar no topo, 10 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'tb-1-s1', setNumber: 1, weight: 120, reps: 10, completed: false, previousWeight: 120, previousReps: 10 },
          { id: 'tb-1-s2', setNumber: 2, weight: 130, reps: 10, completed: false, previousWeight: 130, previousReps: 10 },
          { id: 'tb-1-s3', setNumber: 3, weight: 140, reps: 10, completed: false, previousWeight: 140, previousReps: 10 },
          { id: 'tb-1-s4', setNumber: 4, weight: 140, reps: 10, completed: false, previousWeight: 140, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Quadríceps e Glúteos',
          secondaryMuscles: ['Isquiotibiais', 'Panturrilhas'],
          instructions: [
            'Sente-se com quadril e coluna lombar totalmente apoiados e travados no encosto.',
            'Pés na largura dos ombros, pontas dos pés levemente apontadas para fora (15° a 30°).',
            'Destrave a plataforma e desça de forma controlada até que a coxa forme cerca de 90° com a perna.',
            'Durante a descida, empurre ativamente os joelhos para fora na direção da ponta dos pés.',
            'Empurre a plataforma com o pé inteiro, parando logo antes de esticar totalmente os joelhos.'
          ],
          tips: [
            'Regra crítica: Nunca deixe os joelhos caírem para dentro (valgo dinâmico) ao empurrar a carga.',
            'Nunca trave os joelhos totalmente esticados ("bloqueio articular") no topo sob carga pesada.',
            'Se a lombar começar a descolar do assento, reduza um pouco a amplitude.'
          ],
          mistakes: [
            'Deixar a lombar descolar do banco no fundo (risco de hérnia de disco).',
            'Apoiar as mãos nos joelhos para empurrar.'
          ],
          videoQuery: 'execucao correta leg press 45 postura'
        }
      },
      {
        id: 'tb-2',
        name: 'Agachamento Goblet (com Halter no peito)',
        muscleGroup: 'Quadríceps & Glúteos',
        notes: 'Halter grudado no peito, cotovelos fechados, joelhos para fora na linha dos pés, peito erguido, 10 a 12 reps',
        restSeconds: 75,
        sets: [
          { id: 'tb-2-s1', setNumber: 1, weight: 16, reps: 10, completed: false, previousWeight: 16, previousReps: 10 },
          { id: 'tb-2-s2', setNumber: 2, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 },
          { id: 'tb-2-s3', setNumber: 3, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Quadríceps e Glúteo Máximo',
          secondaryMuscles: ['Core / Abdômen', 'Eretores da Espinha'],
          instructions: [
            'Segure um halter verticalmente com ambas as mãos apoiadas sob a cabeça superior do peso, encostado no peito.',
            'Pés na largura dos ombros, pontas viradas levemente para fora.',
            'Agache projetando o quadril para trás e para baixo, mantendo o peito alto e os cotovelos entre os joelhos no fundo.',
            'Desça até as coxas ficarem paralelas ao chão.',
            'Empurre o solo pela sola inteira do pé para retornar à posição inicial.'
          ],
          tips: [
            'O halter no peito força a postura ereta e fortalece o abdômen sem comprimir a coluna como a barra nas costas.',
            'Mantenha o peso distribuído nos calcanhares e meio do pé.'
          ],
          mistakes: [
            'Curvar o tronco para frente deixando o halter se afastar do peito.',
            'Subir os calcanhares do solo.'
          ],
          videoQuery: 'execucao correta agachamento goblet halter'
        }
      },
      {
        id: 'tb-3',
        name: 'Cadeira Extensora',
        muscleGroup: 'Quadríceps',
        notes: 'Encosto ajustado, extensão máxima segurando 1s no pico, descida lenta em 2s a 3s, 12 a 15 reps',
        restSeconds: 60,
        sets: [
          { id: 'tb-3-s1', setNumber: 1, weight: 45, reps: 12, completed: false, previousWeight: 45, previousReps: 12 },
          { id: 'tb-3-s2', setNumber: 2, weight: 50, reps: 12, completed: false, previousWeight: 50, previousReps: 12 },
          { id: 'tb-3-s3', setNumber: 3, weight: 50, reps: 12, completed: false, previousWeight: 50, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Quadríceps (Foco no Reto Femoral)',
          secondaryMuscles: [],
          instructions: [
            'Alinhe o joelho exatamente com o eixo de rotação circular da máquina.',
            'A almofada deve ficar confortavelmente ajustada sobre a canela inferior.',
            'Segure firme nas alças do banco para manter a bacia presa ao assento.',
            'Estenda os joelhos até alinhar as pernas, pausando por 1 segundo no topo com máxima contração.',
            'Desça a carga controlando lentamente sem deixar os pesos baterem.'
          ],
          tips: [
            'Excelente exercício para queimar calorias e fortalecer o tendão patelar sem carga axial na coluna.'
          ],
          mistakes: [
            'Usar embalo ou chutar a perna para cima.',
            'Tirar o quadril do assento durante a subida.'
          ],
          videoQuery: 'execucao correta cadeira extensora postura'
        }
      },
      {
        id: 'tb-4',
        name: 'Mesa Flexora (ou Cadeira Flexora)',
        muscleGroup: 'Posterior de Coxa',
        notes: 'Quadril colado no apoio, controle excêntrico na descida, 12 a 15 reps',
        restSeconds: 60,
        sets: [
          { id: 'tb-4-s1', setNumber: 1, weight: 35, reps: 12, completed: false, previousWeight: 35, previousReps: 12 },
          { id: 'tb-4-s2', setNumber: 2, weight: 35, reps: 12, completed: false, previousWeight: 35, previousReps: 12 },
          { id: 'tb-4-s3', setNumber: 3, weight: 40, reps: 12, completed: false, previousWeight: 40, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Isquiotibiais (Posterior de Coxa)',
          secondaryMuscles: ['Gastrocnêmio'],
          instructions: [
            'Deite de bruços (ou sente-se caso faça na Cadeira Flexora) com a almofada de rolo ajustada logo abaixo das panturrilhas.',
            'Segure firme nos pegadores para manter o quadril 100% colado ao banco.',
            'Puxe os calcanhares em direção aos glúteos de forma potente.',
            'Segure a contração por 1 segundo e retorne alongando a musculatura devagar.'
          ],
          tips: [
            'Equilibrar a força de quadríceps com posterior de coxa é a regra de ouro para não ter dor no joelho ao correr.'
          ],
          mistakes: [
            'Empurrar o quadril para cima tirando a pelve do banco.',
            'Soltar o peso de forma descontrolada na volta.'
          ],
          videoQuery: 'execucao correta mesa flexora posterior coxa'
        }
      },
      {
        id: 'tb-5',
        name: 'Panturrilha no Leg Press (ou Sentado)',
        muscleGroup: 'Panturrilhas',
        notes: 'Ponta dos pés na borda da plataforma, amplitude completa com descida alongando e subida máxima (1s no topo), 15 reps',
        restSeconds: 45,
        sets: [
          { id: 'tb-5-s1', setNumber: 1, weight: 80, reps: 15, completed: false, previousWeight: 80, previousReps: 15 },
          { id: 'tb-5-s2', setNumber: 2, weight: 90, reps: 15, completed: false, previousWeight: 90, previousReps: 15 },
          { id: 'tb-5-s3', setNumber: 3, weight: 90, reps: 15, completed: false, previousWeight: 90, previousReps: 15 },
          { id: 'tb-5-s4', setNumber: 4, weight: 90, reps: 15, completed: false, previousWeight: 90, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Gastrocnêmio e Sóleo',
          secondaryMuscles: [],
          instructions: [
            'Apoie apenas a ponta dos pés na borda inferior da plataforma do Leg Press.',
            'Destrave a segurança mantendo os joelhos destravados com uma micro-flexão.',
            'Deixe os calcanhares descerem ao máximo sentindo um alongamento profundo na panturrilha.',
            'Empurre a plataforma ficando na ponta dos pés ao máximo e segure por 1 segundo.'
          ],
          tips: [
            'Panturrilha forte amortece o impacto de cada passada na esteira e corrida.'
          ],
          mistakes: [
            'Fazer repetições curtas e rápidas aproveitando a elasticidade do tendão.',
            'Flexionar e estender os joelhos para ajudar.'
          ],
          videoQuery: 'execucao correta panturrilha leg press 45'
        }
      },
      {
        id: 'tb-6',
        name: 'Prancha Abdominal Isométrica',
        muscleGroup: 'Abdômen / Core',
        notes: 'Cotovelos alinhados sob os ombros, abdômen e glúteos contraídos, coluna neutra por 30s a 45s',
        restSeconds: 45,
        sets: [
          { id: 'tb-6-s1', setNumber: 1, weight: 0, reps: 35, completed: false, previousWeight: 0, previousReps: 35 },
          { id: 'tb-6-s2', setNumber: 2, weight: 0, reps: 40, completed: false, previousWeight: 0, previousReps: 40 },
          { id: 'tb-6-s3', setNumber: 3, weight: 0, reps: 45, completed: false, previousWeight: 0, previousReps: 45 }
        ],
        guide: {
          primaryMuscle: 'Transverso do Abdômen e Reto Abdominal',
          secondaryMuscles: ['Glúteos', 'Eretores da Espinha'],
          instructions: [
            'Apoie os antebraços e as pontas dos pés no chão.',
            'Mantenha o corpo formando uma linha reta da cabeça aos calcanhares.',
            'Contraia fortemente o abdômen como se fosse levar um soco, e aperte os glúteos.',
            'Respire devagar e segure a posição sem deixar a cintura afundar.'
          ],
          tips: [
            'O tempo registrado nas repetições corresponde aos segundos em isometria (ex: 35s, 40s, 45s).'
          ],
          mistakes: [
            'Deixar a lombar desabar arqueada em direção ao chão.',
            'Elevar o quadril muito alto formando um triângulo.'
          ],
          videoQuery: 'execucao correta prancha abdominal isometrica'
        }
      },
      {
        id: 'tb-cardio',
        name: 'Cardio Final: Bicicleta Ergométrica',
        muscleGroup: 'Cardio / Recuperação',
        notes: 'Ritmo moderado constante por 10 minutos para soltar a musculatura das pernas e acelerar a circulação.',
        restSeconds: 60,
        sets: [
          { id: 'tb-cardio-s1', setNumber: 1, weight: 0, reps: 10, completed: false, previousWeight: 0, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Sistema Cardiovascular',
          secondaryMuscles: ['Quadríceps'],
          instructions: [
            'Ajuste o banco da bike na altura do quadril (ao pedalar, o joelho não deve esticar totalmente nem ficar excessivamente dobrado).',
            'Pedale com cadência constante de 70 a 85 RPM por 10 minutos.',
            'Mantenha o tronco relaxado sem sobrecarregar os punhos no guidão.'
          ],
          tips: [
            'A bicicleta ajuda na remoção de metabólitos após o treino de perna sem gerar impacto.'
          ],
          mistakes: [
            'Colocar carga pesada demais travando a pedalada.'
          ],
          videoQuery: 'como ajustar altura do banco bicicleta ergometrica'
        }
      }
=======
    "id": "workout-lower-a",
    "names": [
      "Agachamento Livre ou no Hack",
      "Leg Press 45º",
      "Cadeira Extensora",
      "Mesa Flexora (Posterior de coxa)",
      "Panturrilha em Pé"
>>>>>>> 1695103b45c374fcd4e61e586eb015f088b83e2a
    ]
  },

  // =========================================================================
  // TREINO C (Quarta-feira): Condicionamento (Corrida + Core + Mobilidade)
  // 10 min Mobilidade + 15 min Core + 35 min Treino de Corrida/Caminhada
  // =========================================================================
  {
<<<<<<< HEAD
    id: 'workout-c-conditioning-core',
    name: 'Treino C',
    category: 'Corrida, Core & Mobilidade',
    description: 'Condicionamento: 10 min mobilidade + 15 min core estabilizador + 35 min corrida intervalada',
    exercises: [
      {
        id: 'tc-mob',
        name: 'Bloco 1 — Mobilidade Dinâmica de Quadril & Coluna',
        muscleGroup: 'Mobilidade / Flexibilidade',
        notes: 'Afundo de flexores de quadril no chão (2x12/perna) + Perdigueiro 4 apoios (2x10/lado) + Gato-Vaca (2x12). 10 min.',
        restSeconds: 30,
        sets: [
          { id: 'tc-mob-s1', setNumber: 1, weight: 0, reps: 12, completed: false, previousWeight: 0, previousReps: 12 },
          { id: 'tc-mob-s2', setNumber: 2, weight: 0, reps: 12, completed: false, previousWeight: 0, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Flexores de Quadril e Coluna Vertebral',
          secondaryMuscles: ['Glúteos', 'Core'],
          instructions: [
            'Afundo no chão: com um joelho no chão e outro pé à frente, projete o quadril para frente sentindo alongar a virilha/coxa (12 reps por lado).',
            'Perdigueiro: em 4 apoios, estenda o braço direito à frente e a perna esquerda atrás, alinhados com o tronco. Segure 1s e alterne (10 reps por lado).',
            'Gato-Vaca: em 4 apoios, curve a coluna para cima soltando o ar e depois inverta olhando para frente (12 reps).'
          ],
          tips: [
            'Destrava a bacia e a coluna lombar, preparando o corpo para o impacto da corrida com mais de 100 kg.'
          ],
          mistakes: [
            'Girar o quadril de lado no perdigueiro.',
            'Fazer os movimentos com pressa.'
          ],
          videoQuery: 'alongamento dinamico flexores de quadril perdigueiro'
        }
      },
      {
        id: 'tc-core1',
        name: 'Abdominal Infra no Solo (Elevação com Joelhos Semiflexionados)',
        muscleGroup: 'Abdômen Infra / Core',
        notes: 'Lombar colada no chão, joelhos semiflexionados, suba controlando o quadril sem dar tranco, 12 a 15 reps',
        restSeconds: 45,
        sets: [
          { id: 'tc-core1-s1', setNumber: 1, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
          { id: 'tc-core1-s2', setNumber: 2, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
          { id: 'tc-core1-s3', setNumber: 3, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Porção Inferior do Reto Abdominal',
          secondaryMuscles: ['Oblíquos', 'Flexores de Quadril'],
          instructions: [
            'Deite de costas no solo com as mãos ao lado do corpo ou sob a parte superior dos glúteos.',
            'Flexione levemente os joelhos e cravou a coluna lombar contra o chão.',
            'Eleve as pernas em direção ao teto, tirando levemente o quadril do solo no final.',
            'Desça as pernas de forma lenta e controlada, parando antes que a lombar descole do solo.'
          ],
          tips: [
            'Se a lombar arquear, não desça os pés tão perto do chão.'
          ],
          mistakes: [
            'Balançar as pernas usando o embalo.',
            'Arquear a coluna lombar na descida.'
          ],
          videoQuery: 'execucao correta abdominal infra solo elevação de pernas'
        }
      },
      {
        id: 'tc-core2',
        name: 'Prancha Lateral (Core & Estabilizadores)',
        muscleGroup: 'Oblíquos / Core',
        notes: 'Cotovelo sob o ombro, quadril elevado formando uma linha reta, 25s a 30s de cada lado',
        restSeconds: 45,
        sets: [
          { id: 'tc-core2-s1', setNumber: 1, weight: 0, reps: 30, completed: false, previousWeight: 0, previousReps: 30 },
          { id: 'tc-core2-s2', setNumber: 2, weight: 0, reps: 30, completed: false, previousWeight: 0, previousReps: 30 },
          { id: 'tc-core2-s3', setNumber: 3, weight: 0, reps: 30, completed: false, previousWeight: 0, previousReps: 30 }
        ],
        guide: {
          primaryMuscle: 'Oblíquos Interno e Externo e Quadrado Lombar',
          secondaryMuscles: ['Glúteo Médio', 'Deltóide'],
          instructions: [
            'Deite de lado e apoie o antebraço no chão, alinhando o cotovelo diretamente sob o ombro.',
            'Estenda as pernas sobrepostas ou com um pé à frente do outro para maior equilíbrio.',
            'Eleve o quadril até o tronco e as pernas formarem uma linha reta contínua.',
            'Segure firme por 25 a 30 segundos, depois inverta o lado.'
          ],
          tips: [
            'A prancha lateral fortalece o glúteo médio e os estabilizadores que impedem a bacia de oscilar na corrida.'
          ],
          mistakes: [
            'Deixar o quadril cair em direção ao chão.',
            'Rodar o peito para baixo.'
          ],
          videoQuery: 'execucao correta prancha lateral postura'
        }
      },
      {
        id: 'tc-core3',
        name: 'Abdominal Supra na Polia Alta (ou Crunch no Solo)',
        muscleGroup: 'Abdômen Supra',
        notes: 'Ajoelhado com corda na nuca, flexione o tronco enrolando o abdômen sem mexer o quadril, 15 reps',
        restSeconds: 45,
        sets: [
          { id: 'tc-core3-s1', setNumber: 1, weight: 25, reps: 15, completed: false, previousWeight: 25, previousReps: 15 },
          { id: 'tc-core3-s2', setNumber: 2, weight: 25, reps: 15, completed: false, previousWeight: 25, previousReps: 15 },
          { id: 'tc-core3-s3', setNumber: 3, weight: 30, reps: 15, completed: false, previousWeight: 30, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Reto Abdominal (Porção Superior)',
          secondaryMuscles: ['Oblíquos'],
          instructions: [
            'Ajoelhe-se em frente à polia alta e segure as pontas da corda posicionadas ao lado da cabeça/nuca.',
            'Mantenha os quadris travados em um ângulo fixo de cerca de 90°.',
            'Enrole a coluna para baixo, aproximando as costelas da bacia, contraindo fortemente o abdômen.',
            'Retorne controladamente sentindo o alongamento da musculatura abdominal.'
          ],
          tips: [
            'O movimento é de flexão da coluna, não de sentar nos calcanhares com o quadril.'
          ],
          mistakes: [
            'Mover o quadril para frente e para trás fingindo que está fazendo o abdominal.',
            'Puxar a corda com os braços em vez de enrolar o abdômen.'
          ],
          videoQuery: 'execucao correta abdominal na polia alta com corda'
        }
      },
      {
        id: 'tc-run',
        name: 'Treino Intervalado de Corrida/Caminhada (35 min)',
        muscleGroup: 'Cardio / Corrida & Resistência',
        notes: '5 min aquec. (5.5 km/h) + 25 min intervalado (trote x caminhada rápida) + 5 min volta à calma. Veja progressão de 12 semanas no guia!',
        restSeconds: 60,
        sets: [
          { id: 'tc-run-s1', setNumber: 1, weight: 0, reps: 35, completed: false, previousWeight: 0, previousReps: 35 }
        ],
        guide: {
          primaryMuscle: 'Sistema Cardiorrespiratório e Resistência Aeróbica',
          secondaryMuscles: ['Pernas Inteiras', 'Core'],
          instructions: [
            'Aquecimento (0 a 5 min): Caminhada firme a 5.5 km/h para aquecer os tendões e elevar a frequência cardíaca.',
            'Bloco Principal (5 a 30 min): Intervalos conforme sua semana de treino:',
            '• Semanas 1 a 3: 1 min de trote leve (7.5 a 8.5 km/h) intercalado com 2 min de caminhada rápida (5.5 a 6.0 km/h).',
            '• Semanas 4 a 6: 2 min de trote para 1 min de caminhada rápida.',
            '• Semanas 7 a 10: 3 a 4 min de corrida contínua para 1 min de caminhada.',
            '• Semanas 11 e 12: 25 min de corrida contínua em ritmo confortável (Zona 2/3).',
            'Volta à calma (30 a 35 min): Caminhada leve a 5.0 km/h para normalizar os batimentos.'
          ],
          tips: [
            'Pisar suavemente sem bater os calcanhares com força no chão (passada elástica e cadenciada).',
            'Não tente correr acima de 9.0 km/h nas primeiras semanas com 111 kg: o objetivo agora é resistência e queima de gordura sem canelite.'
          ],
          mistakes: [
            'Começar em sprint veloz e ficar sem fôlego em 2 minutos.',
            'Pular o aquecimento de 5 minutos.'
          ],
          videoQuery: 'como comecar a correr acima de 100 kg sem lesao'
        }
      }
    ]
  },

  // =========================================================================
  // TREINO D (Quinta-feira): Superiores Completo (Foco Puxar)
  // 5 min Mobilidade + 40 min Musculação + 15 min Cardio sem impacto
  // =========================================================================
  {
    id: 'workout-d-upper-pull',
    name: 'Treino D',
    category: 'Superiores (Puxar)',
    description: 'Foco Puxar: 5 min mobilidade + 40 min musculação + 15 min cardio elíptico/bike',
    exercises: [
      {
        id: 'td-mob',
        name: 'Mobilidade Articular (Ombros & Manguito)',
        muscleGroup: 'Mobilidade / Aquecimento',
        notes: 'Dislocamento de ombros com elástico/bastão (2x15) + Rotação externa de ombro na polia com carga mínima (2x12). 5 min.',
        restSeconds: 30,
        sets: [
          { id: 'td-mob-s1', setNumber: 1, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
          { id: 'td-mob-s2', setNumber: 2, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Manguito Rotador (Infraespinhal e Redondo Menor)',
          secondaryMuscles: ['Deltóides'],
          instructions: [
            'Passe o bastão ou elástico estendido da frente do corpo até trás das costas sem flexionar os cotovelos (15 reps).',
            'Na polia na altura do cotovelo, com carga leve (2,5kg a 5kg), mantenha o cotovelo colado ao corpo e gire a mão para fora em rotação externa (12 reps cada braço).'
          ],
          tips: [
            'O manguito rotador estabiliza a cabeça do úmero durante remadas pesadas e supino inclinado.'
          ],
          mistakes: [
            'Usar peso pesado na rotação de ombro; o foco é ativação e saúde articular.'
          ],
          videoQuery: 'rotacao externa ombro polia manguito rotador'
        }
      },
      {
        id: 'td-1',
        name: 'Remada Curvada na Máquina (Apoio no Peito)',
        muscleGroup: 'Costas / Dorsais',
        notes: 'Apoio no peito, abaixe os ombros antes de puxar, direcione os cotovelos para o quadril apertando as escápulas, 10 a 12 reps',
        restSeconds: 75,
        sets: [
          { id: 'td-1-s1', setNumber: 1, weight: 40, reps: 10, completed: false, previousWeight: 40, previousReps: 10 },
          { id: 'td-1-s2', setNumber: 2, weight: 40, reps: 10, completed: false, previousWeight: 40, previousReps: 10 },
          { id: 'td-1-s3', setNumber: 3, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'td-1-s4', setNumber: 4, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Dorsais, Trapézio Médio e Rombóides',
          secondaryMuscles: ['Bíceps', 'Deltóide Posterior'],
          instructions: [
            'Ajuste a altura do banco para que o apoio fique na parte média do esterno.',
            'Segure as manoplas com pegada neutra ou pronada.',
            'Abaixe as escápulas afastando os ombros das orelhas.',
            'Puxe com a força dos cotovelos em direção ao quadril, esmagando a musculatura dorsal atrás por 1 segundo.',
            'Retorne controladamente estendendo os braços e permitindo que as escápulas abram.'
          ],
          tips: [
            'O apoio no peito protege sua coluna lombar, permitindo focar 100% nas costas sem risco de sobrecarga na coluna.'
          ],
          mistakes: [
            'Tirar o peito do apoio para puxar com o peso do corpo.',
            'Puxar com o bíceps fechando o cotovelo antes de mover o ombro.'
          ],
          videoQuery: 'execucao correta remada articulada apoio no peito maquina'
        }
      },
      {
        id: 'td-2',
        name: 'Supino Inclinado com Halteres (ou Máquina)',
        muscleGroup: 'Peitoral Superior',
        notes: 'Banco inclinado a 30°-45°, cotovelos fechados a 45°-60° (formato de seta), descida controlada no peito superior, 10 a 12 reps',
        restSeconds: 75,
        sets: [
          { id: 'td-2-s1', setNumber: 1, weight: 16, reps: 10, completed: false, previousWeight: 16, previousReps: 10 },
          { id: 'td-2-s2', setNumber: 2, weight: 16, reps: 10, completed: false, previousWeight: 16, previousReps: 10 },
          { id: 'td-2-s3', setNumber: 3, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 },
          { id: 'td-2-s4', setNumber: 4, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Peitoral Maior (Porção Clavicular Superior)',
          secondaryMuscles: ['Deltóide Anterior', 'Tríceps'],
          instructions: [
            'Ajuste o banco em uma inclinação suave de 30° a 45° (não mais que isso para não sobrecarregar demais os ombros).',
            'Suba os halteres com as escápulas travadas contra o encosto.',
            'Desça os halteres com os cotovelos posicionados em seta (cerca de 45° a 60° em relação ao tronco).',
            'Toque suavemente na linha alta do peito e empurre para cima convergindo levemente os pesos sem encostá-los.'
          ],
          tips: [
            'Trabalhar a porção clavicular dá o aspecto de peitoral cheio e erguido.'
          ],
          mistakes: [
            'Inclinar o banco a 60° (vira quase um desenvolvimento de ombros).',
            'Abrir os cotovelos em 90° gerando atrito no ombro.'
          ],
          videoQuery: 'execucao correta supino inclinado com halteres'
        }
      },
      {
        id: 'td-3',
        name: 'Puxada Alta no Triângulo (Pegada Fechada)',
        muscleGroup: 'Costas / Dorsais & Espessura',
        notes: 'Leve inclinação para trás (10°), puxe o triângulo até a clavícula/alto do peito apertando as costas, 12 reps',
        restSeconds: 60,
        sets: [
          { id: 'td-3-s1', setNumber: 1, weight: 45, reps: 12, completed: false, previousWeight: 45, previousReps: 12 },
          { id: 'td-3-s2', setNumber: 2, weight: 45, reps: 12, completed: false, previousWeight: 45, previousReps: 12 },
          { id: 'td-3-s3', setNumber: 3, weight: 50, reps: 12, completed: false, previousWeight: 50, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Grande Dorsal e Redondo Maior',
          secondaryMuscles: ['Bíceps', 'Braquial'],
          instructions: [
            'Coloque o triângulo na polia alta da puxada.',
            'Trave as pernas sob os apoios e incline o tronco cerca de 10° a 15° para trás.',
            'Abaixe as escápulas e puxe o triângulo em direção ao peitoral superior.',
            'Aperte as costas no final e retorne alongando totalmente as dorsais até o topo.'
          ],
          tips: [
            'A pegada neutra com triângulo permite maior amplitude e conforto para os punhos e cotovelos.'
          ],
          mistakes: [
            'Jogar o tronco muito para trás quase virando uma remada deitada.',
            'Soltar o peso de forma brusca no retorno.'
          ],
          videoQuery: 'execucao correta puxada alta triangulo pulley'
        }
      },
      {
        id: 'td-4',
        name: 'Elevação Lateral com Halteres',
        muscleGroup: 'Ombros / Deltoide Lateral',
        notes: 'Tronco levemente inclinado, cotovelos semiflexionados, suba na linha dos ombros sem balanço, 12 a 15 reps',
        restSeconds: 60,
        sets: [
          { id: 'td-4-s1', setNumber: 1, weight: 8, reps: 12, completed: false, previousWeight: 8, previousReps: 12 },
          { id: 'td-4-s2', setNumber: 2, weight: 8, reps: 12, completed: false, previousWeight: 8, previousReps: 12 },
          { id: 'td-4-s3', setNumber: 3, weight: 10, reps: 12, completed: false, previousWeight: 10, previousReps: 12 },
          { id: 'td-4-s4', setNumber: 4, weight: 10, reps: 12, completed: false, previousWeight: 10, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Deltóide Lateral',
          secondaryMuscles: ['Trapézio Superior'],
          instructions: [
            'Fique em pé com os pés na largura do quadril e incline o tronco 5° para a frente.',
            'Segure os halteres ao lado das coxas com os cotovelos levemente destravados.',
            'Eleve os braços lateralmente até a linha dos ombros, como se estivesse despejando água de uma jarra.',
            'Desça controlando a carga em 2 segundos sem encostar os halteres no corpo.'
          ],
          tips: [
            'O deltoide lateral é o músculo que cria a silhueta em "V", fazendo a cintura parecer visualmente menor.'
          ],
          mistakes: [
            'Jogar o tronco para trás e usar impulso das pernas.',
            'Subir as mãos mais alto do que os cotovelos.'
          ],
          videoQuery: 'execucao correta elevacao lateral ombros halteres'
        }
      },
      {
        id: 'td-5',
        name: 'Crucifixo Inverso na Máquina (Peck Deck Invertido)',
        muscleGroup: 'Ombros / Deltoide Posterior',
        notes: 'Peito firme no encosto, abra os braços no plano dos ombros focando na parte de trás dos ombros, 12 a 15 reps',
        restSeconds: 60,
        sets: [
          { id: 'td-5-s1', setNumber: 1, weight: 30, reps: 12, completed: false, previousWeight: 30, previousReps: 12 },
          { id: 'td-5-s2', setNumber: 2, weight: 30, reps: 12, completed: false, previousWeight: 30, previousReps: 12 },
          { id: 'td-5-s3', setNumber: 3, weight: 35, reps: 12, completed: false, previousWeight: 35, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Deltóide Posterior',
          secondaryMuscles: ['Rombóides', 'Trapézio'],
          instructions: [
            'Sente-se de frente para o aparelho com o peito apoiado no encosto.',
            'Ajuste o banco para que as manoplas fiquem alinhadas com a altura dos seus ombros.',
            'Com os cotovelos levemente flexionados, empurre as manoplas para trás abrindo os braços.',
            'Aperte a parte de trás do ombro por 1 segundo e retorne lentamente.'
          ],
          tips: [
            'Fortalecer o posterior de ombro puxa seus ombros para trás, corrigindo a postura curvada típica de quem trabalha sentado.'
          ],
          mistakes: [
            'Encolher os ombros ativando em excesso o trapézio superior.',
            'Fazer o movimento rápido sem segurar a contração.'
          ],
          videoQuery: 'execucao correta crucifixo inverso peck deck maquina'
        }
      },
      {
        id: 'td-6',
        name: 'Super-série: Rosca Martelo + Tríceps Barra Reta',
        muscleGroup: 'Braquial / Bíceps & Tríceps',
        notes: 'Faça 12 reps de Rosca Martelo com halteres e imediatamente sem descanso 12 reps de Tríceps Barra na polia. Descanse 60s.',
        restSeconds: 60,
        sets: [
          { id: 'td-6-s1', setNumber: 1, weight: 12, reps: 12, completed: false, previousWeight: 12, previousReps: 12 },
          { id: 'td-6-s2', setNumber: 2, weight: 12, reps: 12, completed: false, previousWeight: 12, previousReps: 12 },
          { id: 'td-6-s3', setNumber: 3, weight: 14, reps: 12, completed: false, previousWeight: 14, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Braquial, Bíceps e Tríceps',
          secondaryMuscles: ['Antebraços'],
          instructions: [
            'Parte 1 (Rosca Martelo): Em pé com halteres, palmas voltadas uma para a outra (pegada neutra). Suba controladamente 12 repetições.',
            'Parte 2 (Tríceps Barra Reta): Imediatamente vá para a polia alta, trave os cotovelos ao lado do tronco e estenda os braços para baixo até o final por 12 repetições.',
            'Descanse 60 segundos somente após terminar os dois exercícios.'
          ],
          tips: [
            'A super-série economiza tempo na sessão e gera grande volume de sangue nos braços elevando o gasto calórico.'
          ],
          mistakes: [
            'Descansar entre o primeiro e o segundo exercício.',
            'Balançar o corpo nos exercícios de braço.'
          ],
          videoQuery: 'super serie rosca martelo triceps pulley'
        }
      },
      {
        id: 'td-cardio',
        name: 'Cardio Final: Elíptico (Transport) ou Bicicleta',
        muscleGroup: 'Cardio / Queima de Gordura',
        notes: 'Ritmo moderado constante por 15 minutos sem impacto nas articulações.',
        restSeconds: 60,
        sets: [
          { id: 'td-cardio-s1', setNumber: 1, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Sistema Cardiorrespiratório',
          secondaryMuscles: ['Glúteos', 'Pernas'],
          instructions: [
            'Suba no aparelho elíptico mantendo a sola do pé totalmente apoiada nas sapatas.',
            'Mantenha cadência contínua e moderada sem interrupções por 15 minutos.',
            'Segure nas alças móveis para recrutar também a parte superior do corpo no gasto calórico.'
          ],
          tips: [
            'O elíptico tem impacto zero nos meniscos e coluna, ideal para acelerar o déficit calórico de quinta-feira.'
          ],
          mistakes: [
            'Pedalar na ponta dos pés gerando desconforto nos dedos.'
          ],
          videoQuery: 'como treinar no eliptico postura correta'
        }
      }
=======
    "id": "workout-upper-b",
    "names": [
      "Supino Inclinado com Halteres",
      "Remada Serrote (Unilateral Halter)",
      "Elevação Lateral com Halteres",
      "Barra Fixa ou Puxador c/ Triângulo",
      "Tríceps Testa ou Corda",
      "Rosca Martelo"
>>>>>>> 1695103b45c374fcd4e61e586eb015f088b83e2a
    ]
  },

  // =========================================================================
  // TREINO E (Sexta-feira): Inferiores Completo (Foco Posterior & Glúteos)
  // 5 min Mobilidade + 45 min Musculação + 10 min Cardio sem impacto
  // =========================================================================
  {
<<<<<<< HEAD
    id: 'workout-e-lower-posterior',
    name: 'Treino E',
    category: 'Inferiores (Posterior & Glúteos)',
    description: 'Foco Posterior & Glúteos: 5 min mobilidade + 45 min musculação + 10 min esteira inclinada/bike',
    exercises: [
      {
        id: 'te-mob',
        name: 'Mobilidade Articular (Posterior & Glúteos)',
        muscleGroup: 'Mobilidade / Aquecimento',
        notes: 'Alongamento dinâmico de posterior de coxa (2x12) + Ponte de glúteo no solo sem peso (2x15 segurando 2s no topo). 5 min.',
        restSeconds: 30,
        sets: [
          { id: 'te-mob-s1', setNumber: 1, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
          { id: 'te-mob-s2', setNumber: 2, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Glúteo Máximo e Isquiotibiais',
          secondaryMuscles: ['Lombar'],
          instructions: [
            'Em pé, balance a perna estendida para frente e para trás de forma controlada para soltar o posterior (12 reps por perna).',
            'Deite de costas no solo, dobre os joelhos e eleve a bacia contraindo o glúteo no topo por 2 segundos antes de descer (15 reps).'
          ],
          tips: [
            'A ponte de glúteo ativa a musculatura que vai proteger sua lombar durante o Stiff pesado.'
          ],
          mistakes: [
            'Hiperestender a lombar no topo da ponte de glúteo.'
          ],
          videoQuery: 'ponte de gluteo ativacao solo e mobilidade posterior'
        }
      },
      {
        id: 'te-1',
        name: 'Stiff com Halteres (ou Barra)',
        muscleGroup: 'Posterior de Coxa & Glúteos',
        notes: 'Dobradiça de quadril: imagine encostar a bunda na parede atrás. Joelhos levemente destravados, costas retas, descer rente à canela, 10 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'te-1-s1', setNumber: 1, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
          { id: 'te-1-s2', setNumber: 2, weight: 22, reps: 10, completed: false, previousWeight: 22, previousReps: 10 },
          { id: 'te-1-s3', setNumber: 3, weight: 24, reps: 10, completed: false, previousWeight: 24, previousReps: 10 },
          { id: 'te-1-s4', setNumber: 4, weight: 24, reps: 10, completed: false, previousWeight: 24, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Isquiotibiais (Posterior de Coxa) e Glúteos',
          secondaryMuscles: ['Eretores da Espinha / Lombar'],
          instructions: [
            'Fique em pé com pés na largura do quadril segurando os halteres à frente das coxas.',
            'Destrave levemente os joelhos em um ângulo fixo e mantenha-os assim durante todo o movimento.',
            'Inicie o movimento jogando o quadril para trás (dobradiça de quadril), mantendo peito aberto e costas 100% retas.',
            'Desça os halteres rente às canelas até sentir um forte alongamento no posterior da coxa (geralmente meia canela).',
            'Suba empurrando o quadril para frente e contraindo fortemente os glúteos no topo.'
          ],
          tips: [
            'Regra anatômica de ouro: O movimento é uma dobradiça de quadril, nunca de coluna. Imagine que quer tocar os glúteos na parede atrás de você.',
            'Não tente descer até o chão curvando as costas; a amplitude máxima é até onde suas costas ficarem retas.'
          ],
          mistakes: [
            'Arredondar a coluna lombar (curvar as costas).',
            'Dobrar os joelhos como se fosse um agachamento comum.',
            'Afastar os halteres das canelas.'
          ],
          videoQuery: 'execucao correta stiff halteres posterior coxa'
        }
      },
      {
        id: 'te-2',
        name: 'Cadeira Flexora (ou Mesa Flexora)',
        muscleGroup: 'Posterior de Coxa',
        notes: 'Encosto travado firme sobre as coxas, flexão potente e retorno lento em 3 segundos, 12 reps',
        restSeconds: 60,
        sets: [
          { id: 'te-2-s1', setNumber: 1, weight: 40, reps: 12, completed: false, previousWeight: 40, previousReps: 12 },
          { id: 'te-2-s2', setNumber: 2, weight: 45, reps: 12, completed: false, previousWeight: 45, previousReps: 12 },
          { id: 'te-2-s3', setNumber: 3, weight: 45, reps: 12, completed: false, previousWeight: 45, previousReps: 12 },
          { id: 'te-2-s4', setNumber: 4, weight: 50, reps: 12, completed: false, previousWeight: 50, previousReps: 12 }
        ],
        guide: {
          primaryMuscle: 'Isquiotibiais',
          secondaryMuscles: ['Panturrilhas'],
          instructions: [
            'Sente-se com as costas apoiadas e trave a almofada de fixação bem firme em cima das coxas.',
            'O rolo inferior deve ficar apoiado logo acima dos calcanhares.',
            'Puxe os pés para baixo e para trás flexionando os joelhos ao máximo.',
            'Segure 1 segundo na contração máxima e retorne controlando a descida dos pesos em 3 segundos.'
          ],
          tips: [
            'Manter a almofada superior bem travada impede a bacia de subir e isola o posterior de forma cirúrgica.'
          ],
          mistakes: [
            'Deixar o rolo bater nos pesos ao estender.',
            'Tirar as costas do encosto.'
          ],
          videoQuery: 'execucao correta cadeira flexora postura'
        }
      },
      {
        id: 'te-3',
        name: 'Elevação Pélvica na Máquina (ou com Barra)',
        muscleGroup: 'Glúteos & Isquiotibiais',
        notes: 'Pés firmes no chão, suba estendendo o quadril e esprema o glúteo no topo por 1s a 2s, 10 a 12 reps',
        restSeconds: 75,
        sets: [
          { id: 'te-3-s1', setNumber: 1, weight: 50, reps: 10, completed: false, previousWeight: 50, previousReps: 10 },
          { id: 'te-3-s2', setNumber: 2, weight: 60, reps: 10, completed: false, previousWeight: 60, previousReps: 10 },
          { id: 'te-3-s3', setNumber: 3, weight: 60, reps: 10, completed: false, previousWeight: 60, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Glúteo Máximo',
          secondaryMuscles: ['Isquiotibiais', 'Core'],
          instructions: [
            'Apoie a cintura sob o cinto/almofada da máquina (ou apoie a parte superior das costas em um banco com a barra na pelve).',
            'Pés firmes no chão na largura dos ombros.',
            'Empurre o solo com os calcanhares e erga o quadril até formar uma ponte alinhada.',
            'Aperte os glúteos no topo com intensidade máxima por 1 a 2 segundos antes de descer.'
          ],
          tips: [
            'Glúteo forte é o motor principal que impulsiona o corpo na corrida e protege o joelho de dor patelofemoral.'
          ],
          mistakes: [
            'Hiperestender a coluna lombar em vez de mover o quadril.',
            'Tirar os calcanhares do solo.'
          ],
          videoQuery: 'execucao correta elevacao pelvica maquina gluteos'
        }
      },
      {
        id: 'te-4',
        name: 'Passada Estática (Afundo) Segurando no Apoio',
        muscleGroup: 'Quadríceps & Glúteos Unilateral',
        notes: 'Passo largo, desça o joelho de trás em direção ao solo a 90°. Segure na barra/rack para equilíbrio seguro em 111 kg, 10 por perna',
        restSeconds: 75,
        sets: [
          { id: 'te-4-s1', setNumber: 1, weight: 10, reps: 10, completed: false, previousWeight: 10, previousReps: 10 },
          { id: 'te-4-s2', setNumber: 2, weight: 10, reps: 10, completed: false, previousWeight: 10, previousReps: 10 },
          { id: 'te-4-s3', setNumber: 3, weight: 12, reps: 10, completed: false, previousWeight: 12, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Glúteo Máximo e Quadríceps',
          secondaryMuscles: ['Isquiotibiais', 'Estabilizadores do Quadril'],
          instructions: [
            'Dê um passo largo à frente mantendo os pés na largura do quadril.',
            'Segure um halter em uma das mãos e apoie a outra mão em uma coluna ou rack para garantir equilíbrio seguro.',
            'Desça verticalmente até que o joelho da frente e o de trás formem ângulos próximos a 90°.',
            'O joelho de trás deve quase tocar o solo sem bater.',
            'Empurre pelo calcanhar da perna da frente para retornar.'
          ],
          tips: [
            'Para pessoas com peso acima de 100 kg, apoiar a mão elimina o risco de torção de tornozelo ou perda de equilíbrio, mantendo o estímulo perfeito na perna.'
          ],
          mistakes: [
            'Dar passo muito curto projetando o joelho da frente excessivamente além dos dedos.',
            'Deixar o joelho da frente tombar para dentro.'
          ],
          videoQuery: 'execucao correta afundo com apoio pernas'
        }
      },
      {
        id: 'te-5',
        name: 'Cadeira Abdutora',
        muscleGroup: 'Glúteo Médio / Estabilizadores',
        notes: 'Tronco levemente inclinado à frente, abra com força e segure 1s na abertura máxima, 15 reps',
        restSeconds: 45,
        sets: [
          { id: 'te-5-s1', setNumber: 1, weight: 45, reps: 15, completed: false, previousWeight: 45, previousReps: 15 },
          { id: 'te-5-s2', setNumber: 2, weight: 50, reps: 15, completed: false, previousWeight: 50, previousReps: 15 },
          { id: 'te-5-s3', setNumber: 3, weight: 50, reps: 15, completed: false, previousWeight: 50, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Glúteo Médio e Mínimo',
          secondaryMuscles: ['Tensor da Fáscia Lata'],
          instructions: [
            'Sente-se no aparelho com as almofadas na parte externa dos joelhos.',
            'Incline o tronco levemente para frente (cerca de 15°) mantendo a coluna ereta.',
            'Abra as pernas com força empurrando as almofadas para os lados.',
            'Segure por 1 segundo na contração máxima e feche de forma controlada.'
          ],
          tips: [
            'O glúteo médio é o principal responsável por evitar o valgo dinâmico e proteger o menisco na corrida.'
          ],
          mistakes: [
            'Usar peso em excesso e fazer trancos sem amplitude.',
            'Deixar os pesos baterem no retorno.'
          ],
          videoQuery: 'execucao correta cadeira abdutora tronco inclinado'
        }
      },
      {
        id: 'te-6',
        name: 'Panturrilha em Pé na Máquina',
        muscleGroup: 'Panturrilhas',
        notes: 'Joelhos estendidos sem travar, desça o calcanhar até o máximo do alongamento e suba na ponta máxima (1s no topo), 15 reps',
        restSeconds: 45,
        sets: [
          { id: 'te-6-s1', setNumber: 1, weight: 50, reps: 15, completed: false, previousWeight: 50, previousReps: 15 },
          { id: 'te-6-s2', setNumber: 2, weight: 55, reps: 15, completed: false, previousWeight: 55, previousReps: 15 },
          { id: 'te-6-s3', setNumber: 3, weight: 60, reps: 15, completed: false, previousWeight: 60, previousReps: 15 },
          { id: 'te-6-s4', setNumber: 4, weight: 60, reps: 15, completed: false, previousWeight: 60, previousReps: 15 }
        ],
        guide: {
          primaryMuscle: 'Gastrocnêmio',
          secondaryMuscles: ['Sóleo'],
          instructions: [
            'Apoie os ombros sob as almofadas e a ponta dos pés na borda da plataforma.',
            'Mantenha as pernas retas sem hiperestender a articulação dos joelhos.',
            'Desça os calcanhares sentindo alongar a panturrilha profundamente.',
            'Empurre na ponta dos pés até a altura máxima e segure 1 segundo no topo.'
          ],
          tips: [
            'Execute com ritmo cadenciado: 2 segundos para descer, 1 segundo de pausa em cima.'
          ],
          mistakes: [
            'Ficar quicando rapidamente na ponta dos pés sem amplitude.'
          ],
          videoQuery: 'execucao correta panturrilha em pe maquina'
        }
      },
      {
        id: 'te-cardio',
        name: 'Cardio Final: Esteira Inclinada ou Bicicleta',
        muscleGroup: 'Cardio / Recuperação',
        notes: 'Caminhada forte inclinada (5% a 8%, 5.0 a 5.5 km/h) ou bicicleta por 10 minutos para arrefecimento e queima metabólica.',
        restSeconds: 60,
        sets: [
          { id: 'te-cardio-s1', setNumber: 1, weight: 0, reps: 10, completed: false, previousWeight: 0, previousReps: 10 }
        ],
        guide: {
          primaryMuscle: 'Sistema Cardiorrespiratório',
          secondaryMuscles: ['Glúteos', 'Panturrilhas'],
          instructions: [
            'Opte por caminhada inclinada suave ou bicicleta em ritmo de volta à calma.',
            'Permaneça por 10 minutos recuperando a respiração e fechando a semana com chave de ouro.'
          ],
          tips: [
            'Parabéns pela semana completa de 5 treinos! Sábado e domingo serão dias de descanso e recuperação muscular.'
          ],
          mistakes: [
            'Sair correndo após um treino pesado de perna.'
          ],
          videoQuery: 'importancia do desaquecimento apos musculacao'
        }
      }
=======
    "id": "workout-lower-b",
    "names": [
      "Levantamento Terra Romeno (RDL)",
      "Afundo ou Agachamento Búlgaro",
      "Cadeira Flexora",
      "Panturrilha Sentado (Máquina)",
      "Abdominal (Prancha ou Máquina)"
>>>>>>> 1695103b45c374fcd4e61e586eb015f088b83e2a
    ]
  }
];

export function prepareWorkouts(workouts: Workout[]): Workout[] {
  return workouts.map(workout => {
    const legacy = LEGACY_TEMPLATES.find(template => template.id === workout.id);
    const isLegacyTemplate = !workout.templateVersion && legacy &&
      workout.exercises.length === legacy.names.length &&
      workout.exercises.every((exercise, index) => exercise.name === legacy.names[index]);
    const template = isLegacyTemplate ? DEFAULT_WORKOUTS.find(item => item.id === workout.id) : undefined;
    const source = template ? { ...template, lastCompleted: workout.lastCompleted } : workout;
    return { ...source, exercises: source.exercises.map(exercise => ({
      ...exercise,
      sets: exercise.sets.map(set => {
        const previous = template ? workout.exercises.find(item => item.id === exercise.id)?.sets.find(item => item.id === set.id) : set;
        return { id: set.id, setNumber: set.setNumber, reps: set.reps,
          completed: previous?.completed ?? set.completed, previousReps: previous?.previousReps };
      })
    })) };
  });
}
