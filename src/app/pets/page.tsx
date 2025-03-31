'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';
import { LISTA_NOMES_PETS } from '@/data/petNames';

export default function Pets() {
  const [tipoAnimal, setTipoAnimal] = useState('cachorro');
  const [generoAnimal, setGeneroAnimal] = useState('neutro');
  const [nomeGerado, setNomeGerado] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modoGerador, setModoGerador] = useState<'tradicional' | 'ia'>('tradicional');

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
      
      const indiceAleatorio = Math.floor(Math.random() * listaNomes.length);
      setNomeGerado(listaNomes[indiceAleatorio]);
      setIsGenerating(false);
    }, 600);
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
            <NomeDisplay 
              nome={nomeGerado} 
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 