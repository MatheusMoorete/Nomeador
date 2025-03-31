'use client';

import { useState, useCallback } from 'react';
import { GeneratedName, NameGenerationOptions, generateNames } from '@/services/aiNameGenerator';
import NomeDisplay from './NomeDisplay';
import { CARACTERISTICAS_PETS, CARACTERISTICAS_GERAIS_PETS } from '@/data/caracteristicasPets';

interface AINameGeneratorProps {
  categoria: 'pets' | 'jogos' | 'bebes' | 'aleatorios';
  generoInicial?: 'masculino' | 'feminino' | 'neutro';
  origemInicial?: 'brasileiro' | 'internacional' | 'classico';
}

export default function AINameGenerator({ 
  categoria, 
  generoInicial = 'neutro',
  origemInicial = 'brasileiro'
}: AINameGeneratorProps) {
  const [options, setOptions] = useState<NameGenerationOptions>({
    categoria,
    genero: generoInicial,
    origem: origemInicial,
    quantidade: 1,
    caracteristicas: [],
    modo: 'hibrido', // Modo fixo: híbrido
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [nomesGerados, setNomesGerados] = useState<GeneratedName[]>([]);
  const [novoNomeIndex, setNovoNomeIndex] = useState(0);
  const [inputCaract, setInputCaract] = useState('');
  const [error, setError] = useState('');
  const [tipoPet, setTipoPet] = useState<string>('qualquer');

  const gerarNomesIA = useCallback(async () => {
    try {
      setIsGenerating(true);
      setError('');
      
      // Gerar vários nomes de uma vez para economizar chamadas à API
      const quantidade = 5;
      
      // Adicionar o tipo de pet às características se estiver selecionado
      let newOptions = { ...options, quantidade };
      
      if (categoria === 'pets' && tipoPet !== 'qualquer') {
        // Adicionar o tipo de pet como uma característica
        newOptions = {
          ...newOptions,
          caracteristicas: [
            ...(newOptions.caracteristicas || []),
            `tipo de animal: ${tipoPet}`
          ]
        };
      }
      
      const results = await generateNames(newOptions);
      setNomesGerados(results);
      setNovoNomeIndex(0);
    } catch (err) {
      console.error('Erro ao gerar nomes:', err);
      setError('Não foi possível gerar nomes. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  }, [options, categoria, tipoPet]);

  const mostrarProximoNome = useCallback(() => {
    if (novoNomeIndex < nomesGerados.length - 1) {
      setNovoNomeIndex(novoNomeIndex + 1);
    } else {
      // Se chegou ao fim da lista, gera mais nomes
      gerarNomesIA();
    }
  }, [novoNomeIndex, nomesGerados.length, gerarNomesIA]);

  const adicionarCaracteristica = useCallback(() => {
    if (inputCaract.trim() !== '') {
      setOptions(prev => ({
        ...prev,
        caracteristicas: [...(prev.caracteristicas || []), inputCaract.trim()]
      }));
      setInputCaract('');
    }
  }, [inputCaract]);

  const removerCaracteristica = useCallback((index: number) => {
    setOptions(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas?.filter((_, i) => i !== index)
    }));
  }, []);

  // Função para obter uma característica aleatória para o pet gerado
  const obterCaracteristicaAleatoria = useCallback((tipo: string): string => {
    // Se não é pet, retorna vazio
    if (categoria !== 'pets') return '';
    
    // Obter uma lista de características específicas para o tipo de animal
    let tipoEfetivo = tipo || tipoPet;
    if (tipoEfetivo === 'qualquer') {
      // Escolher um tipo aleatório se for qualquer
      const tipos = ['cachorro', 'gato', 'peixe', 'coelho', 'roedor', 'ave', 'reptil', 'exotico'];
      tipoEfetivo = tipos[Math.floor(Math.random() * tipos.length)];
    }
    
    const caracteristicasEspecificas = CARACTERISTICAS_PETS[tipoEfetivo] || [];
    
    // Combinar com características gerais
    const todasCaracteristicas = [...caracteristicasEspecificas, ...CARACTERISTICAS_GERAIS_PETS];
    
    // Selecionar uma característica aleatória
    const indiceAleatorio = Math.floor(Math.random() * todasCaracteristicas.length);
    return todasCaracteristicas[indiceAleatorio];
  }, [categoria, tipoPet]);
  
  // Função para formatar a descrição do pet
  const getDescricaoPersonalizada = useCallback((nome: string, tipo?: string) => {
    if (categoria !== 'pets') return '';
    
    const caracteristica = obterCaracteristicaAleatoria(tipo?.toLowerCase() || '');
    if (!caracteristica) return '';
    
    // Lista de templates de frases para tornar a descrição mais personalizada
    const templates = [
      `Geralmente, {nome} são {caracteristica}.`,
      `{nome} costumam ser {caracteristica}.`,
      `Pets como {nome} são conhecidos por serem {caracteristica}.`,
      `{nome} tem a reputação de ser {caracteristica}.`,
      `Os {nome} do mundo são famosos por serem {caracteristica}.`,
      `Todo mundo sabe que {nome} adoram ser {caracteristica}.`,
      `É típico de {nome} serem {caracteristica}.`,
      `A personalidade de {nome} é {caracteristica}.`,
      `Quem conhece {nome} sabe que são {caracteristica}.`,
      `{nome} frequentemente demonstram ser {caracteristica}.`
    ];
    
    // Escolher um template aleatório
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Preencher o template com o nome e a característica
    return template
      .replace('{nome}', nome)
      .replace('{caracteristica}', caracteristica);
  }, [categoria, obterCaracteristicaAleatoria]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Gerador de Nomes Inteligente
      </h3>

      {/* Seletor de tipo de pet (apenas para categoria pets) */}
      {categoria === 'pets' && (
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Tipo de Animal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'qualquer' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('qualquer')}
            >
              Qualquer
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'cachorro' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('cachorro')}
            >
              Cachorro
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'gato' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('gato')}
            >
              Gato
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'peixe' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('peixe')}
            >
              Peixe
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'coelho' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('coelho')}
            >
              Coelho
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'roedor' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('roedor')}
            >
              Hamster/Roedor
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'ave' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('ave')}
            >
              Ave
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'reptil' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('reptil')}
            >
              Réptil
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                tipoPet === 'exotico' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setTipoPet('exotico')}
            >
              Exótico
            </button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Gênero
        </label>
        <div className="flex gap-3">
          <button 
            className={`flex-1 px-3 py-2 rounded-lg text-sm ${
              options.genero === 'masculino' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setOptions({...options, genero: 'masculino'})}
          >
            Masculino
          </button>
          <button 
            className={`flex-1 px-3 py-2 rounded-lg text-sm ${
              options.genero === 'feminino' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setOptions({...options, genero: 'feminino'})}
          >
            Feminino
          </button>
          <button 
            className={`flex-1 px-3 py-2 rounded-lg text-sm ${
              options.genero === 'neutro' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setOptions({...options, genero: 'neutro'})}
          >
            Neutro
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Origem
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button 
            className={`px-3 py-2 rounded-lg text-sm ${
              options.origem === 'brasileiro' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setOptions({...options, origem: 'brasileiro'})}
          >
            Brasileiro
          </button>
          <button 
            className={`px-3 py-2 rounded-lg text-sm ${
              options.origem === 'internacional' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setOptions({...options, origem: 'internacional'})}
          >
            Internacional
          </button>
          <button 
            className={`px-3 py-2 rounded-lg text-sm ${
              options.origem === 'classico' 
                ? 'bg-amber-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setOptions({...options, origem: 'classico'})}
          >
            Clássico
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Características desejadas
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={inputCaract}
            onChange={(e) => setInputCaract(e.target.value)}
            className="flex-grow px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="Ex: forte, elegante, divertido..."
            onKeyPress={(e) => e.key === 'Enter' && adicionarCaracteristica()}
          />
          <button
            onClick={adicionarCaracteristica}
            className="px-3 py-2 rounded-lg text-sm bg-blue-500 text-white"
          >
            Adicionar
          </button>
        </div>
        {options.caracteristicas && options.caracteristicas.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {options.caracteristicas.map((caract, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {caract}
                <button 
                  onClick={() => removerCaracteristica(index)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={gerarNomesIA}
        disabled={isGenerating}
        className={`w-full py-3 px-4 font-medium rounded-lg transition-colors ${
          isGenerating
            ? 'bg-gray-400 text-gray-100 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {isGenerating ? 'Gerando...' : 'Gerar Nome'}
      </button>

      {error && (
        <div className="mt-3 text-red-500 text-sm">
          {error}
        </div>
      )}

      {nomesGerados.length > 0 && novoNomeIndex < nomesGerados.length && (
        <div className="mt-6">
          <NomeDisplay 
            nome={nomesGerados[novoNomeIndex].nome} 
            caracteristica={categoria === 'pets' 
              ? getDescricaoPersonalizada(nomesGerados[novoNomeIndex].nome, nomesGerados[novoNomeIndex].tipo) 
              : undefined
            }
            onGerarNovo={mostrarProximoNome}
            corDestaque="text-purple-500 dark:text-purple-400" 
            mostrarAnuncio={false}
            categoria={categoria}
            textoBotaoGerar="Próximo nome"
          />
          
          <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Significado:</span> {nomesGerados[novoNomeIndex].significado || 'Não disponível'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              <span className="font-semibold">Origem:</span> {nomesGerados[novoNomeIndex].origem || 'Não disponível'}
            </p>
            
            {/* Exibir o tipo do animal se estiver na categoria pets e tiver a propriedade tipo */}
            {categoria === 'pets' && nomesGerados[novoNomeIndex].tipo && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                <span className="font-semibold">Tipo de animal:</span> {nomesGerados[novoNomeIndex].tipo}
              </p>
            )}
            
            {/* Exibir a informação sobre o tipoPet selecionado */}
            {categoria === 'pets' && tipoPet !== 'qualquer' && !nomesGerados[novoNomeIndex].tipo && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                <span className="font-semibold">Nome adequado para:</span> {
                  tipoPet === 'reptil' ? 'Réptil' :
                  tipoPet === 'roedor' ? 'Hamster/Roedor' :
                  tipoPet.charAt(0).toUpperCase() + tipoPet.slice(1)
                }
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 