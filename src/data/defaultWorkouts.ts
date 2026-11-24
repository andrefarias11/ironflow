import { Workout, ExerciseSet } from '../types/workout';

export const CURRENT_TEMPLATE_VERSION = 5;

const LEGACY_DEFAULT_IDS = new Set([
  'workout-upper-a',
  'workout-lower-a',
  'workout-upper-b',
  'workout-lower-b',
  'workout-a-upper-push',
  'workout-b-lower-quads',
  'workout-c-conditioning-core',
  'workout-d-upper-pull',
  'workout-e-lower-posterior',
  'workout-a-upper-1',
  'workout-b-lower-1',
  'workout-c-upper-2',
  'workout-d-lower-2',
]);

function makeSets(prefix: string, count: number, reps: number): ExerciseSet[] {
  return Array.from({ length: count }, (_, idx) => ({
    id: `${prefix}-s${idx + 1}`,
    setNumber: idx + 1,
    reps,
    completed: false,
  }));
}

export const DEFAULT_WORKOUTS: Workout[] = [
  // =========================================================================
  // TREINO A: Superiores A — Peito, Costas e Braços (~40 min, 6 exercícios)
  // =========================================================================
  {
    id: 'workout-a-upper-1',
    name: 'Treino A',
    category: 'Superiores A — Peito, Costas e Braços',
    description:
      'Treino prático de tronco e braços em máquinas e polias. Estável, confortável e fácil de ajustar.',
    templateVersion: CURRENT_TEMPLATE_VERSION,
    exercises: [
      {
        id: 'ta-1',
        name: 'Supino Reto na Máquina',
        muscleGroup: 'Peitoral',
        notes:
          'Faça 1 série leve antes para aquecer. Mantenha costas apoiadas e cotovelos abaixo da linha dos ombros. Ocupado? Use Supino Reto com Halteres.',
        repRange: { min: 10, max: 12 },
        restSeconds: 75,
        sets: makeSets('ta-1', 3, 12),
        guide: {
          primaryMuscle: 'Peitoral Maior',
          secondaryMuscles: ['Tríceps', 'Deltóide Anterior'],
          instructions: [
            'Ajuste o banco para que as manoplas fiquem alinhadas com o meio do peito.',
            'Apoie bem as costas e a cabeça no encosto e mantenha os pés firmes no chão.',
            'Empurre as alças à frente de forma controlada, sem travar totalmente os cotovelos no final.',
            'Retorne devagar sentindo o peitoral alongar sem deixar as placas baterem.',
          ],
          tips: [
            'Mantenha os ombros baixos e encaixados contra o banco durante todo o movimento.',
            'Solte o ar ao empurrar e inspire na volta.',
          ],
          mistakes: [
            'Ajustar o banco baixo demais, deixando as mãos na altura do pescoço.',
            'Descolar as costas do encosto para empurrar mais peso.',
          ],
          videoQuery: 'execucao correta supino reto maquina articulada',
        },
      },
      {
        id: 'ta-2',
        name: 'Puxada Alta na Polia (Pegada Aberta)',
        muscleGroup: 'Costas',
        notes:
          'Puxe a barra na direção do peito alto mantendo os ombros longe das orelhas. Ocupado? Use Puxada na Máquina Articulada.',
        repRange: { min: 10, max: 12 },
        restSeconds: 75,
        sets: makeSets('ta-2', 3, 12),
        guide: {
          primaryMuscle: 'Grande Dorsal (Costas)',
          secondaryMuscles: ['Bíceps', 'Trapézio Médio'],
          instructions: [
            'Sente-se e ajuste o apoio acolchoado firme sobre as coxas.',
            'Segure a barra um pouco além da largura dos ombros com as palmas voltadas para frente.',
            'Incline sutilmente o tronco para trás e puxe a barra até a altura da clavícula/peito alto.',
            'Retorne devagar estendendo os braços no topo sem soltar o peso de vez.',
          ],
          tips: [
            'Pense em puxar os cotovelos para baixo, em direção às costelas.',
            'Mantenha o peito aberto durante toda a descida da barra.',
          ],
          mistakes: [
            'Puxar a barra por trás da nuca (força a articulação do ombro).',
            'Balançar o tronco para trás usando impulso da lombar.',
          ],
          videoQuery: 'execucao correta puxada alta frente aberta pulley',
        },
      },
      {
        id: 'ta-3',
        name: 'Desenvolvimento de Ombros na Máquina',
        muscleGroup: 'Ombros',
        notes:
          'Costas coladas no encosto; empurre para o alto sem esticar com tranco no topo. Ocupado? Faça Desenvolvimento Sentado com Halteres.',
        repRange: { min: 10, max: 12 },
        restSeconds: 75,
        sets: makeSets('ta-3', 3, 12),
        guide: {
          primaryMuscle: 'Deltóide Anterior e Lateral',
          secondaryMuscles: ['Tríceps', 'Trapézio Superior'],
          instructions: [
            'Regule o assento para que as manoplas comecem aproximadamente na linha das orelhas ou queixo.',
            'Segure as alças (pegada neutra ou aberta, a que for mais confortável para seu ombro).',
            'Empurre para cima até quase estender totalmente os braços.',
            'Desça de maneira controlada até a altura inicial.',
          ],
          tips: [
            'Se sentir qualquer desconforto no ombro, prefira a pegada neutra (palmas viradas uma para a outra).',
            'Mantenha o abdômen levemente firme para não arquear a lombar.',
          ],
          mistakes: [
            'Descer além da linha do queixo forçando o fundo da articulação.',
            'Tirar o quadril para frente no banco para compensar carga alta.',
          ],
          videoQuery: 'execucao correta desenvolvimento de ombros na maquina',
        },
      },
      {
        id: 'ta-4',
        name: 'Remada Baixa na Polia (Triângulo)',
        muscleGroup: 'Costas',
        notes:
          'Coluna reta e peito estufado; puxe o triângulo até próximo ao umbigo sem gangorrar o corpo. Ocupado? Use Remada Sentada na Máquina.',
        repRange: { min: 10, max: 12 },
        restSeconds: 75,
        sets: makeSets('ta-4', 3, 12),
        guide: {
          primaryMuscle: 'Meio das Costas (Rombóides e Dorsal)',
          secondaryMuscles: ['Bíceps', 'Antebraço'],
          instructions: [
            'Apoie os pés na plataforma mantendo os joelhos levemente flexionados.',
            'Segure o puxador triângulo e sente-se ereto, abrindo bem o peito.',
            'Puxe o triângulo na direção do abdômen passando os cotovelos rente ao corpo.',
            'Aperte as costas por 1 segundo e retorne controlando o cabo.',
          ],
          tips: [
            'Imagine fechar as escápulas atrás das costas a cada repetição.',
            'Deixe apenas os braços irem à frente na volta, mantendo a coluna firme.',
          ],
          mistakes: [
            'Arredondar as costas formando corcunda.',
            'Jogar o tronco muito para trás a cada puxada.',
          ],
          videoQuery: 'execucao correta remada baixa triangulo polia',
        },
      },
      {
        id: 'ta-5',
        name: 'Tríceps na Polia Alta (Barra Reta ou W)',
        muscleGroup: 'Tríceps',
        notes:
          'Cotovelos fixos ao lado das costelas, movendo apenas os antebraços. Ocupado? Use Tríceps Corda ou Tríceps Máquina.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('ta-5', 3, 12),
        guide: {
          primaryMuscle: 'Tríceps Braquial',
          secondaryMuscles: ['Antebraço'],
          instructions: [
            'Em pé diante da polia alta, segure a barra com as palmas voltadas para baixo.',
            'Incline o tronco levemente à frente e cole os cotovelos ao lado do corpo.',
            'Empurre a barra para baixo até estender completamente os braços.',
            'Suba devagar até os antebraços passarem levemente da linha horizontal.',
          ],
          tips: [
            'A barra W costuma ser ainda mais confortável para os punhos do que a barra reta.',
            'Segure meio segundo lá embaixo contraindo a parte de trás do braço.',
          ],
          mistakes: [
            'Deixar os cotovelos subirem junto com a barra.',
            'Jogar o peso dos ombros por cima da barra.',
          ],
          videoQuery: 'execucao correta triceps pulley barra',
        },
      },
      {
        id: 'ta-6',
        name: 'Rosca Bíceps na Polia Baixa (Barra Reta ou W)',
        muscleGroup: 'Bíceps',
        notes:
          'Postura firme e cotovelos colados ao tronco; desça devagar aproveitando a tensão do cabo. Ocupado? Faça Rosca com Halteres.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('ta-6', 3, 12),
        guide: {
          primaryMuscle: 'Bíceps Braquial',
          secondaryMuscles: ['Antebraço'],
          instructions: [
            'Prenda a barra na polia baixa e segure com as palmas voltadas para cima.',
            'Fique em pé com os pés na largura dos ombros e cotovelos encostados na lateral do tronco.',
            'Suba a barra dobrando os cotovelos até contrair bem o bíceps.',
            'Desça controlando em 2 segundos até quase esticar totalmente os braços.',
          ],
          tips: [
            'Como você já estava na polia no exercício anterior, basta descer a regulagem para o chão!',
            'Mantenha os punhos firmes, sem dobrá-los para trás.',
          ],
          mistakes: [
            'Balançar a lombar para impulsionar o peso.',
            'Despencar a carga na descida sem controle.',
          ],
          videoQuery: 'execucao correta rosca direta na polia baixa',
        },
      },
    ],
  },

  // =========================================================================
  // TREINO B: Inferiores A — Pernas, Glúteos e Abdômen (~40 min, 6 exercícios)
  // =========================================================================
  {
    id: 'workout-b-lower-1',
    name: 'Treino B',
    category: 'Inferiores A — Pernas, Glúteos e Abdômen',
    description:
      'Treino guiado de pernas, panturrilhas e abdômen em aparelhos confortáveis, sem sobrecarga na coluna.',
    templateVersion: CURRENT_TEMPLATE_VERSION,
    exercises: [
      {
        id: 'tb-1',
        name: 'Leg Press 45°',
        muscleGroup: 'Quadríceps e Glúteos',
        notes:
          'Faça 1 série leve para aquecer. Lombar sempre apoiada no banco e joelhos alinhados aos pés. Ocupado? Use o Leg Press Horizontal.',
        repRange: { min: 10, max: 12 },
        restSeconds: 90,
        sets: makeSets('tb-1', 3, 12),
        guide: {
          primaryMuscle: 'Quadríceps e Glúteos',
          secondaryMuscles: ['Posterior de Coxa'],
          instructions: [
            'Sente-se encaixando bem o quadril e a lombar contra o encosto.',
            'Apoie os pés no centro da plataforma na largura dos ombros, pontas levemente para fora.',
            'Destrave o aparelho e desça a plataforma devagar até os joelhos formarem cerca de 90°.',
            'Empurre com a sola inteira do pé, parando um pouco antes de esticar tudo no topo.',
          ],
          tips: [
            'Segure firme nas alças laterais do banco para manter o quadril preso no assento.',
            'Desça apenas até onde sua lombar permanece 100% colada no apoio.',
          ],
          mistakes: [
            'Travar os joelhos totalmente esticados no final da subida.',
            'Deixar os joelhos fecharem para dentro ao fazer força.',
          ],
          videoQuery: 'execucao correta leg press 45 iniciante',
        },
      },
      {
        id: 'tb-2',
        name: 'Cadeira Extensora',
        muscleGroup: 'Quadríceps',
        notes:
          'Alinhe o joelho ao eixo da máquina, segure 1s no topo e desça sem soltar o peso. Ocupado? Faça a Cadeira Flexora antes e volte aqui depois.',
        repRange: { min: 12, max: 15 },
        restSeconds: 75,
        sets: makeSets('tb-2', 3, 12),
        guide: {
          primaryMuscle: 'Quadríceps (Frente da Coxa)',
          secondaryMuscles: [],
          instructions: [
            'Ajuste o encosto para que a dobra de trás do joelho encoste suavemente na borda do assento.',
            'Posicione o rolo acolchoado logo acima do tornozelo (frente da canela baixa).',
            'Estenda as pernas até o topo, segurando 1 segundo com a coxa contraída.',
            'Desça devagar controlando o retorno das placas.',
          ],
          tips: [
            'Segurar nas alças laterais evita que você levante o quadril do banco.',
            'Carga moderada com pausa de 1s em cima trabalha muito melhor e protege o joelho.',
          ],
          mistakes: [
            'Chutar o peso com embalo e soltar rápido na descida.',
            'Deixar o rolo apoiado em cima do peito do pé.',
          ],
          videoQuery: 'como ajustar e executar cadeira extensora',
        },
      },
      {
        id: 'tb-3',
        name: 'Cadeira Flexora',
        muscleGroup: 'Posterior de Coxa',
        notes:
          'Trave bem o apoio acolchoado sobre as coxas e puxe os calcanhares para baixo com controle. Ocupado? Use a Mesa Flexora.',
        repRange: { min: 12, max: 15 },
        restSeconds: 75,
        sets: makeSets('tb-3', 3, 12),
        guide: {
          primaryMuscle: 'Isquiotibiais (Posterior de Coxa)',
          secondaryMuscles: ['Panturrilhas'],
          instructions: [
            'Ajuste o encosto e posicione o rolo inferior atrás do tornozelo (logo acima do calcanhar).',
            'Baixe a trava acolchoada sobre as coxas para manter as pernas firmes no lugar.',
            'Dobre os joelhos puxando o rolo para baixo e para trás ao máximo.',
            'Retorne lentamente em 2 a 3 segundos alongando a parte de trás da coxa.',
          ],
          tips: [
            'Mantenha as pontas dos pés apontando para cima (neutras) durante a execução.',
            'Ótimo substituto guiado para trabalhar posterior sem exigir equilíbrio ou forçar a lombar.',
          ],
          mistakes: [
            'Deixar a trava de cima frouxa, fazendo a coxa subir.',
            'Tirar as costas do encosto para puxar mais peso.',
          ],
          videoQuery: 'como ajustar e fazer cadeira flexora',
        },
      },
      {
        id: 'tb-4',
        name: 'Cadeira Abdutora',
        muscleGroup: 'Glúteos e Quadril',
        notes:
          'Afaste as pernas com firmeza, segure 1s na abertura e feche devagar. Ocupado? Use a Cadeira Adutora ou pule para a Panturrilha.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('tb-4', 3, 15),
        guide: {
          primaryMuscle: 'Glúteo Médio e Lateral do Quadril',
          secondaryMuscles: ['Glúteo Máximo'],
          instructions: [
            'Sente-se no aparelho com a parte externa das coxas apoiada nas almofadas.',
            'Mantenha a coluna reta (apoiada no encosto ou sutilmente inclinada à frente com postura firme).',
            'Empurre as almofadas para fora abrindo as pernas com controle.',
            'Segure 1 segundo aberto e retorne devagar sem bater os pesos.',
          ],
          tips: [
            'Fortalecer a lateral do quadril dá grande estabilidade para os joelhos no dia a dia.',
          ],
          mistakes: [
            'Fazer repetições curtas e rápidas no embalo.',
            'Sentar escorregado no banco arredondando a lombar.',
          ],
          videoQuery: 'execucao correta cadeira abdutora',
        },
      },
      {
        id: 'tb-5',
        name: 'Panturrilha no Leg Press (ou Máquina)',
        muscleGroup: 'Panturrilhas',
        notes:
          'Apoie metade da frente do pé com segurança, alongue bem e suba na ponta máxima. Ocupado? Use Panturrilha Sentado ou em Pé na Máquina.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('tb-5', 3, 15),
        guide: {
          primaryMuscle: 'Panturrilhas (Gastrocnêmio)',
          secondaryMuscles: ['Sóleo'],
          instructions: [
            'No Leg Press (45° ou Horizontal), apoie a parte da frente dos pés na base da plataforma com firmeza.',
            'Mantenha os joelhos quase estendidos, mas destravados (leve microflexão fixa).',
            'Deixe os calcanhares recuarem alongando bem a panturrilha.',
            'Empurre com a ponta dos pés e segure 1 segundo lá no alto.',
          ],
          tips: [
            'Evite colocar só a pontinha dos dedos para o pé nunca escapar; apoie toda a frente do pé.',
          ],
          mistakes: [
            'Quicar rápido sem alongar nem pausar em cima.',
            'Dobrar e esticar os joelhos junto com o tornozelo.',
          ],
          videoQuery: 'execucao correta panturrilha no leg press',
        },
      },
      {
        id: 'tb-6',
        name: 'Abdominal na Máquina (Crunch Sentado)',
        muscleGroup: 'Abdômen',
        notes:
          'Enrole o tronco contraindo o abdômen e soltando o ar na descida. Ocupado? Faça Abdominal Supra Curto no Colchonete.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('tb-6', 3, 15),
        guide: {
          primaryMuscle: 'Reto Abdominal',
          secondaryMuscles: ['Oblíquos'],
          instructions: [
            'Sente-se no aparelho de abdômen e segure as alças superiores ou apoie o peito no suporte.',
            'Solte todo o ar pela boca enquanto curva o tronco para baixo aproximando as costelas do quadril.',
            'Segure 1 segundo sentindo o abdômen firme.',
            'Retorne devagar inspirando, sem deixar as placas encostarem.',
          ],
          tips: [
            'Concentre a força no abdômen, usando os braços apenas como gancho fixo nas alças.',
          ],
          mistakes: [
            'Puxar o peso fazendo força com os braços ou pescoço.',
            'Usar carga pesada demais que impede curvar a coluna.',
          ],
          videoQuery: 'execucao correta abdominal na maquina sentado',
        },
      },
    ],
  },

  // =========================================================================
  // TREINO C: Superiores B — Peito, Costas e Ombros (~40 min, 6 exercícios)
  // =========================================================================
  {
    id: 'workout-c-upper-2',
    name: 'Treino C',
    category: 'Superiores B — Peito, Costas e Ombros',
    description:
      'Variação leve e eficiente para peito, costas, ombros e braços com foco em postura e conforto articular.',
    templateVersion: CURRENT_TEMPLATE_VERSION,
    exercises: [
      {
        id: 'tc-1',
        name: 'Supino Inclinado na Máquina',
        muscleGroup: 'Peitoral',
        notes:
          'Faça 1 série leve antes para aquecer. Empurre na diagonal alta mantendo ombros baixos. Ocupado? Use Halteres no banco inclinado (30° a 45°).',
        repRange: { min: 10, max: 12 },
        restSeconds: 75,
        sets: makeSets('tc-1', 3, 12),
        guide: {
          primaryMuscle: 'Peitoral Superior',
          secondaryMuscles: ['Deltóide Anterior', 'Tríceps'],
          instructions: [
            'Ajuste o banco para que as alças fiquem na altura da parte superior do peito.',
            'Apoie bem as costas e encaixe as escápulas contra o banco.',
            'Empurre para cima e à frente em movimento contínuo e controlado.',
            'Desça lentamente até sentir um alongamento confortável no peito.',
          ],
          tips: [
            'Cotovelos sempre levemente abaixo da linha dos ombros (nunca abertos em 90°).',
          ],
          mistakes: [
            'Encolher os ombros em direção às orelhas ao empurrar.',
            'Tirar o quadril do banco para ganhar alavanca.',
          ],
          videoQuery: 'execucao correta supino inclinado maquina articulada',
        },
      },
      {
        id: 'tc-2',
        name: 'Remada na Máquina (Apoio no Peito)',
        muscleGroup: 'Costas',
        notes:
          'Apoie o peito no encosto para aliviar 100% a lombar e puxe fechando as costas. Ocupado? Use Puxada Alta com Triângulo na Polia.',
        repRange: { min: 10, max: 12 },
        restSeconds: 75,
        sets: makeSets('tc-2', 3, 12),
        guide: {
          primaryMuscle: 'Costas (Dorsais e Trapézio Médio)',
          secondaryMuscles: ['Deltóide Posterior', 'Bíceps'],
          instructions: [
            'Regule o assento para o apoio acolchoado ficar confortável no meio do peito.',
            'Segure as manoplas mantendo os ombros relaxados para baixo.',
            'Puxe levando os cotovelos para trás e apertando o meio das costas por 1 segundo.',
            'Volte devagar estendendo os braços sem soltar o peso.',
          ],
          tips: [
            'Excelente exercício para melhorar a postura de quem passa muito tempo sentado.',
          ],
          mistakes: [
            'Descolar o peito da almofada dando tranco para trás.',
            'Dobrar os punhos para tentar puxar mais longe.',
          ],
          videoQuery: 'execucao correta remada maquina apoio no peito',
        },
      },
      {
        id: 'tc-3',
        name: 'Voador Peitoral (Peck Deck)',
        muscleGroup: 'Peitoral',
        notes:
          'Mãos alinhadas ao meio do peito; feche de forma suave e não leve os braços muito para trás na volta. Ocupado? Faça Crucifixo na Polia.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('tc-3', 3, 12),
        guide: {
          primaryMuscle: 'Peitoral Maior',
          secondaryMuscles: ['Deltóide Anterior'],
          instructions: [
            'Ajuste o banco para que os pegadores fiquem na linha do centro do peito (abaixo dos ombros).',
            'Com as costas apoiadas e cotovelos levemente flexionados, traga as alças à frente.',
            'Aperte o peitoral por 1 segundo quando as mãos se aproximarem.',
            'Abra os braços devagar apenas até a linha do tronco, preservando os ombros.',
          ],
          tips: [
            'Regule a abertura inicial do aparelho em uma posição confortável para entrar e sair sem forçar.',
          ],
          mistakes: [
            'Deixar os braços passarem muito para trás da linha do corpo.',
            'Bater as alças com força na frente.',
          ],
          videoQuery: 'execucao correta voador peck deck maquina',
        },
      },
      {
        id: 'tc-4',
        name: 'Elevação Lateral na Máquina (ou com Halteres)',
        muscleGroup: 'Ombros',
        notes:
          'Suba apenas até a linha dos ombros com carga moderada e zero balanço. Ocupado? Faça sentado ou em pé com um par de Halteres leves.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('tc-4', 3, 15),
        guide: {
          primaryMuscle: 'Deltóide Lateral (Ombros)',
          secondaryMuscles: ['Trapézio'],
          instructions: [
            'Na máquina (ou segurando halteres ao lado do corpo), mantenha a postura ereta e abdômen firme.',
            'Eleve os braços lateralmente até os cotovelos alcançarem a altura dos ombros.',
            'Faça uma breve pausa no topo e desça controlando o movimento em 2 segundos.',
          ],
          tips: [
            'Neste exercício, menos peso e mais controle funcionam muito melhor para o ombro.',
            'Se fizer com halteres, mantenha uma leve dobra nos cotovelos.',
          ],
          mistakes: [
            'Pegar peso alto e dar impulso com o corpo.',
            'Subir os braços acima da linha dos ombros encolhendo o pescoço.',
          ],
          videoQuery: 'execucao correta elevacao lateral ombros maquina ou halteres',
        },
      },
      {
        id: 'tc-5',
        name: 'Tríceps Corda na Polia Alta',
        muscleGroup: 'Tríceps',
        notes:
          'Cotovelos parados ao lado do tronco; estenda os braços afastando levemente as pontas da corda embaixo. Ocupado? Use Tríceps Máquina.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('tc-5', 3, 12),
        guide: {
          primaryMuscle: 'Tríceps Braquial',
          secondaryMuscles: ['Antebraço'],
          instructions: [
            'Segure a corda na polia alta e dê meio passo para trás inclinando levemente o tronco.',
            'Trave os cotovelos colados às costelas.',
            'Empurre a corda para baixo até esticar os braços, separando suavemente as mãos no final.',
            'Volte devagar até a altura do peito sem tirar os cotovelos do lugar.',
          ],
          tips: ['A corda deixa os punhos em posição anatômica super confortável.'],
          mistakes: ['Movimentar os ombros para frente e para trás durante a série.'],
          videoQuery: 'execucao correta triceps corda na polia',
        },
      },
      {
        id: 'tc-6',
        name: 'Rosca Bíceps na Máquina Scott (ou Martelo com Halteres)',
        muscleGroup: 'Bíceps',
        notes:
          'Braços totalmente apoiados na almofada; desça devagar sem hiperestender no final. Ocupado? Faça Rosca Martelo com Halteres.',
        repRange: { min: 10, max: 12 },
        restSeconds: 60,
        sets: makeSets('tc-6', 3, 12),
        guide: {
          primaryMuscle: 'Bíceps e Braquial',
          secondaryMuscles: ['Antebraço'],
          instructions: [
            'Ajuste o banco da máquina Scott para que suas axilas fiquem bem encaixadas no topo da almofada.',
            'Segure as alças e suba contraindo o bíceps até o topo.',
            'Desça de maneira lenta e controlada, parando um instante antes de esticar 100% o cotovelo.',
          ],
          tips: [
            'Caso faça a opção de Rosca Martelo com halteres, basta segurar os pesos com as palmas viradas uma para a outra.',
          ],
          mistakes: [
            'Soltar o peso rápido no fundo esticando o cotovelo com tranco.',
            'Levantar o quadril do banco para ajudar na subida.',
          ],
          videoQuery: 'execucao correta rosca scott maquina',
        },
      },
    ],
  },

  // =========================================================================
  // TREINO D: Inferiores B — Pernas, Posterior e Core (~35 min, 5 exercícios)
  // =========================================================================
  {
    id: 'workout-d-lower-2',
    name: 'Treino D',
    category: 'Inferiores B — Pernas, Posterior e Core',
    description:
      'Foco em coxas, posterior, glúteos e abdômen usando apenas aparelhos seguros, rápidos e intuitivos.',
    templateVersion: CURRENT_TEMPLATE_VERSION,
    exercises: [
      {
        id: 'td-1',
        name: 'Leg Press Horizontal na Máquina',
        muscleGroup: 'Glúteos e Quadríceps',
        notes:
          'Faça 1 série leve antes para aquecer. Posicione os pés um pouco mais altos na base para ativar mais glúteos e posterior. Ocupado? Use o Leg Press 45°.',
        repRange: { min: 10, max: 12 },
        restSeconds: 90,
        sets: makeSets('td-1', 3, 12),
        guide: {
          primaryMuscle: 'Quadríceps e Glúteo Máximo',
          secondaryMuscles: ['Posterior de Coxa'],
          instructions: [
            'Sente-se no Leg Press Horizontal e regule a distância do banco para começar com os joelhos perto de 90°.',
            'Apoie os pés na largura dos ombros, um pouco acima do centro da plataforma.',
            'Empurre o apoio usando o pé inteiro (foco nos calcanhares), sem travar os joelhos no final.',
            'Volte devagar mantendo a coluna apoiada no encosto.',
          ],
          tips: [
            'Pés levemente mais altos na plataforma tiram tensão dos joelhos e recrutam muito bem glúteos e coxas.',
          ],
          mistakes: [
            'Empurrar na ponta dos pés tirando os calcanhares da base.',
            'Bater as placas de peso a cada repetição.',
          ],
          videoQuery: 'execucao correta leg press horizontal maquina',
        },
      },
      {
        id: 'td-2',
        name: 'Mesa Flexora',
        muscleGroup: 'Posterior de Coxa',
        notes:
          'Deitado de bruços, mantenha o quadril sempre encostado no banco ao subir os calcanhares. Ocupado? Use a Cadeira Flexora.',
        repRange: { min: 10, max: 12 },
        restSeconds: 75,
        sets: makeSets('td-2', 3, 12),
        guide: {
          primaryMuscle: 'Isquiotibiais (Posterior de Coxa)',
          secondaryMuscles: ['Panturrilhas', 'Glúteos'],
          instructions: [
            'Deite-se de bruços alinhando os joelhos logo fora da borda do banco e o rolo atrás dos tornozelos.',
            'Segure firme nas alças frontais mantendo a bacia colada ao estofado.',
            'Flexione as pernas trazendo os calcanhares na direção dos glúteos.',
            'Segure 1 segundo e desça controlando o peso devagar.',
          ],
          tips: [
            'Trabalha toda a cadeia posterior da coxa com segurança total, mantendo a coluna 100% relaxada no banco.',
          ],
          mistakes: [
            'Levantar o quadril do banco ao puxar a carga.',
            'Soltar o peso de forma brusca na volta.',
          ],
          videoQuery: 'execucao correta mesa flexora',
        },
      },
      {
        id: 'td-3',
        name: 'Cadeira Adutora',
        muscleGroup: 'Interno de Coxa',
        notes:
          'Ajuste uma abertura confortável sem forçar a virilha; feche as pernas segurando 1s no centro. Ocupado? Use a Cadeira Extensora ou Abdutora.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('td-3', 3, 15),
        guide: {
          primaryMuscle: 'Adutores (Parte Interna da Coxa)',
          secondaryMuscles: ['Estabilizadores Pélvicos'],
          instructions: [
            'Sente-se com as costas apoiadas e posicione as almofadas na parte interna dos joelhos.',
            'Regule a trava em uma abertura confortável e sem dor.',
            'Feche as pernas contraindo a parte interna das coxas e segure 1 segundo.',
            'Abra devagar controlando o retorno das placas.',
          ],
          tips: [
            'Fortalece a musculatura estabilizadora do quadril e complementa perfeitamente o trabalho do Leg Press.',
          ],
          mistakes: [
            'Colocar abertura exagerada além da sua flexibilidade atual.',
            'Deixar as pernas abrirem no tranco.',
          ],
          videoQuery: 'execucao correta cadeira adutora',
        },
      },
      {
        id: 'td-4',
        name: 'Panturrilha Sentado na Máquina',
        muscleGroup: 'Panturrilhas',
        notes:
          'Alongue bem o calcanhar para baixo e suba tudo segurando 1s no topo. Ocupado? Faça Panturrilha em Pé na Máquina ou no Leg Press.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('td-4', 3, 15),
        guide: {
          primaryMuscle: 'Sóleo (Panturrilha)',
          secondaryMuscles: ['Gastrocnêmio'],
          instructions: [
            'Sente-se apoiando a parte da frente dos pés na plataforma e ajuste o apoio acolchoado firme sobre os joelhos.',
            'Suba na ponta dos pés para liberar a trava de segurança.',
            'Desça os calcanhares de forma controlada sentindo alongar bem.',
            'Suba o máximo que conseguir, pause 1 segundo no alto e repita.',
          ],
          tips: [
            'Feita sentado (joelho dobrado), trabalha especialmente o músculo sóleo, complementando a panturrilha de perna estendida do Treino B.',
          ],
          mistakes: ['Fazer movimentos curtinhos e acelerados.'],
          videoQuery: 'execucao correta panturrilha sentado maquina',
        },
      },
      {
        id: 'td-5',
        name: 'Abdominal na Polia Alta (ou Máquina)',
        muscleGroup: 'Abdômen e Core',
        notes:
          'Enrole o tronco para baixo contraindo o abdômen sem sentar nos calcanhares. Ocupado? Use o Abdominal na Máquina Sentado ou Colchonete.',
        repRange: { min: 12, max: 15 },
        restSeconds: 60,
        sets: makeSets('td-5', 3, 15),
        guide: {
          primaryMuscle: 'Reto Abdominal',
          secondaryMuscles: ['Oblíquos'],
          instructions: [
            'Ajoelhe-se sobre um colchonete diante da polia alta segurando as pontas da corda ao lado da cabeça.',
            'Mantenha o quadril parado no lugar.',
            'Solte o ar curvando a coluna para baixo, aproximando as costelas da bacia.',
            'Volte devagar sentindo o abdômen alongar.',
          ],
          tips: [
            'Prefere não ajoelhar? Faça tranquilamente na Máquina de Abdominal Sentado.',
          ],
          mistakes: [
            'Sentar nos calcanhares mexendo o quadril em vez de dobrar o abdômen.',
            'Puxar a corda com a força dos braços.',
          ],
          videoQuery: 'execucao correta abdominal na polia alta corda',
        },
      },
    ],
  },
];

