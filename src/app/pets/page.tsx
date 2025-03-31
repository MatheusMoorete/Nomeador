'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Lista de nomes de pets
const nomesCachorro = [
  'Thor', 'Luna', 'Max', 'Bella', 'Rex', 'Mel', 'Bob', 'Nina', 
  'Duke', 'Amora', 'Toby', 'Princesa', 'Fred', 'Lola', 'Simba', 
  'Meg', 'Billy', 'Mia', 'Luke', 'Kiara'
];

const nomesGato = [
  'Oliver', 'Luna', 'Leo', 'Lili', 'Simba', 'Nina', 'Tom', 'Mia', 
  'Félix', 'Mely', 'Garfield', 'Nala', 'Thor', 'Mimi', 'Frajola', 
  'Chloe', 'Bóris', 'Amora', 'Ozzy', 'Mel'
];

const nomesPeixe = [
  'Nemo', 'Dory', 'Bolha', 'Azul', 'Flash', 'Splash', 'Coral', 'Marlin', 
  'Goldie', 'Bubble', 'Finn', 'Ariel', 'Gil', 'Aqua', 'Wanda', 
  'Flipper', 'Nado', 'Blue', 'Pearl', 'Ruby'
];

export default function Pets() {
  const [tipoAnimal, setTipoAnimal] = useState('cachorro');
  const [nomeGerado, setNomeGerado] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const gerarNome = () => {
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      let listaNomes;
      
      switch(tipoAnimal) {
        case 'cachorro':
          listaNomes = nomesCachorro;
          break;
        case 'gato':
          listaNomes = nomesGato;
          break;
        case 'peixe':
          listaNomes = nomesPeixe;
          break;
        default:
          listaNomes = nomesCachorro;
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
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Tipo de Animal
              </label>
              <div className="flex flex-wrap gap-4">
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoAnimal === 'cachorro' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoAnimal('cachorro')}
                >
                  Cachorro
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoAnimal === 'gato' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoAnimal('gato')}
                >
                  Gato
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoAnimal === 'peixe' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoAnimal('peixe')}
                >
                  Peixe
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
          </div>

          {nomeGerado && (
            <NomeDisplay 
              nome={nomeGerado} 
              onGerarNovo={gerarNome}
              corDestaque="text-blue-600 dark:text-blue-400"
              categoria="pets"
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 