'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Listas de palavras para compor nomes aleatórios
const substantivos = [
  'Sol', 'Lua', 'Estrela', 'Mar', 'Céu', 'Terra', 'Fogo', 'Água', 'Vento', 'Pedra',
  'Onda', 'Flor', 'Folha', 'Raio', 'Montanha', 'Rio', 'Nuvem', 'Trovão', 'Cristal', 'Tempestade'
];

const adjetivos = [
  'Dourado', 'Prateado', 'Brilhante', 'Luminoso', 'Colorido', 'Reluzente', 'Resplandecente', 'Radiante',
  'Majestoso', 'Cintilante', 'Flamejante', 'Sereno', 'Intenso', 'Harmônico', 'Eterno', 
  'Místico', 'Infinito', 'Sublime', 'Celestial', 'Ancestral'
];

const verbos = [
  'Voar', 'Brilhar', 'Correr', 'Dançar', 'Cantar', 'Nadar', 'Saltar', 'Girar',
  'Flutuar', 'Pulsar', 'Iluminar', 'Vibrar', 'Florescer', 'Crescer', 'Elevar',
  'Resplandecer', 'Transformar', 'Explorar', 'Despertar', 'Transcender'
];

const sufixosCriativos = [
  'ian', 'tron', 'zoid', 'ex', 'or', 'ar', 'ix', 'ax', 'on', 'us',
  'ius', 'ator', 'ium', 'era', 'ius', 'yum', 'tor', 'tus', 'lith', 'os'
];

const prefixosCriativos = [
  'Neo', 'Mega', 'Aero', 'Cyber', 'Ultra', 'Meta', 'Hyper', 'Astro', 'Quantum', 'Cosmo',
  'Tele', 'Tera', 'Bio', 'Geo', 'Techno', 'Xeno', 'Ecto', 'Proto', 'Cryo', 'Omni'
];

const silabas = [
  'ka', 'ra', 'ta', 'ki', 'ru', 'tu', 'ke', 're', 'ti', 'ko',
  'ma', 'na', 'pa', 'la', 'sa', 'ja', 'ba', 'za', 'ga', 'va'
];

export default function Aleatorios() {
  const [tipoNome, setTipoNome] = useState('composto');
  const [nomeGerado, setNomeGerado] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Função para capitalizar primeira letra
  const capitalizar = (palavra: string) => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  };

  // Função para gerar número aleatório em um intervalo
  const gerarNumeroAleatorio = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Função para obter um elemento aleatório de um array
  const obterElementoAleatorio = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const gerarNome = () => {
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      let resultado = '';
      
      switch(tipoNome) {
        case 'composto':
          // Substantivo + Adjetivo (ex: SolDourado)
          resultado = obterElementoAleatorio(substantivos) + capitalizar(obterElementoAleatorio(adjetivos));
          break;
          
        case 'fantasia':
          // Prefixo criativo + Substantivo + Sufixo criativo (ex: NeoSolIan)
          resultado = obterElementoAleatorio(prefixosCriativos) + 
                      obterElementoAleatorio(substantivos) + 
                      obterElementoAleatorio(sufixosCriativos);
          break;
          
        case 'acao':
          // Verbo + Substantivo (ex: VoarEstrela)
          resultado = capitalizar(obterElementoAleatorio(verbos)) + 
                      obterElementoAleatorio(substantivos);
          break;
          
        case 'silabas':
          // Combinação de 2-4 sílabas aleatórias (ex: KiRuTaPa)
          const numSilabas = gerarNumeroAleatorio(2, 4);
          for (let i = 0; i < numSilabas; i++) {
            resultado += capitalizar(obterElementoAleatorio(silabas));
          }
          break;
          
        default:
          resultado = 'NomeAleatorio123';
      }
      
      setNomeGerado(resultado);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-600 dark:text-teal-400 mb-4 text-center">
            Nomes Aleatórios
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center">
            Crie nomes incomuns e interessantes para qualquer finalidade
          </p>

          <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Estilo do Nome
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'composto' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('composto')}
                >
                  Composto
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'fantasia' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('fantasia')}
                >
                  Fantasia
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'acao' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('acao')}
                >
                  Ação
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'silabas' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('silabas')}
                >
                  Sílabas
                </button>
              </div>
            </div>

            <button 
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
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
              corDestaque="text-teal-600 dark:text-teal-400"
              textoBotaoGerar="Gerar outro nome"
              categoria="aleatorios"
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 