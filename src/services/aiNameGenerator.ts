/**
 * Serviço para geração de nomes usando OpenAI
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
  
  prompt += `. Responda apenas em formato JSON, com um array de objetos contendo 'nome', 'significado' e 'origem'. Não inclua texto adicional.`;
  
  return prompt;
}

/**
 * Fornece nomes estáticos em caso de falha na API
 */
function getFallbackNames(options: NameGenerationOptions): GeneratedName[] {
  const fallbacks: Record<string, GeneratedName[]> = {
    pets: [
      { nome: 'Luna', significado: 'Relacionado à lua', origem: 'Latim' },
      { nome: 'Thor', significado: 'Deus do trovão', origem: 'Nórdico' },
      { nome: 'Amora', significado: 'Fruta doce', origem: 'Português' },
    ],
    jogos: [
      { nome: 'Shadowblade', significado: 'Lâmina das sombras', origem: 'Fantasia' },
      { nome: 'NexusHunter', significado: 'Caçador do Nexus', origem: 'Sci-Fi' },
      { nome: 'CrystalMage', significado: 'Mago dos cristais', origem: 'RPG' },
    ],
    bebes: [
      { nome: 'Sofia', significado: 'Sabedoria', origem: 'Grego' },
      { nome: 'Miguel', significado: 'Quem é como Deus', origem: 'Hebraico' },
      { nome: 'Helena', significado: 'Tocha brilhante', origem: 'Grego' },
    ],
    aleatorios: [
      { nome: 'Serenity', significado: 'Serenidade', origem: 'Inglês' },
      { nome: 'Orion', significado: 'Caçador mitológico', origem: 'Grego' },
      { nome: 'Avalon', significado: 'Ilha paradisíaca', origem: 'Celta' },
    ]
  };
  
  return fallbacks[options.categoria] || fallbacks.aleatorios;
} 