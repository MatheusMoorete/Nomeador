import { NextRequest, NextResponse } from 'next/server';
import { getFallbackNames, GeneratedName } from '@/services/aiNameGenerator';

export async function POST(request: NextRequest) {
  try {
    const { prompt, options } = await request.json();
    
    // Verificação básica
    if (!prompt || !options) {
      return NextResponse.json(
        { error: 'Parâmetros inválidos' },
        { status: 400 }
      );
    }

    // Verificar se devemos usar os nomes locais diretamente
    const defaultMode = process.env.DEFAULT_MODE || 'api';
    const requestMode = options.modo || defaultMode;
    
    if (requestMode === 'local') {
      return NextResponse.json({
        names: getFallbackNames(options).map((nome: GeneratedName) => ({...nome, fonte: 'local'})),
        source: 'local'
      });
    }

    // Obtenha a chave da API do ambiente
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const apiUrl = process.env.HUGGINGFACE_API_URL || 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';
    
    if (!apiKey) {
      console.error('API key não configurada no ambiente');
      return NextResponse.json(
        { error: 'Configuração da API incompleta' },
        { status: 500 }
      );
    }

    // Chamada para a API da Hugging Face
    try {
      const huggingFaceResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          inputs: formatPrompt(prompt),
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true
          }
        })
      });

      if (!huggingFaceResponse.ok) {
        throw new Error(`Erro na API: ${huggingFaceResponse.status}`);
      }

      const data = await huggingFaceResponse.json();
      
      // Processando a resposta da Hugging Face
      try {
        // Extrair o texto da resposta
        const responseText = Array.isArray(data) 
          ? data[0]?.generated_text || '' 
          : data.generated_text || '';
        
        // Extrair os nomes da resposta de texto
        const results = processHuggingFaceResponse(responseText)
          .map((nome: GeneratedName) => ({...nome, fonte: 'api'}));
        
        return NextResponse.json({
          names: results,
          source: 'huggingface'
        });
      } catch (parseError) {
        console.error('Erro ao processar resposta:', parseError);
        throw parseError;
      }
    } catch (apiError) {
      console.error('Erro na chamada à API:', apiError);
      
      // Fallback para nomes estáticos em caso de erro
      return NextResponse.json({
        names: getFallbackNames(options).map((nome: GeneratedName) => ({...nome, fonte: 'local'})),
        source: 'fallback',
        error: 'Erro na API externa, usando nomes locais'
      });
    }
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * Formata o prompt para o formato que o Mistral espera
 */
function formatPrompt(prompt: string): string {
  return `<s>[INST] Você é um especialista em criar nomes criativos e originais.
  
${prompt}

Por favor, liste cada nome em uma linha separada, no formato:
Nome - Significado - Origem
[/INST]</s>`;
}

/**
 * Processa a resposta do Hugging Face para extrair nomes, significados e origens
 */
function processHuggingFaceResponse(text: string): GeneratedName[] {
  // Remover o prompt da resposta (se estiver presente)
  const promptEnd = text.indexOf('[/INST]');
  const cleanedText = promptEnd > -1 ? text.substring(promptEnd + 8) : text;
  
  // Dividir por linhas e filtrar linhas vazias ou muito curtas
  const lines = cleanedText.split('\n')
    .filter(line => line.trim().length > 3 && line.includes('-'));
  
  // Processar cada linha para extrair nomes
  return lines.map(line => {
    // Limpar prefixos numéricos e caracteres especiais que podem aparecer
    line = line.replace(/^[\s\d\W]*?(\w)/i, '$1');
    
    const parts = line.split('-').map(part => part.trim());
    
    // Limpar novamente o nome para garantir que não tenha prefixos indesejados
    let nome = parts[0] || 'Nome não identificado';
    nome = nome.replace(/^[\/\s>]*\d+[\.\s]*/g, '').trim();
    
    return {
      nome: nome,
      significado: parts[1] || 'Significado desconhecido',
      origem: parts[2] || 'Origem desconhecida'
    };
  }).filter(name => name.nome !== 'Nome não identificado');
} 