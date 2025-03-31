'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';

// Lista de prefixos e sufixos para formar nicknames
const prefixos = [
  'Dark', 'Pro', 'Mega', 'Ultra', 'Epic', 'Royal', 'Shadow', 'Cyber', 
  'Death', 'Master', 'King', 'Queen', 'Toxic', 'Hyper', 'Super', 
  'Ninja', 'Ghost', 'Wild', 'Elite', 'Fatal'
];

const sufixos = [
  'Killer', 'Master', 'Gamer', 'Sniper', 'Hunter', 'Warrior', 'Ninja', 'Legend', 
  'Beast', 'Destroyer', 'Player', 'Champion', 'Assassin', 'Wizard', 'Knight', 
  'Titan', 'Falcon', 'Dragon', 'Phoenix', 'Wolf'
];

const palavrasEpicas = [
  'Nemesis', 'Vortex', 'Phoenix', 'Reaper', 'Venom', 'Legion', 'Inferno', 'Abyss', 
  'Oblivion', 'Zenith', 'Specter', 'Havoc', 'Onyx', 'Raven', 'Titan', 
  'Nexus', 'Eclipse', 'Nova', 'Fury', 'Orion'
];

const caracteresEspeciais = ['_', 'x', '.', '-', '0', '$', '7', '9', 'z', 'X'];

export default function Jogos() {
  const [estilo, setEstilo] = useState('composto');
  const [nicknameGerado, setNicknameGerado] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modoGerador, setModoGerador] = useState<'tradicional' | 'ia'>('tradicional');

  const gerarNumeroAleatorio = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const gerarNickname = () => {
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      let resultado = '';
      
      switch(estilo) {
        case 'composto':
          // Estilo composto: Prefixo + Sufixo (Ex: DarkKiller)
          const prefixoAleatorio = prefixos[Math.floor(Math.random() * prefixos.length)];
          const sufixoAleatorio = sufixos[Math.floor(Math.random() * sufixos.length)];
          resultado = prefixoAleatorio + sufixoAleatorio;
          break;
          
        case 'epico':
          // Estilo épico: Uma palavra épica (Ex: Phoenix)
          resultado = palavrasEpicas[Math.floor(Math.random() * palavrasEpicas.length)];
          break;
          
        case 'competitivo':
          // Estilo competitivo: Palavra + Números (Ex: Ninja123)
          const palavra = prefixos[Math.floor(Math.random() * prefixos.length)];
          const numero = gerarNumeroAleatorio(10, 999);
          resultado = palavra + numero;
          break;
          
        case 'simbolos':
          // Estilo com símbolos: Pref_Suf ou x_Palavra_x (Ex: Dark_Killer ou x_Phoenix_x)
          const usarX = Math.random() > 0.5;
          
          if (usarX) {
            const palavra = palavrasEpicas[Math.floor(Math.random() * palavrasEpicas.length)];
            resultado = `x_${palavra}_x`;
          } else {
            const pref = prefixos[Math.floor(Math.random() * prefixos.length)];
            const suf = sufixos[Math.floor(Math.random() * sufixos.length)];
            const simbolo = caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)];
            resultado = `${pref}${simbolo}${suf}`;
          }
          break;
          
        default:
          resultado = 'GamerPro123';
      }
      
      setNicknameGerado(resultado);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 text-center">
            Nicknames para Jogos
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center">
            Crie um nickname épico para dominar nos seus jogos favoritos
          </p>

          <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            {/* Alternar entre gerador tradicional e IA */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-l-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 ${
                    modoGerador === 'tradicional' 
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
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
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Estilo do Nickname
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    className={`px-4 py-2 rounded-lg ${estilo === 'composto' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setEstilo('composto')}
                  >
                    Composto
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${estilo === 'epico' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setEstilo('epico')}
                  >
                    Épico
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${estilo === 'competitivo' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setEstilo('competitivo')}
                  >
                    Competitivo
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${estilo === 'simbolos' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setEstilo('simbolos')}
                  >
                    Com Símbolos
                  </button>
                </div>

                <button 
                  className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  onClick={gerarNickname}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Gerando...' : 'Gerar Nickname'}
                </button>
              </div>
            ) : (
              <AINameGenerator 
                categoria="jogos" 
                generoInicial="neutro"
              />
            )}
          </div>

          {modoGerador === 'tradicional' && nicknameGerado && (
            <NomeDisplay 
              nome={nicknameGerado} 
              onGerarNovo={gerarNickname}
              corDestaque="text-indigo-600 dark:text-indigo-400"
              textoBotaoGerar="Gerar outro nickname"
              categoria="jogos"
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 