// Características específicas para diferentes tipos de jogos

export const CARACTERISTICAS_JOGOS: Record<string, string[]> = {
  // Características para jogos de FPS/Tiro
  fps: [
    'mortal', 'preciso', 'certeiro', 'estratégico', 'tático', 'rápido no gatilho',
    'implacável', 'letal', 'sniper profissional', 'atirador de elite',
    'caçador implacável', 'especialista em headshots', 'franco-atirador',
    'soldado de elite', 'comandante tático', 'mestre em emboscadas',
    'especialista em armas', 'mestre do campo de batalha', 'assassino silencioso',
    'atirador furtivo', 'mercenário impiedoso', 'caçador de recompensas',
    'predador das sombras', 'escopo laser', 'mira perfeita', 'reflexos rápidos',
    'atirador fantasma', 'demolidor de esquadrões', 'especialista em explosivos',
    'eliminador de ameaças', 'mestre do headshot'
  ],

  // Características para jogos de RPG
  rpg: [
    'lendário', 'místico', 'poderoso', 'heroico', 'ancestral', 'épico',
    'bruxo das sombras', 'paladino da luz', 'necromante temido', 'druida da natureza',
    'cavaleiro das trevas', 'mago arcano', 'ranger furtivo', 'bárbaro feroz',
    'clérigo divino', 'ladino das sombras', 'senhor dos dragões', 'domador de bestas',
    'mestre das runas', 'caçador de tesouros', 'guardião do reino', 'xamã dos elementos',
    'arqueiro preciso', 'invocador de espíritos', 'herói das eras', 'construtor de mundos',
    'portador da relíquia', 'campeão da arena', 'guerreiro imortal', 'senhor da magia',
    'aventureiro destemido', 'devorador de almas'
  ],

  // Características para jogos de Estratégia
  estrategia: [
    'estratégico', 'calculista', 'visionário', 'tático', 'analítico', 'metódico',
    'mestre do planejamento', 'construtor de impérios', 'comandante supremo',
    'conquistador de reinos', 'senhor da guerra', 'gênio tático', 'imperador supremo',
    'diplomata astuto', 'general das eras', 'administrador eficiente', 'estrategista nato',
    'visionário dos campos de batalha', 'mestre da economia', 'líder supremo',
    'arquiteto da vitória', 'planejador meticuloso', 'dominador de territórios',
    'manipulador de recursos', 'mestre das alianças', 'líder inspirador',
    'demolidor de defesas', 'controlador de nações', 'mestre do xadrez humano',
    'analista perfeito', 'comandante de legiões'
  ],

  // Características para jogos de MOBA/Battle Royale
  moba: [
    'competitivo', 'versátil', 'ágil', 'cooperativo', 'coordenado', 'veloz',
    'carregador de times', 'mestre das lanes', 'caçador da selva', 'suporte supremo',
    'assassino eficiente', 'mestre do MOBA', 'campeão invicto', 'dominador de torneios',
    'especialista em ganks', 'farmer perfeito', 'mestre das lutas em equipe',
    'especialista em objetivos', 'controle de multidões', 'mestre da visão de mapa',
    'estrategista de equipe', 'líder de clã', 'construtor de builds', 'flanqueador experiente',
    'especialista em emboscadas', 'mestre da rotação', 'carry lendário',
    'especialista em diversificar', 'capitão de esquadrão', 'conhecedor de meta'
  ],

  // Características para jogos de Aventura/Sobrevivência
  aventura: [
    'explorador', 'sobrevivente', 'aventureiro', 'destemido', 'descobridor', 'resiliente',
    'caçador de tesouros', 'mestre da sobrevivência', 'explorador de cavernas',
    'navegador de terras selvagens', 'construtor de abrigos', 'mestre do crafting',
    'caçador experiente', 'desbravador de fronteiras', 'domador da natureza',
    'escalador intrépido', 'descobridor de ruínas', 'pioneiro corajoso',
    'especialista em armadilhas', 'coletor de recursos', 'nômade resiliente',
    'montanhista audacioso', 'aventureiro sem limites', 'pescador habilidoso',
    'mestre da orientação', 'especialista em primeiros socorros', 'plantador experiente',
    'engenheiro de campo', 'geólogo amador', 'descobridor de biomas'
  ],

  // Características para jogos de Esportes/Corrida
  esportes: [
    'veloz', 'ágil', 'campeão', 'atlético', 'competitivo', 'invicto',
    'piloto de elite', 'corredor incansável', 'mestre do drift', 'atleta olímpico',
    'campeão de ligas', 'recordista mundial', 'striker lendário', 'fera das quadras',
    'rei da velocidade', 'maestro dos esportes', 'mestre do volante', 'piloto de fórmula',
    'especialista em manobras', 'astro do futebol', 'fera das pistas', 'mecânico expert',
    'especialista em curvas', 'treinador nato', 'mestre da tática esportiva',
    'colecionador de troféus', 'estrela do campeonato', 'indomável nas pistas',
    'rei das manobras', 'piloto das estrelas', 'mestre da ultrapassagem'
  ],

  // Características para jogos de Simulação/Construção
  simulacao: [
    'criativo', 'inovador', 'arquiteto', 'visionário', 'detalhista', 'meticuloso',
    'construtor de cidades', 'designer de interiores', 'planejador urbano',
    'arquiteto visionário', 'engenheiro de precisão', 'mestre construtor',
    'modelador 3D', 'decorador profissional', 'especialista em redstone',
    'criador de mundos', 'designer de parques', 'especialista em paisagismo',
    'engenheiro de automação', 'especialista em terraformação', 'projetista de mansões',
    'mestre da otimização', 'especialista em transportes', 'planejador de recursos',
    'controlador de tráfego', 'especialista em iluminação', 'projetista de circuitos',
    'administrador de empresas', 'magnata virtual', 'construtor de maravilhas'
  ],

  // Características para jogos de Terror/Horror
  terror: [
    'sinistro', 'macabro', 'sombrio', 'misterioso', 'assustador', 'temível',
    'caçador de fantasmas', 'sobrevivente do horror', 'investigador paranormal',
    'explorador do desconhecido', 'mestre do terror', 'senhor dos pesadelos',
    'conjurador de malignidades', 'especialista em exorcismos', 'detetive do sobrenatural',
    'colecionador de almas', 'senhor das trevas', 'guardião do cemitério',
    'mensageiro da morte', 'observador do vazio', 'susurrador de terrores',
    'sobrevivente da mansão', 'viajante do mundo espiritual', 'manipulador de mentes',
    'amaldiçoado resiliente', 'enfrentador de fobias', 'mestre da sanidade',
    'perseguidor de criaturas', 'especialista em armadilhas mortais', 'médium visionário'
  ]
};

// Características gerais que podem se aplicar a qualquer tipo de jogo
export const CARACTERISTICAS_GERAIS_JOGOS = [
  'experiente', 'habilidoso', 'temido', 'respeitado', 'lendário', 'famoso',
  'invicto', 'implacável', 'destemido', 'determinado', 'estratégico', 'perspicaz',
  'ágil', 'rápido', 'preciso', 'tático', 'forte', 'inteligente', 'astuto',
  'sagaz', 'veterano', 'profissional', 'especialista', 'competitivo', 'vitorioso',
  'dominante', 'superior', 'incomparável', 'formidável', 'excepcional', 'supremo',
  'mestre do jogo', 'jogador de elite', 'campeão invicto', 'prodígio dos games',
  'lenda viva', 'jogador temido', 'veterano respeitado', 'mestre tático',
  'especialista em estratégia', 'jogador de primeira linha', 'competidor feroz',
  'estrela ascendente', 'vencedor nato', 'jogador dedicado', 'membro da elite',
  'ícone dos games', 'fenômeno dos eSports', 'jogador versátil'
]; 