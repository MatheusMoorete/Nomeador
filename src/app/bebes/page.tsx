'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import AdBanner from '@/components/AdBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';

// Interface para nomes completos com significado e características
interface NomeCompleto {
  nome: string;
  significado: string;
  caracteristica: string;
}

// Listas de nomes por gênero e origem com significados e características
const nomesMeninoCompletos: Record<string, NomeCompleto[]> = {
  brasileiro: [
    {
      nome: "Matheus",
      significado: "dom de Deus, presente de Deus ou dádiva de Deus",
      caracteristica: "Costumam ser agitados"
    },
    {
      nome: "Enzo",
      significado: "senhor do lar, príncipe do lar",
      caracteristica: "Geralmente são líderes desde pequenos"
    },
    {
      nome: "Miguel",
      significado: "quem é como Deus?",
      caracteristica: "Têm um senso de justiça forte"
    },
    {
      nome: "Lucas",
      significado: "luminoso, iluminado",
      caracteristica: "Costumam ser observadores e curiosos"
    },
    {
      nome: "Gabriel",
      significado: "homem de Deus, mensageiro de Deus",
      caracteristica: "Tendem a ser comunicativos e expressivos"
    },
    {
      nome: "Arthur",
      significado: "urso corajoso, forte como um urso",
      caracteristica: "Demonstram maturidade desde cedo"
    },
    {
      nome: "Theo",
      significado: "Deus, presente divino",
      caracteristica: "São afetuosos e gostam de aconchego"
    },
    {
      nome: "Davi",
      significado: "amado, querido, predileto",
      caracteristica: "Carregam um charme natural"
    },
    {
      nome: "Rafael",
      significado: "Deus curou, curado por Deus",
      caracteristica: "São prestativos e bons ouvintes"
    },
    {
      nome: "Heitor",
      significado: "aquele que guarda, defensor",
      caracteristica: "Geralmente são protetores"
    },
    {
      nome: "Henrique",
      significado: "senhor do lar, príncipe do lar",
      caracteristica: "Têm espírito aventureiro"
    },
    {
      nome: "Gustavo",
      significado: "protegido por Deus, apoio dos godos",
      caracteristica: "São estrategistas natos"
    },
    {
      nome: "Bruno",
      significado: "moreno, marrom, castanho",
      caracteristica: "Costumam ser sensíveis, mesmo que não demonstrem"
    },
    {
      nome: "Felipe",
      significado: "amigo dos cavalos, amante dos cavalos",
      caracteristica: "Têm empatia pelos animais"
    },
    {
      nome: "Caio",
      significado: "alegre, contente, feliz",
      caracteristica: "Geralmente são bem-humorados"
    },
    {
      nome: "Samuel",
      significado: "nome de Deus, Deus ouve",
      caracteristica: "São confiáveis e leais"
    },
    {
      nome: "Lorenzo",
      significado: "natural de Laurento, vitorioso",
      caracteristica: "Têm uma natureza artística"
    },
    {
      nome: "Pedro",
      significado: "pedra, rocha",
      caracteristica: "Costumam ser firmes em suas decisões"
    },
    {
      nome: "Leonardo",
      significado: "valente como um leão",
      caracteristica: "São sonhadores com os pés no chão"
    },
    {
      nome: "João",
      significado: "Deus é cheio de graça",
      caracteristica: "Costumam ser doces e companheiros"
    },
    {
      nome: "Murilo",
      significado: "pequena muralha, fortaleza",
      caracteristica: "São persistentes e focados"
    },
    {
      nome: "Isaac",
      significado: "ele ri, riso, filho da alegria",
      caracteristica: "Têm uma risada contagiante"
    },
    {
      nome: "Vinícius",
      significado: "da natureza do vinho, vinicultor",
      caracteristica: "Gostam de estar rodeados de amigos"
    },
    {
      nome: "Bernardo",
      significado: "forte como um urso, valente como um urso",
      caracteristica: "Protegem quem amam com bravura"
    },
    {
      nome: "Diego",
      significado: "aquele que ensina, instruído",
      caracteristica: "Têm raciocínio rápido"
    },
    {
      nome: "Danilo",
      significado: "Deus é meu juiz",
      caracteristica: "Possuem uma calma que contagia"
    },
    {
      nome: "Otávio",
      significado: "oitavo, nobre, respeitável",
      caracteristica: "Gostam de tradições e histórias antigas"
    },
    {
      nome: "Rael",
      significado: "príncipe de Deus",
      caracteristica: "Inspiram confiança com o olhar"
    },
    {
      nome: "Alexandre",
      significado: "defensor da humanidade",
      caracteristica: "Costumam ser protetores dos amigos"
    },
    {
      nome: "Cauã",
      significado: "gavião, ave de rapina",
      caracteristica: "Têm espírito livre"
    },
  ],
  internacional: [
    {
      nome: "André",
      significado: "viril, másculo, valente",
      caracteristica: "Demonstram coragem em pequenas atitudes"
    },
    {
      nome: "Thiago",
      significado: "aquele que vem do calcanhar",
      caracteristica: "Têm energia de sobra"
    },
    {
      nome: "Rian",
      significado: "pequeno rei",
      caracteristica: "Costumam ser criativos"
    },
    {
      nome: "Nicolas",
      significado: "vitorioso, conquistador do povo",
      caracteristica: "Amam descobrir como as coisas funcionam"
    },
    {
      nome: "Benjamin",
      significado: "filho da felicidade, filho da mão direita",
      caracteristica: "Têm um jeitinho carinhoso"
    },
    {
      nome: "Levi",
      significado: "ligado, unido, atrelado",
      caracteristica: "Gostam de unir as pessoas"
    },
    {
      nome: "Noah",
      significado: "descanso, consolo, paz",
      caracteristica: "Têm alma serena"
    },
    {
      nome: "Eduardo",
      significado: "guardião das riquezas",
      caracteristica: "São responsáveis e dedicados"
    },
    {
      nome: "Ian",
      significado: "Deus é gracioso",
      caracteristica: "Têm personalidade forte"
    },
    {
      nome: "Luan",
      significado: "guerreiro, luar",
      caracteristica: "Têm brilho próprio"
    },
    {
      nome: "Alan",
      significado: "harmonia, pedra, rocha",
      caracteristica: "Têm estilo próprio desde cedo"
    },
    {
      nome: "Otto",
      significado: "rico, próspero, afortunado",
      caracteristica: "Gostam de resolver conflitos"
    },
    {
      nome: "Elias",
      significado: "o Senhor é meu Deus",
      caracteristica: "Têm fé e esperança em tudo que fazem"
    },
    {
      nome: "Zion",
      significado: "terra prometida, refúgio",
      caracteristica: "São determinados em seus objetivos"
    },
    {
      nome: "Yuri",
      significado: "agricultor, trabalhador da terra",
      caracteristica: "Têm olhar analítico"
    },
  ],
  classico: [
    {
      nome: "Victor",
      significado: "vencedor, conquistador",
      caracteristica: "Gostam de desafios"
    },
    {
      nome: "Cristian",
      significado: "seguidor de Cristo",
      caracteristica: "Mostram compaixão com facilidade"
    },
    {
      nome: "Ricardo",
      significado: "príncipe forte, governante corajoso",
      caracteristica: "São confiáveis e protetores"
    },
    {
      nome: "Tomás",
      significado: "gêmeo",
      caracteristica: "Têm sede de conhecimento"
    },
    {
      nome: "Igor",
      significado: "guerreiro da paz",
      caracteristica: "Mostram força até nos detalhes"
    },
    {
      nome: "Marco",
      significado: "marte, guerreiro, dedicado ao deus Marte",
      caracteristica: "Gostam de liderar projetos"
    },
    {
      nome: "Hugo",
      significado: "espírito, mente, inteligência",
      caracteristica: "Têm visão estratégica"
    },
    {
      nome: "Lucca",
      significado: "luminoso, brilhante",
      caracteristica: "Valorizam amizades sinceras"
    },
    {
      nome: "Estêvão",
      significado: "coroado, vitorioso",
      caracteristica: "Demonstram calma sob pressão"
    },
    {
      nome: "Emanuel",
      significado: "Deus está conosco",
      caracteristica: "São acolhedores"
    },
    {
      nome: "Joaquim",
      significado: "Deus estabeleceu",
      caracteristica: "Têm energia contagiante"
    },
    {
      nome: "Augusto",
      significado: "sagrado, majestoso, venerável",
      caracteristica: "Inspiram respeito naturalmente"
    },
    {
      nome: "Cael",
      significado: "corajoso, guerreiro",
      caracteristica: "Têm espírito criativo e curioso"
    },
    {
      nome: "Gael",
      significado: "belo e generoso, protegido",
      caracteristica: "Gostam de liberdade e movimento"
    },
    {
      nome: "Dylan",
      significado: "filho do mar",
      caracteristica: "Têm ligação forte com a natureza"
    },
    {
      nome: "Apollo",
      significado: "deus da luz, da medicina e da arte",
      caracteristica: "Transmitem luz por onde passam"
    },
    {
      nome: "Adriel",
      significado: "assembleia de Deus",
      caracteristica: "Buscam harmonia e equilíbrio"
    },
    {
      nome: "Zaqueu",
      significado: "puro, inocente",
      caracteristica: "Têm mente inquieta"
    },
    {
      nome: "Ezequiel",
      significado: "Deus fortalece",
      caracteristica: "Gostam de filosofar"
    },
    {
      nome: "Brian",
      significado: "forte, nobre",
      caracteristica: "Têm senso de justiça elevado"
    },
    {
      nome: "Dante",
      significado: "duradouro, constante",
      caracteristica: "Enfrentam o desconhecido com coragem"
    },
    {
      nome: "Eliseu",
      significado: "Deus é salvação",
      caracteristica: "Mostram maturidade fora do comum"
    },
    {
      nome: "Saulo",
      significado: "pedido, desejado",
      caracteristica: "São intensos e leais"
    },
    {
      nome: "Ângelo",
      significado: "mensageiro, anjo",
      caracteristica: "Têm um coração acolhedor"
    },
    {
      nome: "Isaque",
      significado: "riso, alegria",
      caracteristica: "Sabem alegrar os outros"
    },
  ]
};

