'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';

// Lista de nomes de pets separados por gênero
const nomesCachorro = {
  macho: [
    'Thor', 'Max', 'Rex', 'Bob', 'Duke', 'Toby', 'Fred', 'Simba', 
    'Billy', 'Luke', 'Rocky', 'Buddy', 'Apollo', 'Zeus', 'Bruno',
    'Spike', 'Marley', 'Lucky', 'Charlie', 'Theo'
  ],
  femea: [
    'Luna', 'Bella', 'Mel', 'Nina', 'Amora', 'Princesa', 'Lola', 
    'Meg', 'Mia', 'Kiara', 'Nina', 'Nala', 'Pandora', 'Laika', 'Malu',
    'Maya', 'Kika', 'Pituca', 'Pepper', 'Penny'
  ],
  neutro: [
    'Thor', 'Luna', 'Max', 'Bella', 'Rex', 'Mel', 'Bob', 'Nina', 
    'Duke', 'Amora', 'Toby', 'Princesa', 'Fred', 'Lola', 'Simba', 
    'Meg', 'Billy', 'Mia', 'Luke', 'Kiara'
  ]
};

const nomesGato = {
  macho: [
    'Oliver', 'Leo', 'Simba', 'Tom', 'Félix', 'Garfield', 'Thor', 
    'Bóris', 'Ozzy', 'Mingau', 'Romeu', 'Bigode', 'Tigre', 'Caju',
    'Merlim', 'Nescau', 'Logan', 'Toddy', 'Trovão', 'Miau'
  ],
  femea: [
    'Luna', 'Lili', 'Nina', 'Mia', 'Mely', 'Nala', 'Mimi', 
    'Chloe', 'Amora', 'Mel', 'Cacau', 'Malu', 'Jade', 'Filó',
    'Cherie', 'Pandora', 'Maggie', 'Pipoca', 'Pantera', 'Sofia'
  ],
  neutro: [
    'Oliver', 'Luna', 'Leo', 'Lili', 'Simba', 'Nina', 'Tom', 'Mia', 
    'Félix', 'Mely', 'Garfield', 'Nala', 'Thor', 'Mimi', 'Frajola', 
    'Chloe', 'Bóris', 'Amora', 'Ozzy', 'Mel'
  ]
};

const nomesPeixe = {
  macho: [
    'Nemo', 'Flash', 'Splash', 'Marlin', 'Finn', 'Gil', 'Blue',
    'Bolha', 'Aquaman', 'Tritão', 'Marin', 'Coral', 'Oceano', 'Shark',
    'Flipper', 'Nado', 'Azulão', 'Peixoto', 'Vermelho', 'Limão'
  ],
  femea: [
    'Dory', 'Ariel', 'Coral', 'Pearl', 'Ruby', 'Aqua', 'Wanda',
    'Sereia', 'Bolha', 'Bubble', 'Marina', 'Goldie', 'Pérola', 'Azulina',
    'Escama', 'Cristal', 'Nada', 'Luna', 'Estrela', 'Água'
  ],
  neutro: [
    'Nemo', 'Dory', 'Bolha', 'Azul', 'Flash', 'Splash', 'Coral', 'Marlin', 
    'Goldie', 'Bubble', 'Finn', 'Ariel', 'Gil', 'Aqua', 'Wanda', 
    'Flipper', 'Nado', 'Blue', 'Pearl', 'Ruby'
  ]
};

const nomesCoelho = {
  macho: [
    'Pernalonga', 'Thumper', 'Orelhudo', 'Tambor', 'Saltitante', 'Puff',
    'Algodão', 'Floco', 'Macio', 'Salto', 'Pipinho', 'Bolinha', 'Pintado',
    'Felpudo', 'Chocolate', 'Cenoura', 'Branquinho', 'Pipoca', 'Nevado', 'Pulão'
  ],
  femea: [
    'Fofa', 'Fofinha', 'Bolinha', 'Pipoca', 'Algodão', 'Neve', 'Cenoura', 
    'Patinha', 'Floquinho', 'Pérola', 'Branquinha', 'Pula-pula', 'Orelhinha',
    'Lola', 'Lili', 'Cotton', 'Belinha', 'Fru-fru', 'Moranguinho', 'Boneca'
  ],
  neutro: [
    'Pernalonga', 'Fofinho', 'Thumper', 'Orelhudo', 'Algodão', 'Cenoura', 
    'Pipoca', 'Floco', 'Macio', 'Salto', 'Pipinho', 'Biju', 'Tambor', 
    'Bolinha', 'Felpudo', 'Pompom', 'Chocolate', 'Branquinho', 'Patinha', 'Neve'
  ]
};

