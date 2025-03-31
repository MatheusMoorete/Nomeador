'use client';

import { useState, useEffect } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

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

// Listas ampliadas de palavras para compor nomes aleatórios
const substantivos = [
  'Sol', 'Lua', 'Estrela', 'Mar', 'Céu', 'Terra', 'Fogo', 'Água', 'Vento', 'Pedra',
  'Onda', 'Flor', 'Folha', 'Raio', 'Montanha', 'Rio', 'Nuvem', 'Trovão', 'Cristal', 'Tempestade',
  'Oceano', 'Floresta', 'Deserto', 'Ilha', 'Vulcão', 'Arco', 'Esmeralda', 'Safira', 'Rubi', 'Diamante',
  'Dragão', 'Lince', 'Falcão', 'Águia', 'Lobo', 'Tigre', 'Leão', 'Pantera', 'Serpente', 'Fênix',
  'Cruzado', 'Caçador', 'Guardião', 'Mago', 'Guerreiro', 'Paladino', 'Arqueiro', 'Druida', 'Xamã', 'Oráculo'
];

const adjetivos = [
  'Dourado', 'Prateado', 'Brilhante', 'Luminoso', 'Colorido', 'Reluzente', 'Resplandecente', 'Radiante',
  'Majestoso', 'Cintilante', 'Flamejante', 'Sereno', 'Intenso', 'Harmônico', 'Eterno', 
  'Místico', 'Infinito', 'Sublime', 'Celestial', 'Ancestral', 'Veloz', 'Ágil', 'Forte',
  'Sábio', 'Audaz', 'Valoroso', 'Astuto', 'Feroz', 'Nobre', 'Leal', 'Justo', 'Gentil',
  'Tenaz', 'Bravo', 'Sagrado', 'Divino', 'Selvagem', 'Elegante', 'Gracioso', 'Impetuoso'
];

const verbos = [
  'Voar', 'Brilhar', 'Correr', 'Dançar', 'Cantar', 'Nadar', 'Saltar', 'Girar',
  'Flutuar', 'Pulsar', 'Iluminar', 'Vibrar', 'Florescer', 'Crescer', 'Elevar',
  'Resplandecer', 'Transformar', 'Explorar', 'Despertar', 'Transcender',
  'Conquistar', 'Dominar', 'Comandar', 'Governar', 'Liderar', 'Proteger', 'Defender',
  'Lutar', 'Vencer', 'Superar', 'Desbravar', 'Forjar', 'Criar', 'Moldar', 'Construir'
];

const sufixosCriativos = [
  'ian', 'tron', 'zoid', 'ex', 'or', 'ar', 'ix', 'ax', 'on', 'us',
  'ius', 'ator', 'ium', 'era', 'ius', 'yum', 'tor', 'tus', 'lith', 'os',
  'alis', 'arium', 'icus', 'anth', 'aris', 'elis', 'oris', 'urus', 'antis', 'onis',
  'enth', 'oros', 'ira', 'ella', 'ana', 'ina', 'essa', 'ande', 'ium', 'antum'
];

const prefixosCriativos = [
  'Neo', 'Mega', 'Aero', 'Cyber', 'Ultra', 'Meta', 'Hyper', 'Astro', 'Quantum', 'Cosmo',
  'Tele', 'Tera', 'Bio', 'Geo', 'Techno', 'Xeno', 'Ecto', 'Proto', 'Cryo', 'Omni',
  'Archi', 'Digi', 'Eco', 'Electro', 'Helio', 'Hydro', 'Infra', 'Macro', 'Micro', 'Multi',
  'Nano', 'Para', 'Poly', 'Pyro', 'Super', 'Sync', 'Thermo', 'Tri', 'Uni', 'Zero'
];

const silabas = [
  'ka', 'ra', 'ta', 'ki', 'ru', 'tu', 'ke', 're', 'ti', 'ko',
  'ma', 'na', 'pa', 'la', 'sa', 'ja', 'ba', 'za', 'ga', 'va',
  'me', 'ne', 'pe', 'le', 'se', 'je', 'be', 'ze', 'ge', 've',
  'mi', 'ni', 'pi', 'li', 'si', 'ji', 'bi', 'zi', 'gi', 'vi',
  'mo', 'no', 'po', 'lo', 'so', 'jo', 'bo', 'zo', 'go', 'vo'
];