// Lista de nomes completos para meninas
const nomesMeninaCompletas: Record<string, NomeCompleto[]> = {
  brasileiro: [
    {
      nome: "Helena",
      significado: "luz brilhante, tocha, raio de sol",
      caracteristica: "Costumam ser iluminadas e alegres"
    },
    {
      nome: "Alice",
      significado: "verdade, nobreza",
      caracteristica: "Têm imaginação fértil"
    },
    {
      nome: "Valentina",
      significado: "forte, saudável, valente",
      caracteristica: "São corajosas desde pequenas"
    },
    {
      nome: "Laura",
      significado: "loureiro, coroada de louros",
      caracteristica: "Mostram determinação em seus objetivos"
    },
    {
      nome: "Sophia",
      significado: "sabedoria",
      caracteristica: "Demonstram inteligência aguçada"
    },
    {
      nome: "Isabella",
      significado: "consagrada a Deus",
      caracteristica: "Costumam ser observadoras"
    },
    {
      nome: "Manuela",
      significado: "Deus está conosco",
      caracteristica: "Gostam de estar perto de quem amam"
    },
    {
      nome: "Júlia",
      significado: "jovem, cheia de juventude",
      caracteristica: "Mantêm espírito alegre e leve"
    },
    {
      nome: "Heloísa",
      significado: "guerreira famosa, saudável",
      caracteristica: "São comunicativas e expressivas"
    },
    {
      nome: "Lívia",
      significado: "invejada, pálida",
      caracteristica: "Têm personalidade magnética"
    },
    {
      nome: "Maria",
      significado: "senhora soberana, pura, amada por Deus",
      caracteristica: "Transmitem paz por onde passam"
    },
    {
      nome: "Cecília",
      significado: "que não enxerga sua própria beleza",
      caracteristica: "Têm talentos artísticos"
    },
    {
      nome: "Lorena",
      significado: "a laureada, coroada com louros",
      caracteristica: "Possuem refinamento natural"
    },
    {
      nome: "Eloá",
      significado: "minha Deus, Deus é Jeová",
      caracteristica: "São introspectivas e profundas"
    },
    {
      nome: "Giovanna",
      significado: "presente de Deus, agraciada por Deus",
      caracteristica: "Mostram gentileza em pequenos gestos"
    },
    {
      nome: "Maria Luísa",
      significado: "guerreira ilustre, combatente gloriosa",
      caracteristica: "Defendem seus ideais com firmeza"
    },
    {
      nome: "Beatriz",
      significado: "aquela que traz felicidade",
      caracteristica: "Costumam trazer clima leve aos ambientes"
    },
    {
      nome: "Maria Júlia",
      significado: "jovem senhora soberana",
      caracteristica: "Combinam tradição com juventude"
    },
    {
      nome: "Mariana",
      significado: "cheia de graça, graciosa",
      caracteristica: "Têm charme especial"
    },
    {
      nome: "Antonella",
      significado: "inestimável, digna de apreço",
      caracteristica: "São valorizadas por sua autenticidade"
    },
  ],
  internacional: [
    {
      nome: "Emma",
      significado: "universal, integral, completa",
      caracteristica: "Costumam ter visão holística"
    },
    {
      nome: "Olivia",
      significado: "paz, oliva, oliveira",
      caracteristica: "Têm capacidade pacificadora"
    },
    {
      nome: "Ava",
      significado: "vida, vivacidade",
      caracteristica: "São enérgicas e vitais"
    },
    {
      nome: "Charlotte",
      significado: "mulher livre, forte",
      caracteristica: "Valorizam independência desde cedo"
    },
    {
      nome: "Amelia",
      significado: "trabalho, industriosa",
      caracteristica: "Mostram dedicação em suas tarefas"
    },
    {
      nome: "Mia",
      significado: "minha, amada",
      caracteristica: "Despertam carinho imediato"
    },
    {
      nome: "Harper",
      significado: "tocadora de harpa",
      caracteristica: "Têm afinidade com artes"
    },
    {
      nome: "Evelyn",
      significado: "vida, vivacidade",
      caracteristica: "Transmitem vitalidade"
    },
    {
      nome: "Abigail",
      significado: "fonte de alegria",
      caracteristica: "Tendem a ser otimistas"
    },
    {
      nome: "Emily",
      significado: "rival, competidora, laboriosa",
      caracteristica: "Têm espírito competitivo saudável"
    },
    {
      nome: "Elizabeth",
      significado: "consagrada a Deus, juramento de Deus",
      caracteristica: "São fiéis aos seus princípios"
    },
    {
      nome: "Sofia",
      significado: "sabedoria",
      caracteristica: "Mostram maturidade emocional"
    },
    {
      nome: "Avery",
      significado: "governante dos elfos",
      caracteristica: "Têm imaginação deslumbrante"
    },
    {
      nome: "Ella",
      significado: "fada, deusa, bela",
      caracteristica: "Carregam uma aura especial"
    },
    {
      nome: "Madison",
      significado: "filha de Matthew, presente poderoso",
      caracteristica: "São fortes e resilientes"
    },
  ],
  classico: [
    {
      nome: "Ana",
      significado: "cheia de graça, graciosidade",
      caracteristica: "Possuem elegância natural"
    },
    {
      nome: "Francisca",
      significado: "livre, francesa",
      caracteristica: "Têm espírito livre"
    },
    {
      nome: "Antônia",
      significado: "inestimável, valiosa",
      caracteristica: "São preciosas e únicas"
    },
    {
      nome: "Adriana",
      significado: "pessoa do mar Adriático",
      caracteristica: "Costumam ser fluidas como água"
    },
    {
      nome: "Juliana",
      significado: "jovem, cheia de juventude",
      caracteristica: "Mantêm energia jovial"
    },
    {
      nome: "Márcia",
      significado: "guerreira, consagrada a Marte",
      caracteristica: "São determinadas em suas lutas"
    },
    {
      nome: "Fernanda",
      significado: "ousada na paz",
      caracteristica: "Buscam harmonia com coragem"
    },
    {
      nome: "Patrícia",
      significado: "nobre, aristocrata",
      caracteristica: "Têm postura respeitável"
    },
    {
      nome: "Aline",
      significado: "luz, brilhante, nobre",
      caracteristica: "Iluminam os ambientes"
    },
    {
      nome: "Sandra",
      significado: "defensora dos homens",
      caracteristica: "São protetoras por natureza"
    },
    {
      nome: "Camila",
      significado: "mensageira, jovem assistente em rituais",
      caracteristica: "Gostam de ajudar outros"
    },
    {
      nome: "Amanda",
      significado: "digna de amor, amável",
      caracteristica: "Despertam afeto espontâneo"
    },
    {
      nome: "Bruna",
      significado: "marrom, morena",
      caracteristica: "Têm personalidade acolhedora"
    },
    {
      nome: "Jéssica",
      significado: "aquela que Deus contempla",
      caracteristica: "São intuitivas e perceptivas"
    },
    {
      nome: "Letícia",
      significado: "alegria, felicidade",
      caracteristica: "Espalham bom humor"
    },
    {
      nome: "Simone",
      significado: "aquela que ouve, a ouvinte",
      caracteristica: "São ótimas conselheiras"
    },
    {
      nome: "Carolina",
      significado: "mulher, rainha",
      caracteristica: "Têm presença marcante"
    },
    {
      nome: "Vanessa",
      significado: "borboleta",
      caracteristica: "Passam por transformações com graça"
    },
    {
      nome: "Natália",
      significado: "nascida no dia de Natal",
      caracteristica: "Trazem um brilho especial"
    },
    {
      nome: "Clarice",
      significado: "ilustre, famosa, brilhante",
      caracteristica: "Demonstram clareza de pensamento"
    },
  ]
};

