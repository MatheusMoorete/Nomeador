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
  modo?: 'api' | 'local' | 'hibrido'; // Novo parâmetro para o modo de geração
}

export interface GeneratedName {
  nome: string;
  significado?: string;
  origem?: string;
  fonte?: 'api' | 'local'; // Indica a origem do nome
  tipo?: string; // Indica o tipo de animal (para pets)
}

export async function generateNames(options: NameGenerationOptions): Promise<GeneratedName[]> {
  // Definir o modo de operação (api, local ou híbrido)
  const modo = options.modo || 
    (typeof window !== 'undefined' && window.location.search.includes('modo=')) 
      ? window.location.search.includes('modo=local') 
        ? 'local'
        : window.location.search.includes('modo=hibrido') 
          ? 'hibrido' 
          : 'api'
      : 'api';

  // Modo local (fallback) - retorna apenas nomes locais
  if (modo === 'local' || (typeof window !== 'undefined' && window.location.search.includes('offline=true'))) {
    return getFallbackNames(options).map(nome => ({...nome, fonte: 'local'}));
  }

  try {
    // Construir o prompt baseado nas opções
    const prompt = buildPrompt(options);
    const quantidade = options.quantidade || 1;
    
    // Se for modo híbrido, solicitar menos nomes da API
    const apiQuantidade = modo === 'hibrido' ? Math.ceil(quantidade / 2) : quantidade;
    
    const response = await fetch('/api/generate-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        prompt, 
        options: { ...options, quantidade: apiQuantidade } 
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    const apiNames = data.names.map((nome: GeneratedName) => ({...nome, fonte: 'api'}));
    
    // Modo híbrido - combinar resultados da API com nomes locais
    if (modo === 'hibrido') {
      // Obter nomes locais
      const localQuantidade = Math.max(1, quantidade - apiNames.length);
      const localOptions = { ...options, quantidade: localQuantidade };
      const localNames = getFallbackNames(localOptions).map(nome => ({...nome, fonte: 'local'}));
      
      // Misturar nomes da API e locais de forma aleatória
      return shuffleArray([...apiNames, ...localNames]).slice(0, quantidade);
    }
    
    return apiNames;
  } catch (error) {
    console.error('Erro ao gerar nomes:', error);
    // Fallback para nomes estáticos em caso de erro
    return getFallbackNames(options).map(nome => ({...nome, fonte: 'local'}));
  }
}

// Função auxiliar para embaralhar array (algoritmo Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Constrói o prompt para a API baseado nas opções do usuário
 */
function buildPrompt(options: NameGenerationOptions): string {
  const { categoria, genero, origem, caracteristicas, evitar } = options;
  
  let categoriaTexto = '';
  let tipoAnimal = '';
  
  // Verificar se há alguma característica que indica tipo de animal específico
  if (categoria === 'pets' && caracteristicas && caracteristicas.length > 0) {
    const tipoCaracteristica = caracteristicas.find(c => c.toLowerCase().includes('tipo de animal:'));
    if (tipoCaracteristica) {
      // Extrair o tipo de animal da característica
      tipoAnimal = tipoCaracteristica.toLowerCase().replace('tipo de animal:', '').trim();
    }
  }
  
  switch (categoria) {
    case 'pets':
      if (tipoAnimal) {
        switch (tipoAnimal) {
          case 'cachorro':
            categoriaTexto = 'cachorro ou cão';
            break;
          case 'gato':
            categoriaTexto = 'gato ou felino';
            break;
          case 'peixe':
            categoriaTexto = 'peixe ou animal aquático';
            break;
          case 'coelho':
            categoriaTexto = 'coelho ou leporídeo';
            break;
          case 'roedor':
            categoriaTexto = 'hamster, ratinho, porquinho-da-índia ou roedor';
            break;
          case 'ave':
            categoriaTexto = 'pássaro, papagaio, calopsita, canário ou ave';
            break;
          case 'reptil':
            categoriaTexto = 'lagarto, iguana, cobra, tartaruga ou réptil';
            break;
          case 'exotico':
            categoriaTexto = 'animal exótico como furão, ouriço, tamanduá ou outro pet não convencional';
            break;
          default:
            categoriaTexto = tipoAnimal;
        }
      } else {
        categoriaTexto = 'animal de estimação';
      }
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
  
  // Filtrando características para remover o tipo de animal se já foi usado
  const caracteristicasFiltradas = caracteristicas ? 
    caracteristicas.filter(c => !c.toLowerCase().includes('tipo de animal:')) : 
    [];
  
  if (caracteristicasFiltradas.length > 0) {
    prompt += ` que transmita as seguintes características: ${caracteristicasFiltradas.join(', ')}`;
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
  let filteredNames: GeneratedName[] = [];
  
  // Para bebês, usar os nomes de acordo com o gênero
  if (options.categoria === 'bebes') {
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
    // Use type assertion para evitar erro de tipagem
    const categoria = options.categoria as keyof typeof FALLBACK_NAMES;
    filteredNames = FALLBACK_NAMES[categoria] || FALLBACK_NAMES.aleatorios;
    
    // Se for pet e tiver característica de tipo de animal, filtrar por tipo
    if (options.categoria === 'pets' && options.caracteristicas && options.caracteristicas.length > 0) {
      const tipoCaracteristica = options.caracteristicas.find(c => 
        c.toLowerCase().includes('tipo de animal:')
      );
      
      if (tipoCaracteristica) {
        const tipoAnimal = tipoCaracteristica.toLowerCase()
          .replace('tipo de animal:', '')
          .trim();
        
        // Mapeamento para tipos de animais
        const tipoMap: Record<string, string> = {
          'cachorro': 'Cachorro',
          'gato': 'Gato',
          'peixe': 'Peixe',
          'coelho': 'Coelho',
          'roedor': 'Roedor',
          'ave': 'Ave',
          'reptil': 'Réptil',
          'exotico': 'Exótico'
        };
        
        const tipoFiltro = tipoMap[tipoAnimal] || (
          tipoAnimal.charAt(0).toUpperCase() + tipoAnimal.slice(1)
        );
        
        // Filtrar nomes pelo tipo de animal
        filteredNames = filteredNames.filter(nome => 
          nome.tipo === tipoFiltro
        );
        
        // Se não encontrar nenhum nome após o filtro, voltar para todos
        if (filteredNames.length === 0) {
          const categoria = options.categoria as keyof typeof FALLBACK_NAMES;
          filteredNames = FALLBACK_NAMES[categoria] || FALLBACK_NAMES.aleatorios;
        }
      }
    }
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
    // Cães
    { nome: 'Luna', significado: 'Relacionado à lua', origem: 'Latim', tipo: 'Cachorro' },
    { nome: 'Thor', significado: 'Deus do trovão', origem: 'Nórdico', tipo: 'Cachorro' },
    { nome: 'Amora', significado: 'Fruta doce', origem: 'Português', tipo: 'Cachorro' },
    { nome: 'Max', significado: 'O maior, o melhor', origem: 'Latim', tipo: 'Cachorro' },
    { nome: 'Bela', significado: 'Bonita', origem: 'Italiano', tipo: 'Cachorro' },
    { nome: 'Rex', significado: 'Rei', origem: 'Latim', tipo: 'Cachorro' },
    { nome: 'Mel', significado: 'Doce como mel', origem: 'Português', tipo: 'Cachorro' },
    { nome: 'Tobby', significado: 'Deus é bom', origem: 'Hebraico', tipo: 'Cachorro' },
    
    // Gatos
    { nome: 'Oliver', significado: 'Oliveira', origem: 'Francês', tipo: 'Gato' },
    { nome: 'Mia', significado: 'Minha', origem: 'Italiano', tipo: 'Gato' },
    { nome: 'Simba', significado: 'Leão', origem: 'Suaíli', tipo: 'Gato' },
    { nome: 'Nala', significado: 'Presente', origem: 'Africano', tipo: 'Gato' },
    { nome: 'Felix', significado: 'Feliz, sortudo', origem: 'Latim', tipo: 'Gato' },
    { nome: 'Mimi', significado: 'Variação de Miriam', origem: 'Hebraico', tipo: 'Gato' },
    { nome: 'Garfield', significado: 'Campo da lança', origem: 'Inglês', tipo: 'Gato' },
    { nome: 'Frajola', significado: 'Manchado', origem: 'Português', tipo: 'Gato' },
    
    // Peixes
    { nome: 'Nemo', significado: 'Ninguém', origem: 'Latim', tipo: 'Peixe' },
    { nome: 'Dory', significado: 'Dourada', origem: 'Grego', tipo: 'Peixe' },
    { nome: 'Bolha', significado: 'Pequena esfera de ar', origem: 'Português', tipo: 'Peixe' },
    { nome: 'Flash', significado: 'Rápido como um relâmpago', origem: 'Inglês', tipo: 'Peixe' },
    { nome: 'Coral', significado: 'Estrutura marinha colorida', origem: 'Latim', tipo: 'Peixe' },
    { nome: 'Goldie', significado: 'Dourado', origem: 'Inglês', tipo: 'Peixe' },
    { nome: 'Finn', significado: 'Barbatana', origem: 'Inglês', tipo: 'Peixe' },
    { nome: 'Marlin', significado: 'Peixe marinho', origem: 'Inglês', tipo: 'Peixe' },
    
    // Coelhos
    { nome: 'Pernalonga', significado: 'Que tem pernas longas', origem: 'Português', tipo: 'Coelho' },
    { nome: 'Fofinho', significado: 'Macio, peludo', origem: 'Português', tipo: 'Coelho' },
    { nome: 'Thumper', significado: 'Batedor, que bate com as patas', origem: 'Inglês', tipo: 'Coelho' },
    { nome: 'Algodão', significado: 'Planta macia e branca', origem: 'Árabe', tipo: 'Coelho' },
    { nome: 'Cenoura', significado: 'Vegetal alaranjado', origem: 'Português', tipo: 'Coelho' },
    { nome: 'Floco', significado: 'Pequenos pedaços', origem: 'Português', tipo: 'Coelho' },
    { nome: 'Tambor', significado: 'Instrumento de percussão', origem: 'Persa', tipo: 'Coelho' },
    { nome: 'Felpudo', significado: 'Peludo, cheio de pelos', origem: 'Português', tipo: 'Coelho' },
    
    // Roedores (Hamsters, etc)
    { nome: 'Pipoca', significado: 'Milho estourado', origem: 'Tupi', tipo: 'Roedor' },
    { nome: 'Bolinha', significado: 'Pequena bola', origem: 'Português', tipo: 'Roedor' },
    { nome: 'Mickey', significado: 'Quem é como Deus', origem: 'Hebraico', tipo: 'Roedor' },
    { nome: 'Minnie', significado: 'Rebelde', origem: 'Alemão', tipo: 'Roedor' },
    { nome: 'Stuart', significado: 'Guardião', origem: 'Inglês', tipo: 'Roedor' },
    { nome: 'Amendoim', significado: 'Noz subterrânea', origem: 'Português', tipo: 'Roedor' },
    { nome: 'Cookie', significado: 'Biscoito', origem: 'Inglês', tipo: 'Roedor' },
    { nome: 'Pitufo', significado: 'Pequeno ser azul', origem: 'Belga', tipo: 'Roedor' },
    
    // Aves
    { nome: 'Blu', significado: 'Azul', origem: 'Inglês', tipo: 'Ave' },
    { nome: 'Louro', significado: 'Dourado', origem: 'Português', tipo: 'Ave' },
    { nome: 'Zazu', significado: 'Movimento', origem: 'Africano', tipo: 'Ave' },
    { nome: 'Sky', significado: 'Céu', origem: 'Inglês', tipo: 'Ave' },
    { nome: 'Jade', significado: 'Pedra preciosa verde', origem: 'Espanhol', tipo: 'Ave' },
    { nome: 'Petúnia', significado: 'Flor', origem: 'Latim', tipo: 'Ave' },
    { nome: 'Kiwi', significado: 'Ave não voadora', origem: 'Maori', tipo: 'Ave' },
    { nome: 'Esmeralda', significado: 'Pedra preciosa verde', origem: 'Grego', tipo: 'Ave' },
    
    // Répteis
    { nome: 'Draco', significado: 'Dragão', origem: 'Latim', tipo: 'Réptil' },
    { nome: 'Spike', significado: 'Espinho', origem: 'Inglês', tipo: 'Réptil' },
    { nome: 'Yoshi', significado: 'Boa sorte', origem: 'Japonês', tipo: 'Réptil' },
    { nome: 'Rango', significado: 'Comida', origem: 'Espanhol', tipo: 'Réptil' },
    { nome: 'Crush', significado: 'Paixão', origem: 'Inglês', tipo: 'Réptil' },
    { nome: 'Ziggy', significado: 'Vitória', origem: 'Alemão', tipo: 'Réptil' },
    { nome: 'Komodo', significado: 'Ilha da Indonésia', origem: 'Indonésio', tipo: 'Réptil' },
    { nome: 'Mushu', significado: 'Dragão lendário', origem: 'Chinês', tipo: 'Réptil' },
    
    // Exóticos
    { nome: 'Django', significado: 'Eu desperto', origem: 'Romani', tipo: 'Exótico' },
    { nome: 'Yoda', significado: 'Mestre guerreiro', origem: 'Ficcional', tipo: 'Exótico' },
    { nome: 'Pandora', significado: 'Todos os dons', origem: 'Grego', tipo: 'Exótico' },
    { nome: 'Aurora', significado: 'Amanhecer', origem: 'Latim', tipo: 'Exótico' },
    { nome: 'Nebulosa', significado: 'Nuvem estelar', origem: 'Latim', tipo: 'Exótico' },
    { nome: 'Onyx', significado: 'Pedra preciosa negra', origem: 'Grego', tipo: 'Exótico' },
    { nome: 'Cosmos', significado: 'Universo', origem: 'Grego', tipo: 'Exótico' },
    { nome: 'Quimera', significado: 'Criatura mitológica', origem: 'Grego', tipo: 'Exótico' }
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