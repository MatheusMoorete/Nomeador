'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import AdBanner from '@/components/AdBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';

// Listas de nomes por gênero e origem
const nomesMenino = {
  brasileiro: [
    'Miguel', 'Arthur', 'Heitor', 'Théo', 'Davi', 'Gabriel', 'Bernardo', 'Samuel', 
    'João', 'Pedro', 'Lorenzo', 'Lucas', 'Benjamin', 'Matheus', 'Nicolas', 
    'Joaquim', 'Henrique', 'Rafael', 'Isaac', 'Guilherme'
  ],
  internacional: [
    'Noah', 'Liam', 'Oliver', 'Ethan', 'Aiden', 'Alexander', 'Matthew', 'William', 
    'James', 'Benjamin', 'Elijah', 'Lucas', 'Jacob', 'Michael', 'Daniel', 
    'Henry', 'Jackson', 'Sebastian', 'Carter', 'Owen'
  ],
  classico: [
    'Antônio', 'José', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'João', 'Luiz', 
    'Fernando', 'Roberto', 'Ricardo', 'Marcelo', 'Alexandre', 'Eduardo', 'Rodrigo', 
    'Felipe', 'Leonardo', 'Vicente', 'André', 'Augusto'
  ]
};

const nomesMenina = {
  brasileiro: [
    'Alice', 'Sophia', 'Laura', 'Manuela', 'Isabella', 'Helena', 'Valentina', 'Júlia', 
    'Heloísa', 'Lívia', 'Maria', 'Lorena', 'Cecília', 'Eloá', 'Giovanna', 
    'Maria Luísa', 'Beatriz', 'Maria Júlia', 'Lara', 'Mariana'
  ],
  internacional: [
    'Emma', 'Olivia', 'Ava', 'Charlotte', 'Sophia', 'Amelia', 'Isabella', 'Mia', 
    'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Sofia', 'Avery', 
    'Ella', 'Madison', 'Scarlett', 'Victoria', 'Eleanor'
  ],
  classico: [
    'Maria', 'Ana', 'Francisca', 'Antônia', 'Adriana', 'Juliana', 'Márcia', 'Fernanda', 
    'Patrícia', 'Aline', 'Sandra', 'Camila', 'Amanda', 'Bruna', 'Jéssica', 
    'Letícia', 'Simone', 'Carolina', 'Vanessa', 'Natália'
  ]
};

export default function Bebes() {
  const [genero, setGenero] = useState('menino');
  const [origem, setOrigem] = useState('brasileiro');
  const [nomeGerado, setNomeGerado] = useState('');
  const [nomesAnteriores, setNomesAnteriores] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modoGerador, setModoGerador] = useState<'tradicional' | 'ia'>('tradicional');

  const gerarNome = () => {
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      const lista = genero === 'menino' ? nomesMenino[origem as keyof typeof nomesMenino] : nomesMenina[origem as keyof typeof nomesMenina];
      let novoNome;
      
      // Tentar até 10 vezes para não repetir o último nome
      let tentativas = 0;
      do {
        novoNome = lista[Math.floor(Math.random() * lista.length)];
        tentativas++;
      } while (novoNome === nomeGerado && tentativas < 10);
      
      // Adicionar o nome atual à lista de nomes anteriores se não estiver vazio
      if (nomeGerado) {
        setNomesAnteriores(prev => [nomeGerado, ...prev].slice(0, 5));
      }
      
      setNomeGerado(novoNome);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-4 text-center">
            Nomes de Bebês
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center">
            Encontre o nome perfeito para o novo membro da família
          </p>

          <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="mb-6">
              {/* Alternar entre gerador tradicional e IA */}
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
                    Gerador Clássico
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
                    Gerador com IA
                  </button>
                </div>
              </div>

              {modoGerador === 'tradicional' ? (
                <>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Gênero
                  </label>
                  <div className="flex gap-4 mb-6">
                    <button 
                      className={`flex-1 px-4 py-2 rounded-lg ${genero === 'menino' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setGenero('menino')}
                    >
                      Menino
                    </button>
                    <button 
                      className={`flex-1 px-4 py-2 rounded-lg ${genero === 'menina' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setGenero('menina')}
                    >
                      Menina
                    </button>
                  </div>
                  
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Origem
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button 
                      className={`px-4 py-2 rounded-lg ${origem === 'brasileiro' 
                        ? genero === 'menino' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setOrigem('brasileiro')}
                    >
                      Brasileiro
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-lg ${origem === 'internacional' 
                        ? genero === 'menino' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setOrigem('internacional')}
                    >
                      Internacional
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-lg ${origem === 'classico' 
                        ? genero === 'menino' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setOrigem('classico')}
                    >
                      Clássico
                    </button>
                  </div>

                  <button 
                    className={`w-full mt-6 py-3 px-4 font-medium rounded-lg transition-colors ${
                      genero === 'menino' 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-pink-500 hover:bg-pink-600 text-white'
                    }`}
                    onClick={gerarNome}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Gerando...' : 'Gerar Nome'}
                  </button>
                </>
              ) : (
                <AINameGenerator 
                  categoria="bebes" 
                  generoInicial={genero === 'menino' ? 'masculino' : 'feminino'} 
                  origemInicial={origem as 'brasileiro' | 'internacional' | 'classico'}
                />
              )}
            </div>
          </div>

          {modoGerador === 'tradicional' && nomeGerado && (
            <div className="w-full flex flex-col gap-4">
              <NomeDisplay 
                nome={nomeGerado} 
                onGerarNovo={gerarNome}
                corDestaque={genero === 'menino' 
                  ? 'text-blue-500 dark:text-blue-400' 
                  : 'text-pink-500 dark:text-pink-400'}
                mostrarAnuncio={false}
                categoria="bebes"
              />
              
              {/* Anúncio colocado entre o nome e o histórico */} 
              <AdBanner adSlot="bebes-historico" />
              
              {nomesAnteriores.length > 0 && (
                <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Nomes anteriores:
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {nomesAnteriores.map((nome, index) => (
                      <span 
                        key={index} 
                        className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                      >
                        {nome}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Banner no final da página */}
        <div className="w-full max-w-2xl mt-8">
          <AdBanner adSlot="bebes-footer" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 