// Versões reduzidas para os outros animais
const nomesRoedor = {
  macho: ['Twister', 'Pingo', 'Bolt', 'Mickey', 'Stuart', 'Nugget', 'Amendoim', 'Pitufo', 'Cookie', 'Caramelo'],
  femea: ['Pipoca', 'Minnie', 'Lilo', 'Bolinha', 'Floco', 'Petunia', 'Mochi', 'Lentilha', 'Pimenta', 'Fofinha'],
  neutro: ['Twister', 'Pipoca', 'Pingo', 'Bolt', 'Minnie', 'Mickey', 'Lilo', 'Bolinha', 'Floco', 'Pitufo']
};

const nomesAve = {
  macho: ['Blu', 'Zazu', 'Louro', 'Flash', 'Sol', 'Bob', 'Kiwi', 'Sky', 'Rio', 'Azulão'],
  femea: ['Jade', 'Safira', 'Piu-Piu', 'Petúnia', 'Cecília', 'Mel', 'Coco', 'Rainbow', 'Sunny', 'Esmeralda'],
  neutro: ['Blu', 'Zazu', 'Louro', 'Piu-Piu', 'Sky', 'Jade', 'Safira', 'Rio', 'Flash', 'Sol']
};

const nomesReptil = {
  macho: ['Draco', 'Spike', 'Rex', 'Godzilla', 'Yoshi', 'Rango', 'Crush', 'Ziggy', 'Komodo', 'Slither'],
  femea: ['Serpente', 'Hydra', 'Scale', 'Cobra', 'Lagartixa', 'Nila', 'Escama', 'Reptilia', 'Verde', 'Iguana'],
  neutro: ['Draco', 'Spike', 'Rex', 'Godzilla', 'Yoshi', 'Rango', 'Crush', 'Flash', 'Ziggy', 'Komodo']
};

const nomesExotico = {
  macho: ['Exótico', 'Rajah', 'Django', 'Yoda', 'Bamboo', 'Storm', 'Enigma', 'Cosmos', 'Ozzy', 'Onyx'],
  femea: ['Safira', 'Íris', 'Quimera', 'Nebulosa', 'Pandora', 'Aurora', 'Winter', 'Mystic', 'Shadow', 'Quest'],
  neutro: ['Exótico', 'Safira', 'Rajah', 'Íris', 'Quimera', 'Nebulosa', 'Pandora', 'Django', 'Yoda', 'Aurora']
};

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
          listaNomes = nomesCachorro[generoAnimal as keyof typeof nomesCachorro];
          break;
        case 'gato':
          listaNomes = nomesGato[generoAnimal as keyof typeof nomesGato];
          break;
        case 'peixe':
          listaNomes = nomesPeixe[generoAnimal as keyof typeof nomesPeixe];
          break;
        case 'coelho':
          listaNomes = nomesCoelho[generoAnimal as keyof typeof nomesCoelho];
          break;
        case 'roedor':
          listaNomes = nomesRoedor[generoAnimal as keyof typeof nomesRoedor];
          break;
        case 'ave':
          listaNomes = nomesAve[generoAnimal as keyof typeof nomesAve];
          break;
        case 'reptil':
          listaNomes = nomesReptil[generoAnimal as keyof typeof nomesReptil];
          break;
        case 'exotico':
          listaNomes = nomesExotico[generoAnimal as keyof typeof nomesExotico];
          break;
        default:
          listaNomes = nomesCachorro.neutro;
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