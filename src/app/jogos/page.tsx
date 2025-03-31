'use client';

import { useState, useEffect } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';

// Lista de prefixos e sufixos para formar nicknames
const prefixos = [
  'Dark', 'Pro', 'Mega', 'Ultra', 'Epic', 'Royal', 'Shadow', 'Cyber', 
  'Death', 'Master', 'King', 'Queen', 'Toxic', 'Hyper', 'Super', 
  'Ninja', 'Ghost', 'Wild', 'Elite', 'Fatal', 'Void', 'Chaos', 'Apex',
  'Prime', 'Ace', 'Neon', 'Psycho', 'Omega', 'Alpha', 'Zero', 'Tech',
  'Fast', 'Blitz', 'Fury', 'War', 'Grim', 'Rogue', 'Steel', 'Thunder',
  'Rapid', 'Ice', 'Fire', 'Frost', 'Flame', 'Storm', 'Savage', 'Mystic',
  'Neo', 'Quantum', 'Cosmic', 'Silent', 'Stealth', 'Lucky', 'Doom', 'Iron',
  'Laser', 'Crypto', 'Pixel', 'Glitch', 'Power', 'Astro', 'Metro', 'Venom'
];

const sufixos = [
  'Killer', 'Master', 'Gamer', 'Sniper', 'Hunter', 'Warrior', 'Ninja', 'Legend', 
  'Beast', 'Destroyer', 'Player', 'Champion', 'Assassin', 'Wizard', 'Knight', 
  'Titan', 'Falcon', 'Dragon', 'Phoenix', 'Wolf', 'Hawk', 'Eagle', 'Tiger',
  'Lion', 'Shark', 'Demon', 'Angel', 'Reaper', 'Phantom', 'Ghost', 'Shadow',
  'Slayer', 'Rage', 'Fury', 'Shot', 'Strike', 'Blade', 'Sword', 'Shield',
  'Skull', 'Flame', 'Frost', 'Storm', 'Bolt', 'Thunder', 'Blaze', 'Viper',
  'Fox', 'Cobra', 'Panther', 'Rex', 'Claw', 'Fang', 'Machine', 'Trooper',
  'Squad', 'Elite', 'Guard', 'King', 'Queen', 'Lord', 'Prince', 'Knight'
];

const palavrasEpicas = [
  'Nemesis', 'Vortex', 'Phoenix', 'Reaper', 'Venom', 'Legion', 'Inferno', 'Abyss', 
  'Oblivion', 'Zenith', 'Specter', 'Havoc', 'Onyx', 'Raven', 'Titan', 
  'Nexus', 'Eclipse', 'Nova', 'Fury', 'Orion', 'Phantom', 'Cipher', 'Vector',
  'Omega', 'Genesis', 'Kraken', 'Sentinel', 'Avalanche', 'Tempest', 'Hypernova',
  'Ronin', 'Shogun', 'Overlord', 'Valkyrie', 'Athena', 'Zeus', 'Thor', 'Odin',
  'Apollo', 'Artemis', 'Chronos', 'Poseidon', 'Olympus', 'Ragnarok', 'Valhalla',
  'Matrix', 'Catalyst', 'Enigma', 'Axiom', 'Wraith', 'Ethereal', 'Celestial'
];

const caracteresEspeciais = ['_', 'x', '.', '-', '0', '$', '7', '9', 'z', 'X', 
  '!', '?', '#', '*', '^', '>', '<', '=', '+', '~', '|', 'v', 'ツ', '✦', '★', '♕'
];

// Palavras temáticas por tipos de jogos
const palavrasTematicas = {
  fps: ['Scope', 'Aim', 'Shot', 'Caliber', 'Bullet', 'Headshot', 'Tactical', 'Target'],
  rpg: ['Mage', 'Paladin', 'Druid', 'Rogue', 'Bard', 'Knight', 'Cleric', 'Wizard'],
  moba: ['Lane', 'Jungle', 'Mid', 'Support', 'Carry', 'Tank', 'Gank', 'Feed'],
  estrategia: ['Mind', 'Genius', 'Plan', 'Chess', 'Tactic', 'Command', 'Intel', 'Logic'],
  esportes: ['Goal', 'Score', 'Rush', 'Race', 'Drift', 'Speed', 'Kick', 'Champ'],
  terror: ['Fear', 'Crypt', 'Dread', 'Haunt', 'Scary', 'Creep', 'Ghost', 'Spirit']
};

