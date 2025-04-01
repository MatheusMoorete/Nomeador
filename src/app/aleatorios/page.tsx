'use client';

import { useState, useEffect } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRandomNameData, RandomNameData } from '@/data/randomNames';
import PageTransition from '@/components/PageTransition';

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

// Função para gerar um nome baseado em estilo de mídia popular
const gerarNomeMidia = (data: RandomNameData) => {
  const estilos = [
    // Estilo espacial (Star Wars, Star Trek)
    () => {
      const prefixos = data.midia.espacial.prefixos;
      const sufixos = data.midia.espacial.sufixos;
      return `${obterElementoAleatorio(prefixos)} ${obterElementoAleatorio(sufixos)}`;
    },
    // Estilo medieval/fantasia (Game of Thrones, Lord of the Rings)
    () => {
      const titulos = data.midia.medieval.titulos;
      const locais = data.midia.medieval.locais;
      return `${obterElementoAleatorio(titulos)} of the ${obterElementoAleatorio(locais)}`;
    },
    // Estilo cyberpunk/futurista
    () => {
      const prefixos = data.midia.cyberpunk.prefixos;
      const sufixos = data.midia.cyberpunk.sufixos;
      return `${obterElementoAleatorio(prefixos)}${obterElementoAleatorio(sufixos)} ${gerarNumeroAleatorio(1000, 9999)}`;
    },
    // Estilo mágico/místico
    () => {
      const adjetivosMisticos = data.midia.magico.adjetivos;
      const objetosMagicos = data.midia.magico.objetos;
      return `The ${obterElementoAleatorio(adjetivosMisticos)} ${obterElementoAleatorio(objetosMagicos)}`;
    }
  ];
  return estilos[Math.floor(Math.random() * estilos.length)]();
};

const gerarNomeNumeroFantasia = (data: RandomNameData) => {
  // Escolhe um número de fantasia e combina com um substantivo ou adjetivo
  const numero = obterElementoAleatorio(data.numeros);
  const tipo = Math.random() > 0.5 ? obterElementoAleatorio(data.substantivos) : obterElementoAleatorio(data.adjetivos);
  
  // 50% de chance de inverter a ordem
  return Math.random() > 0.5 ? `${numero} ${tipo}` : `${tipo} ${numero}`;
};