function sanitizeWorkouts(workouts: Workout[]): Workout[] {
  return workouts.map((workout) => ({
    ...workout,
    exercises: (workout.exercises || []).map((exercise) => ({
      ...exercise,
      sets: (exercise.sets || []).map((set, idx) => ({
        id: set.id,
        setNumber: Number.isFinite(set.setNumber) ? set.setNumber : idx + 1,
        reps: Number.isFinite(set.reps) ? Math.max(1, Math.floor(set.reps)) : 12,
        completed: Boolean(set.completed),
        ...(set.previousReps !== undefined && Number.isFinite(set.previousReps)
          ? { previousReps: Math.max(0, Math.floor(set.previousReps)) }
          : {}),
      })),
    })),
  }));
}

export function needsDefaultMigration(workouts: Workout[]): boolean {
  if (!Array.isArray(workouts) || workouts.length === 0) return true;
  return workouts.some(
    (w) => LEGACY_DEFAULT_IDS.has(w.id) && w.templateVersion !== CURRENT_TEMPLATE_VERSION
  );
}

export function prepareWorkouts(workouts: Workout[]): Workout[] {
  if (needsDefaultMigration(workouts)) {
    const customWorkouts = Array.isArray(workouts)
      ? workouts.filter((w) => !LEGACY_DEFAULT_IDS.has(w.id))
      : [];
    return sanitizeWorkouts([...DEFAULT_WORKOUTS, ...customWorkouts]);
  }
  return sanitizeWorkouts(workouts);
}