// Manter as listas originais de nomes simples para compatibilidade
const nomesMenino = {
  brasileiro: nomesMeninoCompletos.brasileiro.map(item => item.nome),
  internacional: nomesMeninoCompletos.internacional.map(item => item.nome),
  classico: nomesMeninoCompletos.classico.map(item => item.nome)
};

// Atualizar a lista de nomes de menina para incluir os novos nomes completos
const nomesMenina = {
  brasileiro: nomesMeninaCompletas.brasileiro.map(item => item.nome),
  internacional: nomesMeninaCompletas.internacional.map(item => item.nome),
  classico: nomesMeninaCompletas.classico.map(item => item.nome)
};

export default function Bebes() {
  const [genero, setGenero] = useState('menino');
  const [origem, setOrigem] = useState('brasileiro');
  const [nomeGerado, setNomeGerado] = useState('');
  const [significado, setSignificado] = useState('');
  const [caracteristica, setCaracteristica] = useState('');
  const [nomesAnteriores, setNomesAnteriores] = useState<{nome: string; significado?: string; caracteristica?: string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modoGerador, setModoGerador] = useState<'tradicional' | 'ia'>('tradicional');

  const obterNomeCompleto = (nome: string): NomeCompleto | undefined => {
    if (genero === 'menino') {
      const origemAtual = origem as keyof typeof nomesMeninoCompletos;
      return nomesMeninoCompletos[origemAtual].find(item => item.nome === nome);
    } else if (genero === 'menina') {
      const origemAtual = origem as keyof typeof nomesMeninaCompletas;
      return nomesMeninaCompletas[origemAtual].find(item => item.nome === nome);
    }
    return undefined;
  };

  const gerarNome = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      // Escolher uma origem aleatória para mais variedade
      const origens = ['brasileiro', 'internacional', 'classico'];
      const origemAleatoria = origens[Math.floor(Math.random() * origens.length)];
      
      let listaDeNomes: string[] = [];
      
      if (genero === 'menino') {
        listaDeNomes = nomesMenino[origemAleatoria as keyof typeof nomesMenino];
      } else {
        listaDeNomes = nomesMenina[origemAleatoria as keyof typeof nomesMenina];
      }
      
      const indiceAleatorio = Math.floor(Math.random() * listaDeNomes.length);
      const nome = listaDeNomes[indiceAleatorio];
      
      let novoSignificado = '';
      let novaCaracteristica = '';
      
      // Atualizar a origem para buscar o significado e característica corretos
      setOrigem(origemAleatoria);
      
      const nomeCompleto = obterNomeCompleto(nome);
      if (nomeCompleto) {
        novoSignificado = nomeCompleto.significado;
        novaCaracteristica = nomeCompleto.caracteristica;
      }
      
      setNomeGerado(nome);
      setSignificado(novoSignificado);
      setCaracteristica(novaCaracteristica);
      
      // Armazenar o nome atual no histórico, se houver um nome anterior
      if (nomeGerado) {
        setNomesAnteriores(prev => [
          { 
            nome: nomeGerado, 
            significado, 
            caracteristica 
          }, 
          ...prev
        ].slice(0, 5));
      }
      
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
                caracteristica={significado && caracteristica 
                  ? `Significado: ${significado}\nCaracterística: ${caracteristica}`
                  : significado 
                    ? `Significado: ${significado}` 
                    : caracteristica 
                      ? `Característica: ${caracteristica}`
                      : ''}
                onGerarNovo={gerarNome}
                corDestaque={genero === 'menino' 
                  ? 'text-blue-500 dark:text-blue-400' 
                  : 'text-pink-500 dark:text-pink-400'}
                mostrarAnuncio={false}
                categoria="bebes"
              />
              
              <AdBanner adSlot="bebes-historico" />
              
              {nomesAnteriores.length > 0 && (
                <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mt-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Nomes anteriores:
                  </h3>
                  <div className="space-y-3">
                    {nomesAnteriores.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <div className="font-medium text-lg">
                          {item.nome}
                        </div>
                        {item.significado && (
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Significado:</span> {item.significado}
                          </div>
                        )}
                        {item.caracteristica && (
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Característica:</span> {item.caracteristica}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl mt-8">
          <AdBanner adSlot="bebes-footer" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 