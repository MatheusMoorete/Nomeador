'use client';

import { useState, useEffect } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';
import { LISTA_NOMES_PETS } from '@/data/petNames';
import { CARACTERISTICAS_PETS, CARACTERISTICAS_GERAIS_PETS } from '@/data/caracteristicasPets';

// Interface para nome gerado com características
interface NomeGeradoInfo {
  nome: string;
  caracteristica: string;
}

export default function Pets() {
  const [tipoAnimal, setTipoAnimal] = useState('cachorro');
  const [generoAnimal, setGeneroAnimal] = useState('neutro');
  const [nomeGerado, setNomeGerado] = useState<NomeGeradoInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modoGerador, setModoGerador] = useState<'tradicional' | 'ia'>('tradicional');
  
  // Estado para armazenar nomes já utilizados nesta sessão
  const [nomesUtilizados, setNomesUtilizados] = useState<Record<string, string[]>>({
    cachorro: [],
    gato: [],
    peixe: [],
    coelho: [],
    roedor: [],
    ave: [],
    reptil: [],
    exotico: []
  });

  // Reiniciar os nomes utilizados quando a página carregar
  useEffect(() => {
    setNomesUtilizados({
      cachorro: [],
      gato: [],
      peixe: [],
      coelho: [],
      roedor: [],
      ave: [],
      reptil: [],
      exotico: []
    });
  }, []);

  const obterCaracteristicaAleatoria = (tipo: string): string => {
    // Obter uma lista de características específicas para o tipo de animal
    const caracteristicasEspecificas = CARACTERISTICAS_PETS[tipo] || [];
    
    // Combinar com características gerais
    const todasCaracteristicas = [...caracteristicasEspecificas, ...CARACTERISTICAS_GERAIS_PETS];
    
    // Selecionar uma característica aleatória
    const indiceAleatorio = Math.floor(Math.random() * todasCaracteristicas.length);
    return todasCaracteristicas[indiceAleatorio];
  };

  const gerarNome = () => {
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      let listaNomes;
      
      switch(tipoAnimal) {
        case 'cachorro':
          listaNomes = LISTA_NOMES_PETS.cachorro[generoAnimal as keyof typeof LISTA_NOMES_PETS.cachorro];
          break;
        case 'gato':
          listaNomes = LISTA_NOMES_PETS.gato[generoAnimal as keyof typeof LISTA_NOMES_PETS.gato];
          break;
        case 'peixe':
          listaNomes = LISTA_NOMES_PETS.peixe[generoAnimal as keyof typeof LISTA_NOMES_PETS.peixe];
          break;
        case 'coelho':
          listaNomes = LISTA_NOMES_PETS.coelho[generoAnimal as keyof typeof LISTA_NOMES_PETS.coelho];
          break;
        case 'roedor':
          listaNomes = LISTA_NOMES_PETS.roedor[generoAnimal as keyof typeof LISTA_NOMES_PETS.roedor];
          break;
        case 'ave':
          listaNomes = LISTA_NOMES_PETS.ave[generoAnimal as keyof typeof LISTA_NOMES_PETS.ave];
          break;
        case 'reptil':
          listaNomes = LISTA_NOMES_PETS.reptil[generoAnimal as keyof typeof LISTA_NOMES_PETS.reptil];
          break;
        case 'exotico':
          listaNomes = LISTA_NOMES_PETS.exotico[generoAnimal as keyof typeof LISTA_NOMES_PETS.exotico];
          break;
        default:
          listaNomes = LISTA_NOMES_PETS.cachorro.neutro;
      }
      
      // Filtrar nomes já utilizados nesta sessão
      const nomesDisponiveis = listaNomes.filter(
        nome => !nomesUtilizados[tipoAnimal].includes(nome)
      );
      
      // Se todos os nomes já foram usados, volte a usar todos
      const listaFinal = nomesDisponiveis.length > 0 ? nomesDisponiveis : listaNomes;
      
      const indiceAleatorio = Math.floor(Math.random() * listaFinal.length);
      const nomeEscolhido = listaFinal[indiceAleatorio];
      
      // Adicionar o nome à lista de utilizados
      setNomesUtilizados(prev => ({
        ...prev,
        [tipoAnimal]: [...prev[tipoAnimal], nomeEscolhido]
      }));
      
      // Gerar uma característica aleatória para o nome
      const caracteristica = obterCaracteristicaAleatoria(tipoAnimal);
      
      // Definir o nome gerado com sua característica
      setNomeGerado({
        nome: nomeEscolhido,
        caracteristica
      });
      
      setIsGenerating(false);
    }, 600);
  };

  // Ao mudar o tipo de animal ou gênero, limpar o nome gerado
  useEffect(() => {
    setNomeGerado(null);
  }, [tipoAnimal, generoAnimal]);

  // Função para formatar o texto de descrição do animal
  const getDescricaoAnimal = () => {
    if (!nomeGerado) return '';
    
    const tipoFormatado = {
      'cachorro': 'cachorro',
      'gato': 'gato',
      'peixe': 'peixe',
      'coelho': 'coelho',
      'roedor': 'roedor',
      'ave': 'pássaro',
      'reptil': 'réptil',
      'exotico': 'animal exótico'
    }[tipoAnimal];
    
    return `Um ${tipoFormatado} ${nomeGerado.caracteristica}.`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
            Nomes para Pets
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center">
            Encontre o nome perfeito para o seu animal de estimação
          </p>

          <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            {/* Alternador entre gerador tradicional e IA */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-l-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 ${
                    modoGerador === 'tradicional' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                  onClick={() => setModoGerador('tradicional')}
                >
                  Gerador Simples
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-r-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 ${
                    modoGerador === 'ia' 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                  onClick={() => setModoGerador('ia')}
                >
                  Gerador Inteligente
                </button>
              </div>
            </div>

            {modoGerador === 'tradicional' ? (
              <>
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Tipo de Animal
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'cachorro' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('cachorro')}
                    >
                      Cachorro
                    </button>
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'gato' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('gato')}
                    >
                      Gato
                    </button>
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'peixe' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('peixe')}
                    >
                      Peixe
                    </button>
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'coelho' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('coelho')}
                    >
                      Coelho
                    </button>
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'roedor' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('roedor')}
                    >
                      Hamster/Roedor
                    </button>
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'ave' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('ave')}
                    >
                      Ave
                    </button>
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'reptil' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('reptil')}
                    >
                      Réptil
                    </button>
                    <button 
                      className={`px-3 py-2 rounded-lg text-sm ${tipoAnimal === 'exotico' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setTipoAnimal('exotico')}
                    >
                      Exótico
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Gênero
                  </label>
                  <div className="flex gap-3">
                    <button 
                      className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                        generoAnimal === 'macho' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                      onClick={() => setGeneroAnimal('macho')}
                    >
                      Macho
                    </button>
                    <button 
                      className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                        generoAnimal === 'femea' 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                      onClick={() => setGeneroAnimal('femea')}
                    >
                      Fêmea
                    </button>
                    <button 
                      className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                        generoAnimal === 'neutro' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                      onClick={() => setGeneroAnimal('neutro')}
                    >
                      Neutro
                    </button>
                  </div>
                </div>

                <button 
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  onClick={gerarNome}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Gerando...' : 'Gerar Nome'}
                </button>
              </>
            ) : (
              <AINameGenerator 
                categoria="pets" 
                origemInicial="brasileiro"
              />
            )}
          </div>

          {modoGerador === 'tradicional' && nomeGerado && (
            <div className="w-full flex flex-col gap-4">
              <NomeDisplay 
                nome={nomeGerado.nome} 
                onGerarNovo={gerarNome}
                corDestaque={
                  generoAnimal === 'macho' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : generoAnimal === 'femea' 
                      ? 'text-pink-500 dark:text-pink-400'
                      : 'text-purple-600 dark:text-purple-400'
                }
                categoria="pets"
              />
              
              {/* Bloco para mostrar a característica */}
              <div className="w-full bg-[#1e293b] rounded-xl shadow-md p-4 mt-2">
                <p className="text-gray-300 text-center">
                  <span className="font-semibold">Personalidade:</span> {getDescricaoAnimal()}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 