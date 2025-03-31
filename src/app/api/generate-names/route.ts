import { NextRequest, NextResponse } from 'next/server';
import { NameGenerationOptions } from '@/services/aiNameGenerator';

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

    // Obtenha a chave da API do ambiente
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    
    if (!apiKey) {
      console.error("API key não configurada no ambiente");
      return NextResponse.json(
        { error: 'Configuração da API incompleta' },
        { status: 500 }
      );
    }

    // Chamada para a API OpenAI
    const openAIResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em criar nomes criativos, originais e adequados para várias finalidades. Responda apenas em formato JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error("Erro na chamada OpenAI:", errorData);
      return NextResponse.json(
        { error: 'Erro na API externa', details: errorData },
        { status: 502 }
      );
    }

    const data = await openAIResponse.json();
    
    // Processando a resposta da OpenAI
    try {
      // Extrair o texto da resposta
      const responseText = data.choices[0]?.message?.content || '';
      
      // Tentar extrair o JSON da resposta
      const jsonMatch = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const jsonContent = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ names: Array.isArray(jsonContent) ? jsonContent : [jsonContent] });
      } else {
        // Fallback para processar texto sem formato JSON
        const processedNames = processTextResponse(responseText, options);
        return NextResponse.json({ names: processedNames });
      }
    } catch (parseError) {
      console.error("Erro ao processar resposta:", parseError);
      return NextResponse.json(
        { error: 'Falha ao processar resposta', rawResponse: data.choices[0]?.message?.content },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * Processa texto não estruturado e extrai nomes
 */
function processTextResponse(text: string, options: NameGenerationOptions) {
  // Processa texto não formatado para tentar extrair nomes
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  return lines.map(line => {
    const nameParts = line.split('-').map(part => part.trim());
    return {
      nome: nameParts[0] || 'Nome não identificado',
      significado: nameParts[1] || 'Significado desconhecido',
      origem: nameParts[2] || 'Origem desconhecida'
    };
  });
} 