// Lista de nomes científicos para o estilo científico
const nomesCientificos = [
  // Plantas e animais com nome científico e nome popular
  { cientifico: 'Melozone fusca', popular: 'Tico-tico-de-faces-ruivas' },
  { cientifico: 'Hypsiboas punctatus', popular: 'Perereca-pintada' },
  { cientifico: 'Nyctimene robinsoni', popular: 'Morcego-de-nariz-tubo' },
  { cientifico: 'Oxalis pes-caprae', popular: 'Trevo-azedo-amarelo' },
  { cientifico: 'Thamnophis sirtalis', popular: 'Cobra-listra-comum' },
  { cientifico: 'Peromyscus maniculatus', popular: 'Rato-saltador-americano' },
  { cientifico: 'Trimeresurus trigonocephalus', popular: 'Víbora-verde-do-ceilão' },
  { cientifico: 'Ranitomeya amazonica', popular: 'Sapo-ponta-de-flecha' },
  { cientifico: 'Corydoras habrosus', popular: 'Peixe-gato-anão' },
  { cientifico: 'Amanita muscaria', popular: 'Cogumelo-alucinógeno' },
  { cientifico: 'Eptesicus fuscus', popular: 'Morcego-marrom' },
  { cientifico: 'Ursus arctos horribilis', popular: 'Urso-pardo (grizzly)' },
  { cientifico: 'Sturnus vulgaris', popular: 'Estorninho-europeu' },
  { cientifico: 'Pseudacris crucifer', popular: 'Rã-do-primavera' },
  { cientifico: 'Salvinia molesta', popular: 'Samambaia-d\'água' },
  { cientifico: 'Crinum asiaticum', popular: 'Lírio-gigante' },
  { cientifico: 'Sceloporus occidentalis', popular: 'Lagarto-do-ocidente' },
  { cientifico: 'Boophis madagascariensis', popular: 'Rã-verde-de-madagáscar' },
  { cientifico: 'Nepenthes alata', popular: 'Planta-carnívora' },
  { cientifico: 'Cereus peruvianus', popular: 'Cacto-coluna' },
  { cientifico: 'Ornithorhynchus anatinus', popular: 'Ornitorrinco' },
  { cientifico: 'Callithrix jacchus', popular: 'Sagui-de-tufo-branco' },
  { cientifico: 'Tetradymia canescens', popular: 'Arbusto-de-coelho' },
  { cientifico: 'Daubentonia madagascariensis', popular: 'Aye-aye (Lêmure-de-madagáscar)' },
  { cientifico: 'Nicotiana glauca', popular: 'Fumo-bravo' },
  { cientifico: 'Pantherophis guttatus', popular: 'Cobra-do-milho' },
  { cientifico: 'Mephitis mephitis', popular: 'Gambá-listrado' },
  { cientifico: 'Myotis lucifugus', popular: 'Morcego-marrom-pequeno' },
  { cientifico: 'Vulpes zerda', popular: 'Raposa-do-deserto' },
  { cientifico: 'Tragulus kanchil', popular: 'Cervo-rato' },
  { cientifico: 'Dasypus novemcinctus', popular: 'Tatu-galinha' },
  { cientifico: 'Felis margarita', popular: 'Gato-do-deserto' },
  { cientifico: 'Balaeniceps rex', popular: 'Cegonha-bico-de-sapato' },
  { cientifico: 'Phyllobates terribilis', popular: 'Rã-dourada-venenosa' },
  { cientifico: 'Saguinus oedipus', popular: 'Sagui-de-cabeça-branca' },
  { cientifico: 'Petaurus breviceps', popular: 'Petauro-do-açúcar' },
  { cientifico: 'Rattus norvegicus', popular: 'Rato-marrom' },
  { cientifico: 'Crotalus adamanteus', popular: 'Cascavel-diamante' },
  { cientifico: 'Catharanthus roseus', popular: 'Vincapervinca-rosa' },
  { cientifico: 'Euphorbia milii', popular: 'Coroa-de-cristo' },
  { cientifico: 'Cynomys ludovicianus', popular: 'Cão-da-pradaria' },
  { cientifico: 'Capparis spinosa', popular: 'Alcaparra' },
  { cientifico: 'Arctostaphylos uva-ursi', popular: 'Uva-de-urso' },
  { cientifico: 'Atropa belladonna', popular: 'Beladona' },
  { cientifico: 'Digitalis purpurea', popular: 'Dedaleira' },
  { cientifico: 'Gentiana lutea', popular: 'Genciana' },
  { cientifico: 'Cicuta maculata', popular: 'Cicuta' },
  { cientifico: 'Colchicum autumnale', popular: 'Açafrão-do-outono' },
  { cientifico: 'Taxus baccata', popular: 'Teixo' },
  { cientifico: 'Mandragora officinarum', popular: 'Mandrágora' },
  { cientifico: 'Lobelia inflata', popular: 'Erva-indiana' },
  { cientifico: 'Salvia divinorum', popular: 'Sálvia-sagrada' },
  { cientifico: 'Psychotria viridis', popular: 'Chacrona (ayahuasca)' },
  { cientifico: 'Banisteriopsis caapi', popular: 'Cipó-mariri' },
  { cientifico: 'Entada rheedii', popular: 'Planta dos sonhos' },
  { cientifico: 'Calea ternifolia', popular: 'Erva dos sonhos lúcidos' },
  { cientifico: 'Turnera diffusa', popular: 'Damiana' },
  { cientifico: 'Silene undulata', popular: 'Raiz dos sonhos' },
  { cientifico: 'Nymphaea caerulea', popular: 'Lótus azul' },
  { cientifico: 'Peganum harmala', popular: 'Arruda síria' },
  { cientifico: 'Lagenaria siceraria', popular: 'Cabaça' },
  { cientifico: 'Vitex agnus-castus', popular: 'Pimenta-dos-monges' },
  { cientifico: 'Valeriana officinalis', popular: 'Valeriana' },
  { cientifico: 'Huperzia serrata', popular: 'Planta nootrópica' },
  { cientifico: 'Mucuna pruriens', popular: 'Feijão-d\'anta' },
  { cientifico: 'Uncaria tomentosa', popular: 'Unha-de-gato' },
  { cientifico: 'Eleutherococcus senticosus', popular: 'Ginseng siberiano' },
  { cientifico: 'Withania somnifera', popular: 'Ashwagandha' },
  { cientifico: 'Bacopa monnieri', popular: 'Brahmi (memória)' },
  { cientifico: 'Centella asiatica', popular: 'Gotu kola' },
  { cientifico: 'Rhodiola rosea', popular: 'Raiz-dourada' },
  { cientifico: 'Ginkgo biloba', popular: 'Ginkgo' },
  { cientifico: 'Schisandra chinensis', popular: 'Fruta-dos-cinco-sabores' }
];