export default function Aleatorios() {
  const { t, language } = useLanguage();
  const [tipoNome, setTipoNome] = useState('composto');
  const [nomeGerado, setNomeGerado] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [nomesAnteriores, setNomesAnteriores] = useState<string[]>([]);
  const [nomesGerados, setNomesGerados] = useState<Set<string>>(new Set());
  const [comprimento, setComprimento] = useState<'curto' | 'medio' | 'longo'>('medio');
  const [dados, setDados] = useState<RandomNameData | null>(null);

  // Atualizar dados quando o idioma mudar
  useEffect(() => {
    setDados(getRandomNameData(language));
  }, [language]);

  useEffect(() => {
    // Reset de nomes gerados quando mudamos o tipo de nome
    setNomesGerados(new Set());
  }, [tipoNome]);

  // Função para calcular o fator de comprimento (influencia o tamanho do nome)
  const getFatorComprimento = () => {
    switch(comprimento) {
      case 'curto': return 0.7;
      case 'longo': return 1.3;
      default: return 1.0;
    }
  };

  const gerarNomeUnico = (gerador: () => string): string => {
    // Tenta até 10 vezes para obter um nome único
    for (let tentativa = 0; tentativa < 10; tentativa++) {
      const nome = gerador();
      if (!nomesGerados.has(nome)) {
        return nome;
      }
    }
    // Se falhar em todas as tentativas, inclui um número aleatório para garantir unicidade
    return `${gerador()}${gerarNumeroAleatorio(10, 99)}`;
  };

  const gerarNome = () => {
    // Se os dados não foram carregados, não faz nada
    if (!dados) return;
    
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      let resultado = '';
      const fatorComprimento = getFatorComprimento();
      
      const gerarNomeSwitch = () => {
        switch(tipoNome) {
          case 'composto':
            // Substantivo + Adjetivo (ex: SolDourado)
            return obterElementoAleatorio(dados.substantivos) + capitalizar(obterElementoAleatorio(dados.adjetivos));
            
          case 'fantasia':
            // Prefixo criativo + Substantivo + Sufixo criativo (ex: NeoSolIan)
            return obterElementoAleatorio(dados.prefixos) + 
                  obterElementoAleatorio(dados.substantivos) + 
                  obterElementoAleatorio(dados.sufixos);
            
          case 'acao':
            // Verbo + Substantivo (ex: VoarEstrela)
            return capitalizar(obterElementoAleatorio(dados.verbos)) + 
                  obterElementoAleatorio(dados.substantivos);
            
          case 'silabas': {
            // Combinação de sílabas aleatórias (quantidade ajustada pelo fator de comprimento)
            const numSilabas = Math.max(2, Math.round(gerarNumeroAleatorio(2, 4) * fatorComprimento));
            let resultado = '';
            for (let i = 0; i < numSilabas; i++) {
              resultado += capitalizar(obterElementoAleatorio(dados.silabas));
            }
            return resultado;
          }
            
          case 'elementos': {
            // Elemento da natureza + Adjetivo ou Substantivo
            const elemento = obterElementoAleatorio(dados.elementosNatureza);
            return Math.random() > 0.5 
              ? elemento + capitalizar(obterElementoAleatorio(dados.adjetivos))
              : elemento + capitalizar(obterElementoAleatorio(dados.substantivos));
          }
            
          case 'mitologia': {
            // Entidade mitológica + Adjetivo ou Elemento
            const entidade = obterElementoAleatorio(dados.mitologiaEntidades);
            return Math.random() > 0.5
              ? entidade + 'De' + capitalizar(obterElementoAleatorio(dados.elementosNatureza))
              : entidade + capitalizar(obterElementoAleatorio(dados.adjetivos));
          }
            
          case 'cores': {
            // Cor + Substantivo ou cor + Entidade
            const cor = obterElementoAleatorio(dados.cores);
            return Math.random() > 0.5
              ? cor + capitalizar(obterElementoAleatorio(dados.substantivos))
              : cor + capitalizar(obterElementoAleatorio(dados.mitologiaEntidades));
          }
            
          case 'midia':
            // Nome baseado em estilos de mídia popular
            return gerarNomeMidia(dados);
            
          case 'numeros':
            // Nome baseado em números fantasiosos
            return gerarNomeNumeroFantasia(dados);
            
          default:
            return 'NomeAleatorio' + gerarNumeroAleatorio(100, 999);
        }
      };
      
      resultado = gerarNomeUnico(gerarNomeSwitch);
      
      // Armazenar o nome na lista de nomes gerados
      setNomesGerados(prev => new Set(prev).add(resultado));
      
      // Atualizar o nome gerado
      if (nomeGerado) {
        setNomesAnteriores(prev => [nomeGerado, ...prev].slice(0, 5));
      }
      
      setNomeGerado(resultado);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
          <div className="max-w-2xl w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-teal-600 dark:text-teal-400 mb-4 text-center">
              {t('random.title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center">
              {t('random.description')}
            </p>

            <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {t('random.style')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'composto' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('composto')}
                  >
                    {t('random.compound')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'fantasia' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('fantasia')}
                  >
                    {t('random.fantasy')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'acao' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('acao')}
                  >
                    {t('random.action')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'silabas' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('silabas')}
                  >
                    {t('random.syllables')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'elementos' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('elementos')}
                  >
                    {t('random.elements')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'mitologia' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('mitologia')}
                  >
                    {t('random.mythology')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'cores' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('cores')}
                  >
                    {t('random.colors')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'midia' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('midia')}
                  >
                    {t('random.media')}
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg ${tipoNome === 'numeros' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setTipoNome('numeros')}
                  >
                    {t('random.numbers')}
                  </button>
                </div>
                
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {t('random.length')}
                </label>
                <div className="flex mb-6 gap-3">
                  <button 
                    className={`flex-1 px-4 py-2 rounded-lg ${comprimento === 'curto' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setComprimento('curto')}
                  >
                    {t('random.short')}
                  </button>
                  <button 
                    className={`flex-1 px-4 py-2 rounded-lg ${comprimento === 'medio' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setComprimento('medio')}
                  >
                    {t('random.medium')}
                  </button>
                  <button 
                    className={`flex-1 px-4 py-2 rounded-lg ${comprimento === 'longo' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setComprimento('longo')}
                  >
                    {t('random.long')}
                  </button>
                </div>
              </div>

              <button 
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                onClick={gerarNome}
                disabled={isGenerating || !dados}
              >
                {isGenerating ? t('button.generating') : t('button.generate')}
              </button>
            </div>

            {nomeGerado && (
              <NomeDisplay 
                nome={nomeGerado} 
                onGerarNovo={gerarNome}
                corDestaque="text-teal-600 dark:text-teal-400"
                textoBotaoGerar={t('button.generate.another')}
                categoria="aleatorios"
              />
            )}
            
            {nomesAnteriores.length > 0 && (
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mt-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('random.previous')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {nomesAnteriores.map((nome, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-800 dark:text-gray-200"
                    >
                      {nome}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <AdBanner adSlot="aleatorios-footer" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
} 