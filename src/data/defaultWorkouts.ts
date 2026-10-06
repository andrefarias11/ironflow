import { Workout } from '../types/workout';

export const DEFAULT_WORKOUTS: Workout[] = [
  {
    id: 'workout-upper-a',
    name: 'Treino A',
    category: 'Peito, Costas & Braços',
    description: 'Foco em força e hipertrofia: peito, costas, deltoides e braços',
    exercises: [
      {
        id: 'ua-1',
        name: 'Supino Reto (Barra ou Halteres)',
        muscleGroup: 'Peitoral',
        notes: 'Escápulas travadas, pés firmes no chão, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ua-1-s1', setNumber: 1, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
          { id: 'ua-1-s2', setNumber: 2, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
          { id: 'ua-1-s3', setNumber: 3, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Peitoral Maior',
          secondaryMuscles: ['Tríceps', 'Deltóide Anterior'],
          instructions: [
            'Deite no banco com os olhos alinhados à barra e pés apoiados no chão.',
            'Junte e empurre as escápulas para trás e para baixo contra o banco.',
            'Segure a barra com uma pegada um pouco mais larga que a linha dos ombros.',
            'Desça a barra de forma controlada até tocar suavemente a parte média/inferior do peito (linha dos mamilos).',
            'Empurre a barra estendendo os braços, sem projetar os ombros para frente no topo.'
          ],
          tips: [
            'Cotovelos devem formar um ângulo de 45° a 70° com o tronco (não abra a 90° para proteger os ombros).',
            'Mantenha o punho reto alinhado com o antebraço.'
          ],
          mistakes: [
            'Bater a barra no peito aproveitando o impulso.',
            'Tirar a lombar excessivamente ou tirar a bunda do banco.',
            'Abrir demais os cotovelos gerando atrito no ombro.'
          ],
          videoQuery: 'execucao correta supino reto barra'
        }
      },
      {
        id: 'ua-2',
        name: 'Remada Curvada com Barra',
        muscleGroup: 'Costas / Dorsal',
        notes: 'Tronco firme a 45º, puxada no umbigo, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ua-2-s1', setNumber: 1, weight: 30, reps: 10, completed: false, previousWeight: 30, previousReps: 10 },
          { id: 'ua-2-s2', setNumber: 2, weight: 30, reps: 10, completed: false, previousWeight: 30, previousReps: 10 },
          { id: 'ua-2-s3', setNumber: 3, weight: 30, reps: 10, completed: false, previousWeight: 30, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Dorsais e Trapézio Médio/Inferior',
          secondaryMuscles: ['Bíceps', 'Deltóide Posterior', 'Lombar'],
          instructions: [
            'Pés na largura do quadril, joelhos levemente flexionados.',
            'Incline o tronco para frente a cerca de 45°, mantendo a coluna 100% reta.',
            'Segure a barra com pegada pronada (palmas para você) na largura dos ombros.',
            'Puxe a barra em direção ao umbigo / parte inferior do abdômen, puxando com os cotovelos.',
            'Aperte as costas no topo e desça a barra alongando as dorsais de forma controlada.'
          ],
          tips: [
            'Pense em cotoveladas para trás, não em dobrar o braço com o bíceps.',
            'Mantenha o abdômen contraído para proteger a lombar.'
          ],
          mistakes: [
            'Arredondar a coluna lombar (curvar as costas).',
            'Usar muito impulso balançando o tronco para cima.',
            'Puxar a barra muito alta no peito ao invés do abdômen.'
          ],
          videoQuery: 'execucao correta remada curvada com barra'
        }
      },
      {
        id: 'ua-3',
        name: 'Desenvolvimento com Halteres',
        muscleGroup: 'Ombros',
        notes: 'Cotovelos levemente à frente, controle na descida, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ua-3-s1', setNumber: 1, weight: 14, reps: 10, completed: false, previousWeight: 14, previousReps: 10 },
          { id: 'ua-3-s2', setNumber: 2, weight: 14, reps: 10, completed: false, previousWeight: 14, previousReps: 10 },
          { id: 'ua-3-s3', setNumber: 3, weight: 14, reps: 10, completed: false, previousWeight: 14, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Deltóide Anterior e Lateral',
          secondaryMuscles: ['Tríceps', 'Trapézio Superior'],
          instructions: [
            'Sente-se em um banco ajustado a cerca de 75° a 80° (quase reto).',
            'Suba os halteres na altura das orelhas, com os cotovelos levemente à frente do corpo (no plano escapular).',
            'Empurre os halteres para cima em uma trajetória suave até quase estender os braços.',
            'Desça lentamente até que os halteres fiquem na linha do queixo/orelha.'
          ],
          tips: [
            'Não bata os halteres no topo, mantenha a tensão nos ombros.',
            'Mantenha as costas firmemente apoiadas no encosto do banco.'
          ],
          mistakes: [
            'Abrir os cotovelos totalmente em 180° forçando o manguito.',
            'Arquear a lombar tirando as costas do banco.',
            'Fazer meia repetição descendo pouco.'
          ],
          videoQuery: 'execucao correta desenvolvimento halteres ombros'
        }
      },
      {
        id: 'ua-4',
        name: 'Puxada Alta (Costas)',
        muscleGroup: 'Costas',
        notes: 'Puxar com os cotovelos em direção aos bolsos, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ua-4-s1', setNumber: 1, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'ua-4-s2', setNumber: 2, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'ua-4-s3', setNumber: 3, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Grande Dorsal (Asas)',
          secondaryMuscles: ['Bíceps', 'Braquial', 'Trapézio'],
          instructions: [
            'Ajuste o apoio das pernas para travar bem suas coxas no banco.',
            'Segure a barra com pegada pronada um pouco além da largura dos ombros.',
            'Incline o tronco levemente para trás (10° a 15°) e estufe o peito.',
            'Puxe a barra em direção à parte superior do peito, direcionando os cotovelos para baixo e para trás.',
            'Suba a barra controladamente permitindo que as escápulas subam e alonguem a musculatura dorsal.'
          ],
          tips: [
            'Pense em colocar os cotovelos dentro dos bolsos de trás da sua bermuda.',
            'Mantenha o peito aberto durante todo o movimento.'
          ],
          mistakes: [
            'Puxar a barra por trás do pescoço (risco articular desnecessário).',
            'Jogar o corpo excessivamente para trás usando a lombar.',
            'Encolher os ombros no final da puxada.'
          ],
          videoQuery: 'execucao correta puxada alta costas pulley'
        }
      },
      {
        id: 'ua-5',
        name: 'Tríceps no Pulley',
        muscleGroup: 'Tríceps',
        notes: 'Cotovelos fixos ao lado do corpo, extensão total, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ua-5-s1', setNumber: 1, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 },
          { id: 'ua-5-s2', setNumber: 2, weight: 20, reps: 12, completed: false, previousWeight: 20, previousReps: 12 },
          { id: 'ua-5-s3', setNumber: 3, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Tríceps Braquial (Todas as 3 cabeças)',
          secondaryMuscles: ['Antebraço'],
          instructions: [
            'Fique de pé com uma leve inclinação do tronco à frente e abdômen contraído.',
            'Trave os cotovelos rente às costelas e não mova eles do lugar.',
            'Empurre a barra ou corda para baixo estendendo completamente os cotovelos.',
            'No final, aperte o tríceps por 1 segundo e retorne até o antebraço formar 90° com o braço.'
          ],
          tips: [
            'O único movimento deve ser a articulação do cotovelo dobrando e esticando.',
            'Se estiver usando a corda, abra as pontas no final para contração máxima.'
          ],
          mistakes: [
            'Deixar os cotovelos subirem e descerem junto com o peso.',
            'Usar o peso do corpo para empurrar a barra.'
          ],
          videoQuery: 'execucao correta triceps pulley barra corda'
        }
      },
      {
        id: 'ua-6',
        name: 'Rosca Direta',
        muscleGroup: 'Bíceps',
        notes: 'Sem balanço do tronco, contração máxima no topo, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ua-6-s1', setNumber: 1, weight: 12, reps: 10, completed: false, previousWeight: 12, previousReps: 10 },
          { id: 'ua-6-s2', setNumber: 2, weight: 12, reps: 10, completed: false, previousWeight: 12, previousReps: 10 },
          { id: 'ua-6-s3', setNumber: 3, weight: 12, reps: 10, completed: false, previousWeight: 12, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Bíceps Braquial',
          secondaryMuscles: ['Braquial', 'Braquiorradial'],
          instructions: [
            'Fique de pé com os pés na largura dos ombros, segurando a barra ou halteres com palmas para cima.',
            'Cotovelos colados levemente à frente das costelas.',
            'Flexione os braços levantando a barra em direção aos ombros, contraindo forte o bíceps.',
            'Desça o peso lentamente estendendo o braço quase que por completo antes da próxima repetição.'
          ],
          tips: [
            'A descida (fase excêntrica) deve durar cerca de 2 a 3 segundos para maximizar hipertrofia.'
          ],
          mistakes: [
            'Jogar os quadris para frente ou balançar as costas para subir a carga.',
            'Levar os cotovelos muito para frente no topo aliviando a tensão do bíceps.'
          ],
          videoQuery: 'execucao correta rosca direta barra w halteres'
        }
      }
    ]
  },
  {
    id: 'workout-lower-a',
    name: 'Treino B',
    category: 'Pernas & Panturrilha',
    description: 'Quadríceps dominante, posteriores e panturrilha',
    exercises: [
      {
        id: 'la-1',
        name: 'Agachamento Livre ou no Hack',
        muscleGroup: 'Quadríceps / Glúteos',
        notes: 'Profundidade controlada, joelhos alinhados aos pés, 8 a 12 reps',
        restSeconds: 120,
        sets: [
          { id: 'la-1-s1', setNumber: 1, weight: 50, reps: 10, completed: false, previousWeight: 50, previousReps: 10 },
          { id: 'la-1-s2', setNumber: 2, weight: 50, reps: 10, completed: false, previousWeight: 50, previousReps: 10 },
          { id: 'la-1-s3', setNumber: 3, weight: 50, reps: 10, completed: false, previousWeight: 50, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Quadríceps e Glúteo Máximo',
          secondaryMuscles: ['Posteriores de Coxa', 'Adutores', 'Core'],
          instructions: [
            'Posicione a barra apoiada nos trapézios (não no osso do pescoço).',
            'Pés na largura dos ombros, pontas dos pés viradas cerca de 15° a 30° para fora.',
            'Inspire fundo, contraia o abdômen e inicie o agachamento jogando o quadril para trás e dobrando os joelhos.',
            'Desça até as coxas ficarem paralelas ao chão (ou abaixo se tiver boa mobilidade).',
            'Empurre o chão com a sola do pé inteira para subir, mantendo o peito erguido.'
          ],
          tips: [
            'Os joelhos devem sempre acompanhar a direção das pontas dos pés.',
            'Se fizer no Hack, mantenha as costas e lombar 100% apoiadas na almofada.'
          ],
          mistakes: [
            'Deixar os joelhos entrarem para dentro (valgo dinâmico) ao subir.',
            'Tirar os calcanhares do chão.',
            'Curvar a coluna para a frente.'
          ],
          videoQuery: 'execucao correta agachamento livre pernas'
        }
      },
      {
        id: 'la-2',
        name: 'Leg Press 45º',
        muscleGroup: 'Pernas Geral',
        notes: 'Amplitude total sem tirar a lombar do encosto, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'la-2-s1', setNumber: 1, weight: 120, reps: 10, completed: false, previousWeight: 120, previousReps: 10 },
          { id: 'la-2-s2', setNumber: 2, weight: 140, reps: 10, completed: false, previousWeight: 120, previousReps: 10 },
          { id: 'la-2-s3', setNumber: 3, weight: 140, reps: 10, completed: false, previousWeight: 140, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Quadríceps e Glúteos',
          secondaryMuscles: ['Posteriores'],
          instructions: [
            'Sente-se no aparelho mantendo o quadril e a coluna lombar colados no encosto.',
            'Pés na largura dos ombros no meio da plataforma.',
            'Destrave o aparelho e desça a plataforma controlando a carga até os joelhos dobrarem a ~90°.',
            'Empurre a plataforma de volta usando a força das pernas, parando antes de travar os joelhos.'
          ],
          tips: [
            'Segure firme nas alças laterais para puxar o quadril contra o assento.',
            'Nunca estenda 100% os joelhos ("hiperestensão") no topo com carga pesada.'
          ],
          mistakes: [
            'Deixar a lombar descolar do banco no fundo do movimento.',
            'Colocar as mãos sobre os joelhos para ajudar.'
          ],
          videoQuery: 'execucao correta leg press 45'
        }
      },
      {
        id: 'la-3',
        name: 'Cadeira Extensora',
        muscleGroup: 'Quadríceps',
        notes: 'Pausa de 1 segundo no topo, descida lenta, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'la-3-s1', setNumber: 1, weight: 40, reps: 12, completed: false, previousWeight: 40, previousReps: 12 },
          { id: 'la-3-s2', setNumber: 2, weight: 45, reps: 10, completed: false, previousWeight: 40, previousReps: 12 },
          { id: 'la-3-s3', setNumber: 3, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Quadríceps (Foco no Reto Femoral)',
          secondaryMuscles: [],
          instructions: [
            'Ajuste o encosto para que o joelho fique exatamente no eixo de rotação da máquina.',
            'A almofada deve ficar na parte inferior da canela, logo acima dos tornozelos.',
            'Segure as alças laterais para prender o quadril no banco.',
            'Estenda os joelhos até alinhar as pernas, contraindo forte a coxa no topo por 1 segundo.',
            'Desça o peso lentamente em 2 a 3 segundos.'
          ],
          tips: [
            'Não use impulso para subir o peso, sinta o quadríceps queimando.'
          ],
          mistakes: [
            'Tirar o quadril do banco ao subir a carga.',
            'Soltar o peso despencando na descida.'
          ],
          videoQuery: 'execucao correta cadeira extensora quadriceps'
        }
      },
      {
        id: 'la-4',
        name: 'Mesa Flexora (Posterior de coxa)',
        muscleGroup: 'Posterior de Coxa',
        notes: 'Quadril colado no banco, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'la-4-s1', setNumber: 1, weight: 35, reps: 10, completed: false, previousWeight: 35, previousReps: 10 },
          { id: 'la-4-s2', setNumber: 2, weight: 35, reps: 10, completed: false, previousWeight: 35, previousReps: 10 },
          { id: 'la-4-s3', setNumber: 3, weight: 35, reps: 10, completed: false, previousWeight: 35, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Isquiotibiais (Posterior de Coxa)',
          secondaryMuscles: ['Panturrilhas'],
          instructions: [
            'Deite de bruços na mesa com a almofada de rolo ajustada logo abaixo das panturrilhas.',
            'Segure as manoplas e pressione o quadril ativamente contra o acolchoado.',
            'Flexione as pernas puxando o rolo em direção aos glúteos.',
            'No topo da contração segure por meio segundo e desça de forma cadenciada.'
          ],
          tips: [
            'Manter os pés em dorsiflexão (dedos apontados para você) aumenta a contração.'
          ],
          mistakes: [
            'Empinar a bunda ou levantar o quadril do acolchoado na subida.',
            'Dar tranco com a lombar.'
          ],
          videoQuery: 'execucao correta mesa flexora posterior coxa'
        }
      },
      {
        id: 'la-5',
        name: 'Panturrilha em Pé',
        muscleGroup: 'Panturrilhas',
        notes: 'Amplitude total, pausa de 2s no alongamento embaixo, 15 reps',
        restSeconds: 90,
        sets: [
          { id: 'la-5-s1', setNumber: 1, weight: 50, reps: 15, completed: false, previousWeight: 50, previousReps: 15 },
          { id: 'la-5-s2', setNumber: 2, weight: 50, reps: 15, completed: false, previousWeight: 50, previousReps: 15 },
          { id: 'la-5-s3', setNumber: 3, weight: 50, reps: 15, completed: false, previousWeight: 50, previousReps: 15 },
        ],
        guide: {
          primaryMuscle: 'Gastrocnêmio (Panturrilha)',
          secondaryMuscles: ['Sóleo'],
          instructions: [
            'Posicione a ponta dos pés na borda da plataforma, joelhos estendidos (mas sem travar).',
            'Desça os calcanhares o máximo possível para alongar completamente a panturrilha.',
            'Segure 2 segundos no ponto mais baixo para dissipar a energia elástica do tendão.',
            'Empurre o chão com a ponta dos pés subindo na ponta dos pés ao máximo e aperte no topo.'
          ],
          tips: [
            'O segredo da panturrilha é a amplitude máxima e a pausa embaixo.'
          ],
          mistakes: [
            'Fazer repetições curtas e rápidas pulando no lugar.',
            'Dobrar os joelhos durante a subida.'
          ],
          videoQuery: 'execucao correta panturrilha em pe maquina'
        }
      }
    ]
  },
  {
    id: 'workout-upper-b',
    name: 'Treino C',
    category: 'Ombros, Peito & Dorsal',
    description: 'Variação de estímulo: peitoral inclinado, remada unilateral e deltoide lateral',
    exercises: [
      {
        id: 'ub-1',
        name: 'Supino Inclinado com Halteres',
        muscleGroup: 'Peitoral Superior',
        notes: 'Banco a 30-45º, foco no feixe clavicular, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ub-1-s1', setNumber: 1, weight: 18, reps: 10, completed: false, previousWeight: 18, previousReps: 10 },
          { id: 'ub-1-s2', setNumber: 2, weight: 20, reps: 10, completed: false, previousWeight: 18, previousReps: 10 },
          { id: 'ub-1-s3', setNumber: 3, weight: 20, reps: 8, completed: false, previousWeight: 20, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Peitoral Superior (Porção Clavicular)',
          secondaryMuscles: ['Deltóide Anterior', 'Tríceps'],
          instructions: [
            'Ajuste o banco em uma inclinação de 30° a 45° (mais de 45° trabalha mais ombro que peito).',
            'Sente-se com os halteres nas coxas e dê um impulso com os joelhos para posicioná-los no peito.',
            'Escápulas aduzidas, empurre os halteres para cima convergindo levemente no topo.',
            'Desça os halteres alongando a parte superior do peito até a linha dos ombros.'
          ],
          tips: [
            'Mantenha os cotovelos levemente fechados (~45° a 60°), não abra totalmente.'
          ],
          mistakes: [
            'Inclinar o banco em 60° transformando o exercício em desenvolvimento de ombros.',
            'Tirar a cabeça ou glúteos do banco.'
          ],
          videoQuery: 'execucao correta supino inclinado halteres'
        }
      },
      {
        id: 'ub-2',
        name: 'Remada Serrote (Unilateral Halter)',
        muscleGroup: 'Costas / Dorsal',
        notes: 'Puxar o halter em direção ao quadril, 8 a 12 reps cada lado',
        restSeconds: 90,
        sets: [
          { id: 'ub-2-s1', setNumber: 1, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
          { id: 'ub-2-s2', setNumber: 2, weight: 22, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
          { id: 'ub-2-s3', setNumber: 3, weight: 22, reps: 8, completed: false, previousWeight: 22, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Grande Dorsal (Unilateral)',
          secondaryMuscles: ['Trapézio', 'Romboide', 'Bíceps'],
          instructions: [
            'Apoie um joelho e a mão do mesmo lado em um banco plano.',
            'Mantenha o tronco paralelo ao chão e a coluna neutra e firme.',
            'Com a outra mão, segure o halter estendido em direção ao chão.',
            'Puxe o halter fazendo uma curva em direção ao quadril/bolso, guiando o cotovelo para cima e para trás.',
            'Aperte a asa da dorsal no topo e desça alongando completamente.'
          ],
          tips: [
            'Não gire o tronco para subir o peso, mantenha o peito voltado para o chão.'
          ],
          mistakes: [
            'Puxar o halter reto para a axila (usa mais bíceps e ombro do que dorsal).',
            'Girar e torcer a coluna para conseguir subir a carga.'
          ],
          videoQuery: 'execucao correta remada serrote unilateral halter'
        }
      },
      {
        id: 'ub-3',
        name: 'Elevação Lateral com Halteres',
        muscleGroup: 'Deltóide Lateral',
        notes: 'Elevação até a linha dos ombros, cotovelo guia o movimento, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ub-3-s1', setNumber: 1, weight: 10, reps: 12, completed: false, previousWeight: 10, previousReps: 12 },
          { id: 'ub-3-s2', setNumber: 2, weight: 10, reps: 12, completed: false, previousWeight: 10, previousReps: 12 },
          { id: 'ub-3-s3', setNumber: 3, weight: 12, reps: 10, completed: false, previousWeight: 10, previousReps: 12 },
        ],
        guide: {
          primaryMuscle: 'Deltóide Lateral (Largura dos Ombros)',
          secondaryMuscles: ['Trapézio Superior'],
          instructions: [
            'Fique de pé com tronco levemente inclinado para a frente (5° a 10°).',
            'Segure os halteres ao lado das coxas, cotovelos levemente flexionados.',
            'Eleve os braços lateralmente até a altura da linha dos ombros, com os cotovelos liderando o movimento.',
            'Desça controladamente sem bater os halteres nas coxas para manter a tensão constante.'
          ],
          tips: [
            'Imagine que você está derramando uma jarra de água no topo: o dedo mindinho fica levemente mais alto que o polegar.'
          ],
          mistakes: [
            'Usar peso pesado demais e ficar dando trancos com o corpo.',
            'Subir as mãos mais alto do que os cotovelos.',
            'Encolher os ombros ativando excessivamente o trapézio.'
          ],
          videoQuery: 'execucao correta elevacao lateral halteres ombro'
        }
      },
      {
        id: 'ub-4',
        name: 'Barra Fixa ou Puxador c/ Triângulo',
        muscleGroup: 'Costas',
        notes: 'Alongamento dorsal total, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ub-4-s1', setNumber: 1, weight: 45, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'ub-4-s2', setNumber: 2, weight: 50, reps: 10, completed: false, previousWeight: 45, previousReps: 10 },
          { id: 'ub-4-s3', setNumber: 3, weight: 50, reps: 8, completed: false, previousWeight: 50, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Dorsais e Miolo das Costas',
          secondaryMuscles: ['Bíceps', 'Braquiorradial'],
          instructions: [
            'Se fizer no puxador com triângulo (pegada neutra): trave as pernas e estufe o peito.',
            'Puxe o triângulo em direção ao peitoral superior, fechando as escápulas atrás.',
            'Segure 1 segundo no peito e suba alongando as costas até os braços estenderem quase por completo.'
          ],
          tips: [
            'A pegada neutra com triângulo é excelente para segurança dos ombros e ativação dorsal profunda.'
          ],
          mistakes: [
            'Jogar as costas totalmente para trás transformando em remada.',
            'Não estender os braços na subida, encurtando o movimento.'
          ],
          videoQuery: 'execucao correta puxada frente triangulo pegada neutra'
        }
      },
      {
        id: 'ub-5',
        name: 'Tríceps Testa ou Corda',
        muscleGroup: 'Tríceps',
        notes: 'Controle excêntrico, braços fixos, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ub-5-s1', setNumber: 1, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
          { id: 'ub-5-s2', setNumber: 2, weight: 20, reps: 10, completed: false, previousWeight: 20, previousReps: 10 },
          { id: 'ub-5-s3', setNumber: 3, weight: 22, reps: 8, completed: false, previousWeight: 20, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Tríceps Braquial (Cabeça Longa)',
          secondaryMuscles: ['Antebraço'],
          instructions: [
            'Deite em um banco plano segurando a barra W ou halteres acima dos olhos.',
            'Incline os braços ligeiramente para trás (cerca de 10° em relação à vertical) para manter a tensão constante.',
            'Dobre apenas os cotovelos, descendo a barra controladamente em direção ao topo da cabeça/testa.',
            'Estenda os cotovelos voltando à posição inicial sem mexer a parte superior dos braços.'
          ],
          tips: [
            'Não abra os cotovelos para os lados; mantenha-os paralelos.'
          ],
          mistakes: [
            'Balançar os braços para frente e para trás usando os ombros.',
            'Descer a carga muito rápido arriscando bater na testa.'
          ],
          videoQuery: 'execucao correta triceps testa barra w'
        }
      },
      {
        id: 'ub-6',
        name: 'Rosca Martelo',
        muscleGroup: 'Bíceps / Braquial',
        notes: 'Pegada neutra, espessura do braço e antebraço, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'ub-6-s1', setNumber: 1, weight: 12, reps: 10, completed: false, previousWeight: 12, previousReps: 10 },
          { id: 'ub-6-s2', setNumber: 2, weight: 14, reps: 10, completed: false, previousWeight: 12, previousReps: 10 },
          { id: 'ub-6-s3', setNumber: 3, weight: 14, reps: 8, completed: false, previousWeight: 14, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Braquial e Braquiorradial (Antebraço)',
          secondaryMuscles: ['Bíceps Braquial'],
          instructions: [
            'Fique de pé segurando halteres com as palmas voltadas uma para a outra (pegada neutra).',
            'Cotovelos colados nas laterais do corpo.',
            'Suba os halteres sem girar os punhos, mantendo as palmas viradas para dentro.',
            'Aperte no topo e desça lentamente até a extensão total dos braços.'
          ],
          tips: [
            'Excelente exercício para dar espessura lateral ao braço e antebraço forte.'
          ],
          mistakes: [
            'Girar o punho durante o movimento (virando rosca tradicional).',
            'Balançar o tronco para dar impulso.'
          ],
          videoQuery: 'execucao correta rosca martelo halteres'
        }
      }
    ]
  },
  {
    id: 'workout-lower-b',
    name: 'Treino D',
    category: 'Posterior, Glúteos & Core',
    description: 'Cadeia posterior dominante, unilateral e core',
    exercises: [
      {
        id: 'lb-1',
        name: 'Levantamento Terra Romeno (RDL)',
        muscleGroup: 'Posterior / Glúteos',
        notes: 'Quadril para trás, coluna neutra, 8 a 12 reps',
        restSeconds: 120,
        sets: [
          { id: 'lb-1-s1', setNumber: 1, weight: 40, reps: 10, completed: false, previousWeight: 40, previousReps: 10 },
          { id: 'lb-1-s2', setNumber: 2, weight: 50, reps: 10, completed: false, previousWeight: 40, previousReps: 10 },
          { id: 'lb-1-s3', setNumber: 3, weight: 50, reps: 8, completed: false, previousWeight: 50, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Isquiotibiais (Posterior de Coxa) e Glúteos',
          secondaryMuscles: ['Eretores da Espinha / Lombar', 'Antebraço'],
          instructions: [
            'Fique de pé com a barra ou halteres na frente das coxas, pés na largura do quadril.',
            'Destrave levemente os joelhos (mantenha esse ângulo fixo, não agache!).',
            'Inicie o movimento empurrando o quadril para trás, como se fosse tocar uma parede com a bunda.',
            'Desça a barra rente às pernas até sentir um alongamento forte nos posteriores da coxa (altura da canela).',
            'Contraia os glúteos e empurre o quadril de volta para a frente até ficar em pé.'
          ],
          tips: [
            'Mantenha a barra colada nas pernas o tempo todo.',
            'A coluna deve ficar 100% reta, com peito aberto.'
          ],
          mistakes: [
            'Dobrar os joelhos demais transformando em agachamento.',
            'Arredondar as costas na descida (risco para a lombar).',
            'Olhar para cima hiperestendendo o pescoço.'
          ],
          videoQuery: 'execucao correta levantamento terra romeno rdl'
        }
      },
      {
        id: 'lb-2',
        name: 'Afundo ou Agachamento Búlgaro',
        muscleGroup: 'Quadríceps / Glúteos',
        notes: 'Equilíbrio e profundidade, 8 a 12 reps por perna',
        restSeconds: 90,
        sets: [
          { id: 'lb-2-s1', setNumber: 1, weight: 12, reps: 10, completed: false, previousWeight: 12, previousReps: 10 },
          { id: 'lb-2-s2', setNumber: 2, weight: 14, reps: 10, completed: false, previousWeight: 12, previousReps: 10 },
          { id: 'lb-2-s3', setNumber: 3, weight: 14, reps: 8, completed: false, previousWeight: 14, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Glúteos e Quadríceps (Unilateral)',
          secondaryMuscles: ['Posteriores', 'Adutores', 'Core'],
          instructions: [
            'Fique a cerca de 2 a 3 passos à frente de um banco plano.',
            'Apoie o peito de um dos pés no banco atrás de você.',
            'Mantenha o tronco ereto ou com uma leve inclinação de 15° à frente.',
            'Desça flexionando o joelho da frente até a coxa ficar paralela ao chão.',
            'Empurre o chão com o calcanhar da perna da frente para subir.'
          ],
          tips: [
            'Se quiser focar mais no glúteo, incline o tronco um pouco mais para a frente.',
            'Se quiser focar mais no quadríceps, mantenha o tronco bem vertical.'
          ],
          mistakes: [
            'Deixar o joelho da frente entrar para dentro.',
            'Jogar o peso excessivamente no pé de trás (ele serve apenas para equilíbrio).'
          ],
          videoQuery: 'execucao correta agachamento bulgaro gluteo quadriceps'
        }
      },
      {
        id: 'lb-3',
        name: 'Cadeira Flexora',
        muscleGroup: 'Posterior de Coxa',
        notes: 'Isolamento de posteriores, contração no pico, 8 a 12 reps',
        restSeconds: 90,
        sets: [
          { id: 'lb-3-s1', setNumber: 1, weight: 35, reps: 12, completed: false, previousWeight: 35, previousReps: 12 },
          { id: 'lb-3-s2', setNumber: 2, weight: 40, reps: 10, completed: false, previousWeight: 35, previousReps: 12 },
          { id: 'lb-3-s3', setNumber: 3, weight: 40, reps: 10, completed: false, previousWeight: 40, previousReps: 10 },
        ],
        guide: {
          primaryMuscle: 'Isquiotibiais (Posterior de Coxa)',
          secondaryMuscles: ['Panturrilhas'],
          instructions: [
            'Sente-se com as costas apoiadas no encosto.',
            'Abaixe a almofada de retenção superior firmemente sobre as coxas.',
            'A almofada inferior deve ficar atrás dos tornozelos.',
            'Puxe os calcanhares para baixo e para trás flexionando os joelhos ao máximo.',
            'Retorne lentamente controlando a subida.'
          ],
          tips: [
            'Excelente para trabalhar o posterior em flexão de joelho com o quadril já flexionado.'
          ],
          mistakes: [
            'Não prender bem a almofada da coxa deixando as pernas soltas.',
            'Fazer repetições incompletas sem puxar até o final.'
          ],
          videoQuery: 'execucao correta cadeira flexora posterior'
        }
      },
      {
        id: 'lb-4',
        name: 'Panturrilha Sentado (Máquina)',
        muscleGroup: 'Panturrilhas / Sóleo',
        notes: 'Foco no músculo sóleo, 15 repetições com pausa embaixo',
        restSeconds: 90,
        sets: [
          { id: 'lb-4-s1', setNumber: 1, weight: 30, reps: 15, completed: false, previousWeight: 30, previousReps: 15 },
          { id: 'lb-4-s2', setNumber: 2, weight: 35, reps: 15, completed: false, previousWeight: 30, previousReps: 15 },
          { id: 'lb-4-s3', setNumber: 3, weight: 35, reps: 15, completed: false, previousWeight: 35, previousReps: 15 },
        ],
        guide: {
          primaryMuscle: 'Sóleo (Músculo profundo da panturrilha)',
          secondaryMuscles: [],
          instructions: [
            'Sente-se na máquina com as pontas dos pés na plataforma.',
            'Ajuste o apoio estofado sobre a parte inferior das coxas, perto dos joelhos.',
            'Destrave a alavanca e desça os calcanhares sentindo o alongamento máximo.',
            'Segure 2 segundos no ponto mais baixo e empurre até a ponta dos pés no topo.'
          ],
          tips: [
            'Com os joelhos flexionados a 90°, o músculo Sóleo é o principal ativado, dando largura para a panturrilha.'
          ],
          mistakes: [
            'Quicar o peso rapidamente sem amplitude.'
          ],
          videoQuery: 'execucao correta panturrilha sentada soleo'
        }
      },
      {
        id: 'lb-5',
        name: 'Abdominal (Prancha ou Máquina)',
        muscleGroup: 'Abdômen / Core',
        notes: 'Contração contínua do abdômen, 15 reps ou 45-60s prancha',
        restSeconds: 60,
        sets: [
          { id: 'lb-5-s1', setNumber: 1, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
          { id: 'lb-5-s2', setNumber: 2, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
          { id: 'lb-5-s3', setNumber: 3, weight: 0, reps: 15, completed: false, previousWeight: 0, previousReps: 15 },
        ],
        guide: {
          primaryMuscle: 'Reto Abdominal e Transverso do Abdômen',
          secondaryMuscles: ['Oblíquos'],
          instructions: [
            'Se fizer Prancha: apoie os antebraços e pontas dos pés no chão.',
            'Mantenha o corpo em linha reta da cabeça aos calcanhares.',
            'Puxe o umbigo em direção à coluna e contraia forte os glúteos.',
            'Se fizer na Máquina: aproxime as costelas do quadril curvando suavemente a coluna para a frente usando o abdômen (não puxando com os braços).'
          ],
          tips: [
            'Respire normalmente sem prender o ar.'
          ],
          mistakes: [
            'Deixar o quadril cair em direção ao chão na prancha (dor lombar).',
            'Puxar o pescoço para a frente ao invés de contrair o abdômen.'
          ],
          videoQuery: 'execucao correta prancha abdominal core'
        }
      }
    ]
  }
];
