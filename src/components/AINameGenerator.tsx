'use client';

import { useState, useCallback } from 'react';
import { GeneratedName, NameGenerationOptions, generateNames } from '@/services/aiNameGenerator';
import NomeDisplay from './NomeDisplay';

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
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [nomesGerados, setNomesGerados] = useState<GeneratedName[]>([]);
  const [novoNomeIndex, setNovoNomeIndex] = useState(0);
  const [inputCaract, setInputCaract] = useState('');
  const [error, setError] = useState('');

  const gerarNomesIA = useCallback(async () => {
    try {
      setIsGenerating(true);
      setError('');
      
      // Gerar vários nomes de uma vez para economizar chamadas à API
      const quantidade = 5;
      const newOptions = { ...options, quantidade };
      
      const results = await generateNames(newOptions);
      setNomesGerados(results);
      setNovoNomeIndex(0);
    } catch (err) {
      console.error('Erro ao gerar nomes:', err);
      setError('Não foi possível gerar nomes. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  }, [options]);

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

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Gerador de Nomes com IA
      </h3>

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
        {isGenerating ? 'Gerando...' : 'Gerar Nome com IA'}
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
          </div>
        </div>
      )}
    </div>
  );
} 