// Sufixos científicos para combinar com os nomes
const sufixosCientificos = [
  'alba', 'magna', 'major', 'minor', 'rubra', 'nigra', 'vulgaris', 'silvestris',
  'domestica', 'terrestris', 'aquatica', 'sapiens', 'rex', 'maximus', 'minimus',
  'gigantea', 'mirabilis', 'nobilis', 'officinalis', 'vulgaris', 'communis'
];

// Interface para armazenar um nome científico completo com o nome popular
interface NomeCientifico {
  cientifico: string;
  popular: string;
}

export default function Jogos() {
  const [estilo, setEstilo] = useState('composto');
  const [nicknameGerado, setNicknameGerado] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modoGerador, setModoGerador] = useState<'tradicional' | 'ia'>('tradicional');
  const [temaJogo, setTemaJogo] = useState<'geral' | 'fps' | 'rpg' | 'moba' | 'estrategia' | 'esportes' | 'terror'>('geral');
  const [adicionarNumeros, setAdicionarNumeros] = useState(false);
  const [incluirSimbolos, setIncluirSimbolos] = useState(false);
  const [nomesAnteriores, setNomesAnteriores] = useState<string[]>([]);
  const [nomePopular, setNomePopular] = useState('');

  useEffect(() => {
    // Resetar a lista de nomes anteriores quando o modo ou estilo mudar
    setNomesAnteriores([]);
  }, [modoGerador, estilo, temaJogo]);

  const gerarNumeroAleatorio = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Função para selecionar um prefixo apropriado baseado no tema do jogo
  const selecionarPrefixo = () => {
    if (temaJogo === 'geral') {
      return prefixos[Math.floor(Math.random() * prefixos.length)];
    }
    
    // 70% de chance de usar um prefixo geral, 30% de usar um temático do jogo
    if (Math.random() < 0.7) {
      return prefixos[Math.floor(Math.random() * prefixos.length)];
    } else {
      const tematicos = palavrasTematicas[temaJogo] || [];
      return tematicos[Math.floor(Math.random() * tematicos.length)];
    }
  };

  // Função para selecionar um sufixo apropriado baseado no tema do jogo
  const selecionarSufixo = () => {
    if (temaJogo === 'geral') {
      return sufixos[Math.floor(Math.random() * sufixos.length)];
    }
    
    // 70% de chance de usar um sufixo geral, 30% de usar um temático do jogo
    if (Math.random() < 0.7) {
      return sufixos[Math.floor(Math.random() * sufixos.length)];
    } else {
      const tematicos = palavrasTematicas[temaJogo] || [];
      return tematicos[Math.floor(Math.random() * tematicos.length)];
    }
  };

  // Gerar um nome científico
  const gerarNomeCientifico = (): NomeCientifico => {
    // Selecionar um nome científico aleatório
    const nomeSelecionado = nomesCientificos[Math.floor(Math.random() * nomesCientificos.length)];
    
    // 20% de chance de adicionar um sufixo científico adicional
    if (Math.random() < 0.2) {
      const sufixo = sufixosCientificos[Math.floor(Math.random() * sufixosCientificos.length)];
      // Pegar apenas o gênero (primeira palavra) e adicionar o novo sufixo
      const partes = nomeSelecionado.cientifico.split(' ');
      const genero = partes[0];
      return {
        cientifico: `${genero} ${sufixo}`,
        popular: `${nomeSelecionado.popular} (variante)`
      };
    }
    
    return nomeSelecionado;
  };

  // Função para adicionar elementos extras (números, símbolos) ao nickname
  const adicionarExtras = (nick: string) => {
    let resultado = nick;
    
    // Adicionar números se selecionado
    if (adicionarNumeros) {
      const digitos = Math.floor(Math.random() * 3) + 1; // 1 a 3 dígitos
      const numero = Math.floor(Math.random() * Math.pow(10, digitos));
      resultado += numero;
    }
    
    // Adicionar símbolos se selecionado
    if (incluirSimbolos) {
      const simbolo = caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)];
      // 50% de chance no início, 50% no final
      if (Math.random() > 0.5) {
        resultado = simbolo + resultado;
      } else {
        resultado = resultado + simbolo;
      }
    }
    
    return resultado;
  };

  const gerarNickname = () => {
    setIsGenerating(true);
    
    // Simular um breve delay para efeito visual
    setTimeout(() => {
      let resultado = '';
      let tentativas = 0;
      const maxTentativas = 5;
      let nomeCientifico: NomeCientifico | null = null;
      
      // Tentar gerar um nickname que não esteja na lista de usados
      do {
        switch(estilo) {
          case 'composto':
            // Estilo composto: Prefixo + Sufixo (Ex: DarkKiller)
            const prefixoAleatorio = selecionarPrefixo();
            const sufixoAleatorio = selecionarSufixo();
            resultado = prefixoAleatorio + sufixoAleatorio;
            break;
            
          case 'epico':
            // Estilo épico: Uma palavra épica (Ex: Phoenix)
            resultado = palavrasEpicas[Math.floor(Math.random() * palavrasEpicas.length)];
            break;
            
          case 'competitivo':
            // Estilo competitivo: Palavra + Números (Ex: Ninja123)
            const palavra = selecionarPrefixo();
            const numero = gerarNumeroAleatorio(10, 999);
            resultado = palavra + numero;
            break;
            
          case 'simbolos':
            // Estilo com símbolos: Pref_Suf ou x_Palavra_x (Ex: Dark_Killer ou x_Phoenix_x)
            const usarX = Math.random() > 0.5;
            
            if (usarX) {
              const palavra = temaJogo !== 'geral' && Math.random() > 0.5
                ? palavrasTematicas[temaJogo][Math.floor(Math.random() * palavrasTematicas[temaJogo].length)]
                : palavrasEpicas[Math.floor(Math.random() * palavrasEpicas.length)];
              resultado = `x_${palavra}_x`;
            } else {
              const pref = selecionarPrefixo();
              const suf = selecionarSufixo();
              const simbolo = caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)];
              resultado = `${pref}${simbolo}${suf}`;
            }
            break;
            
          case 'curto':
            // Estilo curto: 3-6 letras, simples e impactante
            const basesCurtas = ['Pro', 'Ace', 'Neo', 'Zen', 'Max', 'Rex', 'Vex', 'Ryu', 'Jin', 'Kai'];
            resultado = basesCurtas[Math.floor(Math.random() * basesCurtas.length)];
            // 50% de chance de adicionar um número de 1-99
            if (Math.random() > 0.5) {
              resultado += Math.floor(Math.random() * 99) + 1;
            }
            break;
            
          case 'leet':
            // Estilo leet speak: substituir letras por números
            const palavraBase = selecionarPrefixo() + selecionarSufixo();
            resultado = palavraBase
              .replace(/a/gi, '4')
              .replace(/e/gi, '3')
              .replace(/i/gi, '1')
              .replace(/o/gi, '0')
              .replace(/s/gi, '5')
              .replace(/t/gi, '7')
              .replace(/z/gi, '2');
            break;
            
          case 'cientifico':
            // Estilo científico: nomes científicos de plantas, animais, etc.
            nomeCientifico = gerarNomeCientifico();
            resultado = nomeCientifico.cientifico;
            break;
            
          default:
            resultado = 'GamerPro123';
        }
        
        // Adicionar extras (números, símbolos)
        if (estilo !== 'competitivo' && estilo !== 'leet' && estilo !== 'simbolos' && estilo !== 'cientifico') {
          resultado = adicionarExtras(resultado);
        }
        
        tentativas++;
      } while (
        nomesAnteriores.includes(resultado) && 
        tentativas < maxTentativas
      );
      
      // Adicionar o nome gerado à lista de nomes usados
      setNomesAnteriores([...nomesAnteriores, resultado].slice(-5)); // Manter apenas os últimos 5
      
      setNicknameGerado(resultado);
      
      // Salvar o nome popular para exibição se for um nome científico
      if (nomeCientifico) {
        setNomePopular(nomeCientifico.popular);
      } else {
        setNomePopular('');
      }
      
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg ${estilo === 'composto' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setEstilo('composto')}
                    >
                      Composto
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Combina dois elementos impactantes
                    </p>
                  </div>
                  <div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg ${estilo === 'epico' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setEstilo('epico')}
                    >
                      Épico
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Palavras poderosas de uma única peça
                    </p>
                  </div>
                  <div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg ${estilo === 'competitivo' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setEstilo('competitivo')}
                    >
                      Competitivo
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Combina palavras com números
                    </p>
                  </div>
                  <div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg ${estilo === 'simbolos' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setEstilo('simbolos')}
                    >
                      Com Símbolos
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Adiciona caracteres especiais
                    </p>
                  </div>
                  <div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg ${estilo === 'curto' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setEstilo('curto')}
                    >
                      Curto
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Nomes concisos de 3-6 letras
                    </p>
                  </div>
                  <div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg ${estilo === 'leet' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setEstilo('leet')}
                    >
                      Leet (1337)
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Substitui letras por números (h4ck3r)
                    </p>
                  </div>
                  <div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg ${estilo === 'cientifico' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      onClick={() => setEstilo('cientifico')}
                    >
                      Científico
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Nomes científicos de plantas e animais
                    </p>
                  </div>
                </div>

                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Tema do Jogo
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      temaJogo === 'geral' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setTemaJogo('geral')}
                  >
                    Geral
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      temaJogo === 'fps' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setTemaJogo('fps')}
                  >
                    FPS / Tiro
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      temaJogo === 'rpg' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setTemaJogo('rpg')}
                  >
                    RPG
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      temaJogo === 'moba' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setTemaJogo('moba')}
                  >
                    MOBA
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      temaJogo === 'estrategia' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setTemaJogo('estrategia')}
                  >
                    Estratégia
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      temaJogo === 'esportes' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setTemaJogo('esportes')}
                  >
                    Esportes
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      temaJogo === 'terror' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setTemaJogo('terror')}
                  >
                    Terror
                  </button>
                </div>

                {/* Opções adicionais */}
                {estilo !== 'leet' && estilo !== 'competitivo' && estilo !== 'simbolos' && estilo !== 'cientifico' && (
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adicionarNumeros}
                        onChange={() => setAdicionarNumeros(!adicionarNumeros)}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Adicionar números</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={incluirSimbolos}
                        onChange={() => setIncluirSimbolos(!incluirSimbolos)}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Incluir símbolos</span>
                    </label>
                  </div>
                )}

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
            <div className="space-y-4">
              <NomeDisplay 
                nome={nicknameGerado} 
                onGerarNovo={gerarNickname}
                corDestaque="text-indigo-600 dark:text-indigo-400"
                textoBotaoGerar="Gerar outro nickname"
                categoria="jogos"
                caracteristica={estilo === 'cientifico' && nomePopular ? `Nome Popular: ${nomePopular}` : undefined}
              />
              
              {/* Exibir nomes anteriores */}
              {nomesAnteriores.length > 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Nicknames anteriores:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {nomesAnteriores.slice(0, -1).reverse().map((nome, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300"
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
      </main>
      
      <Footer />
    </div>
  );
} 