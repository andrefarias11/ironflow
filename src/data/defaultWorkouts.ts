import { Workout } from '../types/workout';

export const DEFAULT_WORKOUTS: Workout[] = [
  {
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
  {
    "id": "workout-lower-a",
    "names": [
      "Agachamento Livre ou no Hack",
      "Leg Press 45º",
      "Cadeira Extensora",
      "Mesa Flexora (Posterior de coxa)",
      "Panturrilha em Pé"
    ]
  },
  {
    "id": "workout-upper-b",
    "names": [
      "Supino Inclinado com Halteres",
      "Remada Serrote (Unilateral Halter)",
      "Elevação Lateral com Halteres",
      "Barra Fixa ou Puxador c/ Triângulo",
      "Tríceps Testa ou Corda",
      "Rosca Martelo"
    ]
  },
  {
    "id": "workout-lower-b",
    "names": [
      "Levantamento Terra Romeno (RDL)",
      "Afundo ou Agachamento Búlgaro",
      "Cadeira Flexora",
      "Panturrilha Sentado (Máquina)",
      "Abdominal (Prancha ou Máquina)"
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
