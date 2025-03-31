/**
 * Serviço para geração de nomes usando Hugging Face
 */

export interface NameGenerationOptions {
  categoria: 'pets' | 'jogos' | 'bebes' | 'aleatorios';
  genero?: 'masculino' | 'feminino' | 'neutro';
  origem?: 'brasileiro' | 'internacional' | 'classico';
  quantidade?: number;
  caracteristicas?: string[];
  evitar?: string[];
}

export interface GeneratedName {
  nome: string;
  significado?: string;
  origem?: string;
}

export async function generateNames(options: NameGenerationOptions): Promise<GeneratedName[]> {
  try {
    // Verificar se devemos pular a chamada à API (modo offline)
    if (typeof window !== 'undefined' && window.location.search.includes('offline=true')) {
      return getFallbackNames(options);
    }
    
    // Construir o prompt baseado nas opções
    const prompt = buildPrompt(options);
    
    const response = await fetch('/api/generate-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, options }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data.names;
  } catch (error) {
    console.error('Erro ao gerar nomes:', error);
    // Fallback para nomes estáticos em caso de erro
    return getFallbackNames(options);
  }
}

/**
 * Constrói o prompt para a API baseado nas opções do usuário
 */
function buildPrompt(options: NameGenerationOptions): string {
  const { categoria, genero, origem, caracteristicas, evitar } = options;
  
  let categoriaTexto = '';
  switch (categoria) {
    case 'pets':
      categoriaTexto = 'animal de estimação';
      break;
    case 'jogos':
      categoriaTexto = 'personagem de jogo ou usuário de jogo';
      break;
    case 'bebes':
      categoriaTexto = 'bebê';
      break;
    case 'aleatorios':
      categoriaTexto = 'uso geral';
      break;
  }

  let prompt = `Gere ${options.quantidade || 1} nomes criativos e originais para ${categoriaTexto}`;
  
  if (genero) {
    prompt += ` do gênero ${genero}`;
  }
  
  if (origem) {
    prompt += ` com origem ${origem}`;
  }
  
  if (caracteristicas && caracteristicas.length > 0) {
    prompt += ` que transmita as seguintes características: ${caracteristicas.join(', ')}`;
  }
  
  if (evitar && evitar.length > 0) {
    prompt += `. Evite nomes que: ${evitar.join(', ')}`;
  }
  
  prompt += `. Liste cada nome em uma linha separada, no formato: Nome - Significado - Origem.`;
  
  return prompt;
}

/**
 * Fornece nomes estáticos em caso de falha na API ou no modo offline
 */
export function getFallbackNames(options: NameGenerationOptions): GeneratedName[] {
  // Filtrar por gênero se for bebês
  let filteredNames: GeneratedName[] = [];
  
  // Para bebês, usar os nomes de acordo com o gênero
  if (options.categoria === 'bebes' && options.genero) {
    if (options.genero === 'masculino') {
      filteredNames = FALLBACK_NAMES.bebes_masculino;
    } else if (options.genero === 'feminino') {
      filteredNames = FALLBACK_NAMES.bebes_feminino;
    } else {
      // Para neutro, misturar 
      filteredNames = [...FALLBACK_NAMES.bebes_masculino, ...FALLBACK_NAMES.bebes_feminino];
    }
  } else {
    // Para outras categorias (pets, jogos, aleatorios)
    filteredNames = FALLBACK_NAMES[options.categoria] || FALLBACK_NAMES.aleatorios;
  }
  
  // Selecionar aleatoriamente um número de nomes baseado na quantidade solicitada
  const quantidade = options.quantidade || 1;
  const result: GeneratedName[] = [];
  
  // Não repetir nomes
  const usedIndexes = new Set<number>();
  
  for (let i = 0; i < Math.min(quantidade, filteredNames.length); i++) {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * filteredNames.length);
    } while (usedIndexes.has(randomIndex) && usedIndexes.size < filteredNames.length);
    
    usedIndexes.add(randomIndex);
    result.push(filteredNames[randomIndex]);
  }
  
  return result;
}