// Novas listas para tipos adicionais
const elementosNatureza = [
  'Terra', 'Água', 'Fogo', 'Ar', 'Éter', 'Raio', 'Gelo', 'Lava', 'Madeira', 'Metal',
  'Luz', 'Sombra', 'Trevas', 'Névoa', 'Poeira', 'Tempestade', 'Trovão', 'Relâmpago',
  'Areia', 'Cristal', 'Rocha', 'Neblina', 'Vapor', 'Vento', 'Brisa', 'Tornado', 'Furacão'
];

const mitologiaEntidades = [
  'Titã', 'Deus', 'Deusa', 'Semideus', 'Herói', 'Oráculo', 'Sílfide', 'Ninfa', 'Fada',
  'Valquíria', 'Druida', 'Xamã', 'Vidente', 'Profeta', 'Espectro', 'Elemental', 'Ancião',
  'Guardião', 'Sentinela', 'Arauto', 'Paladino', 'Avatar', 'Lenda', 'Mito', 'Espírito'
];

const cores = [
  'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja', 'Turquesa', 'Violeta',
  'Índigo', 'Carmesim', 'Esmeralda', 'Safira', 'Rubi', 'Âmbar', 'Jade', 'Obsidiana',
  'Prata', 'Ouro', 'Bronze', 'Cobre', 'Marfim', 'Ébano', 'Prismático', 'Iridescente'
];

const numerosFantasia = [
  'Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez',
  'Zero', 'Cem', 'Mil', 'Primeiro', 'Último', 'Prime', 'Dual', 'Triple', 'Quad', 'Alpha',
  'Omega', 'Delta', 'Beta', 'Sigma', 'Infinito', 'Eterno', 'Único', 'Singular', 'Múltiplo'
];

// Função para gerar um nome baseado em estilo de mídia popular
const gerarNomeMidia = () => {
  const estilos = [
    // Estilo espacial (Star Wars, Star Trek)
    () => {
      const prefixos = ['Star', 'Cosmo', 'Galaxy', 'Astro', 'Nova', 'Stellar', 'Orion', 'Nebula'];
      const sufixos = ['Walker', 'Rider', 'Voyager', 'Trek', 'Journey', 'Quest', 'Hunter', 'Seeker'];
      return `${obterElementoAleatorio(prefixos)} ${obterElementoAleatorio(sufixos)}`;
    },
    // Estilo medieval/fantasia (Game of Thrones, Lord of the Rings)
    () => {
      const titulos = ['Lord', 'Lady', 'Knight', 'Master', 'Elder', 'King', 'Queen', 'Prince'];
      const locais = ['Realm', 'Kingdom', 'Land', 'Castle', 'Throne', 'Crown', 'Tower', 'Keep'];
      return `${obterElementoAleatorio(titulos)} of the ${obterElementoAleatorio(locais)}`;
    },
    // Estilo cyberpunk/futurista
    () => {
      const prefixos = ['Neo', 'Cyber', 'Digital', 'Tech', 'Synth', 'Bio', 'Mech', 'Chrome'];
      const sufixos = ['Punk', 'Wave', 'Runner', 'Mind', 'Edge', 'Core', 'Net', 'Link'];
      return `${obterElementoAleatorio(prefixos)}${obterElementoAleatorio(sufixos)} ${gerarNumeroAleatorio(1000, 9999)}`;
    },
    // Estilo mágico/místico
    () => {
      const adjetivosMisticos = ['Ancient', 'Mystic', 'Arcane', 'Ethereal', 'Celestial', 'Divine', 'Sacred', 'Eldritch'];
      const objetosMagicos = ['Grimoire', 'Artifact', 'Relic', 'Tome', 'Scroll', 'Wand', 'Staff', 'Crystal'];
      return `The ${obterElementoAleatorio(adjetivosMisticos)} ${obterElementoAleatorio(objetosMagicos)}`;
    }
  ];
  return estilos[Math.floor(Math.random() * estilos.length)]();
};