// Biblioteca expandida de nomes de fallback
const FALLBACK_NAMES = {
  pets: [
    { nome: 'Luna', significado: 'Relacionado à lua', origem: 'Latim' },
    { nome: 'Thor', significado: 'Deus do trovão', origem: 'Nórdico' },
    { nome: 'Amora', significado: 'Fruta doce', origem: 'Português' },
    { nome: 'Max', significado: 'O maior, o melhor', origem: 'Latim' },
    { nome: 'Bela', significado: 'Bonita', origem: 'Italiano' },
    { nome: 'Simba', significado: 'Leão', origem: 'Suaíli' },
    { nome: 'Nala', significado: 'Presente', origem: 'Africano' },
    { nome: 'Rex', significado: 'Rei', origem: 'Latim' },
    { nome: 'Bolinha', significado: 'Pequena bola', origem: 'Português' },
    { nome: 'Nina', significado: 'Graciosa', origem: 'Espanhol' },
    { nome: 'Kiki', significado: 'Duplo reforço', origem: 'Francês' },
    { nome: 'Rocky', significado: 'Rocha, forte', origem: 'Inglês' },
    { nome: 'Café', significado: 'Grão da planta coffea', origem: 'Português' },
    { nome: 'Pretinha', significado: 'De cor preta', origem: 'Português' },
    { nome: 'Cookie', significado: 'Biscoito', origem: 'Inglês' },
    { nome: 'Mel', significado: 'Doce como mel', origem: 'Português' },
    { nome: 'Stitch', significado: 'Ponto de costura', origem: 'Inglês' },
    { nome: 'Tobby', significado: 'Deus é bom', origem: 'Hebraico' },
    { nome: 'Pantera', significado: 'Felino ágil', origem: 'Grego' },
    { nome: 'Belinha', significado: 'Pequena bela', origem: 'Português' }
  ],
  
  jogos: [
    { nome: 'Shadowblade', significado: 'Lâmina das sombras', origem: 'Fantasia' },
    { nome: 'NexusHunter', significado: 'Caçador do Nexus', origem: 'Sci-Fi' },
    { nome: 'CrystalMage', significado: 'Mago dos cristais', origem: 'RPG' },
    { nome: 'DarkFury', significado: 'Fúria sombria', origem: 'Fantasia' },
    { nome: 'StarLord', significado: 'Senhor das estrelas', origem: 'Sci-Fi' },
    { nome: 'IronFist', significado: 'Punho de ferro', origem: 'Comics' },
    { nome: 'PhantomRider', significado: 'Cavaleiro fantasma', origem: 'Horror' },
    { nome: 'ToxicSniper', significado: 'Atirador tóxico', origem: 'FPS' },
    { nome: 'VoidWalker', significado: 'Andarilho do vazio', origem: 'RPG' },
    { nome: 'ElectroNinja', significado: 'Ninja elétrico', origem: 'Action' },
    { nome: 'FrostBite', significado: 'Mordida gelada', origem: 'RPG' },
    { nome: 'BladeDancer', significado: 'Dançarino de lâminas', origem: 'Fantasy' },
    { nome: 'QuantumPilot', significado: 'Piloto quântico', origem: 'Sci-Fi' },
    { nome: 'ShadowArcher', significado: 'Arqueiro das sombras', origem: 'Medieval' },
    { nome: 'MysticRogue', significado: 'Ladino místico', origem: 'D&D' },
    { nome: 'DeathWhisper', significado: 'Sussurro da morte', origem: 'Horror' },
    { nome: 'NeonHawk', significado: 'Falcão de neon', origem: 'Cyberpunk' },
    { nome: 'BloodMoon', significado: 'Lua de sangue', origem: 'Horror' },
    { nome: 'TitanFist', significado: 'Punho de titã', origem: 'MOBA' },
    { nome: 'CyberSamurai', significado: 'Samurai cibernético', origem: 'Sci-Fi' }
  ],
  
  bebes_masculino: [
    { nome: 'Miguel', significado: 'Quem é como Deus', origem: 'Hebraico' },
    { nome: 'Arthur', significado: 'Urso', origem: 'Celta' },
    { nome: 'Heitor', significado: 'O que possui', origem: 'Grego' },
    { nome: 'Davi', significado: 'Amado', origem: 'Hebraico' },
    { nome: 'Bernardo', significado: 'Forte como urso', origem: 'Germânico' },
    { nome: 'Gabriel', significado: 'Homem de Deus', origem: 'Hebraico' },
    { nome: 'Samuel', significado: 'Ouvido por Deus', origem: 'Hebraico' },
    { nome: 'Matheus', significado: 'Dádiva de Deus', origem: 'Hebraico' },
    { nome: 'Lucas', significado: 'Luminoso', origem: 'Grego' },
    { nome: 'Noah', significado: 'Descanso, paz', origem: 'Hebraico' },
    { nome: 'Theo', significado: 'Deus', origem: 'Grego' },
    { nome: 'Benjamin', significado: 'Filho da direita', origem: 'Hebraico' },
    { nome: 'Isaac', significado: 'Riso', origem: 'Hebraico' },
    { nome: 'Benício', significado: 'Abençoado', origem: 'Latim' },
    { nome: 'Daniel', significado: 'Deus é meu juiz', origem: 'Hebraico' },
    { nome: 'Anthony', significado: 'Digno de admiração', origem: 'Latim' },
    { nome: 'Lorenzo', significado: 'Coroado de louros', origem: 'Latim' },
    { nome: 'Ravi', significado: 'Sol', origem: 'Sânscrito' },
    { nome: 'Pedro', significado: 'Pedra', origem: 'Grego' },
    { nome: 'Oliver', significado: 'Árvore de oliveira', origem: 'Latim' }
  ],
  
  bebes_feminino: [
    { nome: 'Sofia', significado: 'Sabedoria', origem: 'Grego' },
    { nome: 'Helena', significado: 'Tocha brilhante', origem: 'Grego' },
    { nome: 'Valentina', significado: 'Valente, forte', origem: 'Latim' },
    { nome: 'Alice', significado: 'De nascimento nobre', origem: 'Germânico' },
    { nome: 'Laura', significado: 'Loureiro (símbolo de vitória)', origem: 'Latim' },
    { nome: 'Manuela', significado: 'Deus está conosco', origem: 'Hebraico' },
    { nome: 'Maria', significado: 'Amada, senhora soberana', origem: 'Hebraico' },
    { nome: 'Isabella', significado: 'Consagrada a Deus', origem: 'Hebraico' },
    { nome: 'Júlia', significado: 'Jovem', origem: 'Latim' },
    { nome: 'Heloísa', significado: 'Guerreira famosa', origem: 'Germânico' },
    { nome: 'Cecília', significado: 'Cega', origem: 'Latim' },
    { nome: 'Aurora', significado: 'Amanhecer', origem: 'Latim' },
    { nome: 'Liz', significado: 'Lírio', origem: 'Hebraico' },
    { nome: 'Olívia', significado: 'Oliveira', origem: 'Latim' },
    { nome: 'Eloa', significado: 'Deus é eterno', origem: 'Hebraico' },
    { nome: 'Maya', significado: 'Ilusão', origem: 'Sânscrito' },
    { nome: 'Beatriz', significado: 'Aquela que traz felicidade', origem: 'Latim' },
    { nome: 'Ana', significado: 'Cheia de graça', origem: 'Hebraico' },
    { nome: 'Lara', significado: 'Protetora', origem: 'Latim' },
    { nome: 'Antonella', significado: 'Digna de admiração', origem: 'Latim' }
  ],
  
  aleatorios: [
    { nome: 'Serenity', significado: 'Serenidade', origem: 'Inglês' },
    { nome: 'Orion', significado: 'Caçador mitológico', origem: 'Grego' },
    { nome: 'Avalon', significado: 'Ilha paradisíaca', origem: 'Celta' },
    { nome: 'Phoenix', significado: 'Ave que renasce das cinzas', origem: 'Grego' },
    { nome: 'Nova', significado: 'Nova, estrela brilhante', origem: 'Latim' },
    { nome: 'Atlas', significado: 'Suportar', origem: 'Grego' },
    { nome: 'Celeste', significado: 'Celestial, do céu', origem: 'Latim' },
    { nome: 'Sirius', significado: 'Brilhante, a estrela do cão', origem: 'Grego' },
    { nome: 'Aurora', significado: 'Amanhecer', origem: 'Latim' },
    { nome: 'Zephyr', significado: 'Vento oeste', origem: 'Grego' },
    { nome: 'Solaris', significado: 'Do sol', origem: 'Latim' },
    { nome: 'Nebula', significado: 'Nuvem', origem: 'Latim' },
    { nome: 'Tempest', significado: 'Tempestade', origem: 'Inglês' },
    { nome: 'Zenith', significado: 'Ponto mais alto', origem: 'Árabe' },
    { nome: 'Andromeda', significado: 'Governante dos homens', origem: 'Grego' },
    { nome: 'Elysium', significado: 'Lugar de felicidade', origem: 'Grego' },
    { nome: 'Oceanus', significado: 'Oceano', origem: 'Grego' },
    { nome: 'Lumina', significado: 'Luz', origem: 'Latim' },
    { nome: 'Astral', significado: 'Relacionado às estrelas', origem: 'Grego' },
    { nome: 'Terra', significado: 'Terra, solo', origem: 'Latim' }
  ]
}; 