const gerarNomeNumeroFantasia = () => {
  // Escolhe um número de fantasia e combina com um substantivo ou adjetivo
  const numero = obterElementoAleatorio(numerosFantasia);
  const tipo = Math.random() > 0.5 ? obterElementoAleatorio(substantivos) : obterElementoAleatorio(adjetivos);
  
  // 50% de chance de inverter a ordem
  return Math.random() > 0.5 ? `${numero} ${tipo}` : `${tipo} ${numero}`;
};

export default function Aleatorios() {
  const [tipoNome, setTipoNome] = useState('composto');
  const [nomeGerado, setNomeGerado] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [nomesAnteriores, setNomesAnteriores] = useState<string[]>([]);
  const [nomesGerados, setNomesGerados] = useState<Set<string>>(new Set());
  const [comprimento, setComprimento] = useState<'curto' | 'medio' | 'longo'>('medio');

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
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      let resultado = '';
      const fatorComprimento = getFatorComprimento();
      
      const gerarNomeSwitch = () => {
        switch(tipoNome) {
          case 'composto':
            // Substantivo + Adjetivo (ex: SolDourado)
            return obterElementoAleatorio(substantivos) + capitalizar(obterElementoAleatorio(adjetivos));
            
          case 'fantasia':
            // Prefixo criativo + Substantivo + Sufixo criativo (ex: NeoSolIan)
            return obterElementoAleatorio(prefixosCriativos) + 
                  obterElementoAleatorio(substantivos) + 
                  obterElementoAleatorio(sufixosCriativos);
            
          case 'acao':
            // Verbo + Substantivo (ex: VoarEstrela)
            return capitalizar(obterElementoAleatorio(verbos)) + 
                  obterElementoAleatorio(substantivos);
            
          case 'silabas': {
            // Combinação de sílabas aleatórias (quantidade ajustada pelo fator de comprimento)
            const numSilabas = Math.max(2, Math.round(gerarNumeroAleatorio(2, 4) * fatorComprimento));
            let resultado = '';
            for (let i = 0; i < numSilabas; i++) {
              resultado += capitalizar(obterElementoAleatorio(silabas));
            }
            return resultado;
          }
            
          case 'elementos': {
            // Elemento da natureza + Adjetivo ou Substantivo
            const elemento = obterElementoAleatorio(elementosNatureza);
            return Math.random() > 0.5 
              ? elemento + capitalizar(obterElementoAleatorio(adjetivos))
              : elemento + capitalizar(obterElementoAleatorio(substantivos));
          }
            
          case 'mitologia': {
            // Entidade mitológica + Adjetivo ou Elemento
            const entidade = obterElementoAleatorio(mitologiaEntidades);
            return Math.random() > 0.5
              ? entidade + 'De' + capitalizar(obterElementoAleatorio(elementosNatureza))
              : entidade + capitalizar(obterElementoAleatorio(adjetivos));
          }
            
          case 'cores': {
            // Cor + Substantivo ou cor + Entidade
            const cor = obterElementoAleatorio(cores);
            return Math.random() > 0.5
              ? cor + capitalizar(obterElementoAleatorio(substantivos))
              : cor + capitalizar(obterElementoAleatorio(mitologiaEntidades));
          }
            
          case 'midia':
            // Nome baseado em estilos de mídia popular
            return gerarNomeMidia();
            
          case 'numeros':
            // Nome baseado em números fantasiosos
            return gerarNomeNumeroFantasia();
            
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
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
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'elementos' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('elementos')}
                >
                  Elementos
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'mitologia' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('mitologia')}
                >
                  Mitologia
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'cores' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('cores')}
                >
                  Cores
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'midia' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('midia')}
                >
                  Mídia
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${tipoNome === 'numeros' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setTipoNome('numeros')}
                >
                  Números
                </button>
              </div>
              
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Comprimento
              </label>
              <div className="flex mb-6 gap-3">
                <button 
                  className={`flex-1 px-4 py-2 rounded-lg ${comprimento === 'curto' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setComprimento('curto')}
                >
                  Curto
                </button>
                <button 
                  className={`flex-1 px-4 py-2 rounded-lg ${comprimento === 'medio' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setComprimento('medio')}
                >
                  Médio
                </button>
                <button 
                  className={`flex-1 px-4 py-2 rounded-lg ${comprimento === 'longo' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setComprimento('longo')}
                >
                  Longo
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
          
          {nomesAnteriores.length > 0 && (
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mt-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nomes anteriores:
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
  );
} 