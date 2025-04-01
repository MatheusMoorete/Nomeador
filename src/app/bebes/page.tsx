'use client';

import { useState } from 'react';
import NomeDisplay from '@/components/NomeDisplay';
import AdBanner from '@/components/AdBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AINameGenerator from '@/components/AINameGenerator';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getBabyNameData
} from '@/data/babyNames';
import PageTransition from '@/components/PageTransition';

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
      significado: "tocha, reluzente, brilhante",
      caracteristica: "Têm uma luz própria que encanta"
    },
    {
      nome: "Alice",
      significado: "de nobre linhagem, verdadeira",
      caracteristica: "São curiosas e têm sede de aprender"
    },
    {
      nome: "Valentina",
      significado: "valente, forte, cheia de saúde",
      caracteristica: "Mostram força e coragem em tudo"
    },
    {
      nome: "Laura",
      significado: "vitoriosa, triunfante, coroada com louros",
      caracteristica: "São decididas e confiantes"
    },
    {
      nome: "Sophia",
      significado: "sabedoria",
      caracteristica: "Adoram resolver mistérios"
    },
    {
      nome: "Isabella",
      significado: "consagrada a Deus",
      caracteristica: "Têm espírito sensível e generoso"
    },
    {
      nome: "Manuela",
      significado: "Deus está conosco",
      caracteristica: "Demonstram empatia com facilidade"
    },
    {
      nome: "Júlia",
      significado: "jovem, fofa, cheia de juventude",
      caracteristica: "Têm alma leve e divertida"
    },
    {
      nome: "Heloísa",
      significado: "guerreira famosa",
      caracteristica: "São persistentes e fortes"
    },
    {
      nome: "Lívia",
      significado: "pálida, clara, luminosa",
      caracteristica: "Têm alma serena"
    },
    {
      nome: "Maria",
      significado: "senhora soberana, pura, amada por Deus",
      caracteristica: "Transmitem paz por onde passam"
    },
    {
      nome: "Cecília",
      significado: "cego, mas também associado a sabedoria",
      caracteristica: "São doces e muito observadoras"
    },
    {
      nome: "Lorena",
      significado: "natural da cidade de Lorraine",
      caracteristica: "Têm espírito guerreiro"
    },
    {
      nome: "Eloá",
      significado: "minha Deus, Deus é Jeová",
      caracteristica: "São introspectivas e profundas"
    },
    {
      nome: "Giovanna",
      significado: "Deus é cheio de graça",
      caracteristica: "Têm um coração enorme"
    },
    {
      nome: "Maria Luísa",
      significado: "guerreira ilustre, combatente gloriosa",
      caracteristica: "Têm talento para liderar"
    },
    {
      nome: "Beatriz",
      significado: "aquela que traz felicidade",
      caracteristica: "Têm facilidade em fazer os outros sorrirem"
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
      significado: "valiosa, de valor inestimável",
      caracteristica: "São determinadas e encantadoras"
    },
    {
      nome: "Luna",
      significado: "lua",
      caracteristica: "Carregam um ar misterioso e doce"
    },
    {
      nome: "Aurora",
      significado: "amanhecer, o nascer do sol",
      caracteristica: "São otimistas por natureza"
    },
    {
      nome: "Bianca",
      significado: "branca, pura",
      caracteristica: "Gostam de harmonia e beleza"
    },
    {
      nome: "Rebeca",
      significado: "aquela que une, presa com força",
      caracteristica: "Costumam ser protetoras"
    },
    {
      nome: "Melissa",
      significado: "abelha, doce como o mel",
      caracteristica: "Têm uma energia contagiante"
    },
    {
      nome: "Clara",
      significado: "brilhante, ilustre, clara",
      caracteristica: "Passam paz com sua presença"
    },
    {
      nome: "Yasmin",
      significado: "jasmim, flor perfumada",
      caracteristica: "Gostam de agradar quem amam"
    },
    {
      nome: "Mirella",
      significado: "maravilhosa, admirável",
      caracteristica: "Têm um charme delicado"
    },
    {
      nome: "Camila",
      significado: "mensageira dos deuses, aquela que está a serviço",
      caracteristica: "São fiéis e dedicadas"
    },
    {
      nome: "Alana",
      significado: "bela, harmoniosa",
      caracteristica: "Costumam ser livres e criativas"
    },
    {
      nome: "Ayla",
      significado: "luz da lua, aurora, luar",
      caracteristica: "Têm um ar místico e encantador"
    },
    {
      nome: "Nicole",
      significado: "vitoriosa, povo vencedor",
      caracteristica: "Demonstram liderança desde cedo"
    },
    {
      nome: "Stella",
      significado: "estrela",
      caracteristica: "Brilham por onde passam"
    },
    {
      nome: "Maya",
      significado: "água, mãe, ilusão",
      caracteristica: "Gostam de explorar o novo"
    },
    {
      nome: "Elisa",
      significado: "Deus é juramento, prometida de Deus",
      caracteristica: "Costumam ser muito justas"
    },
    {
      nome: "Nina",
      significado: "menina, graciosa",
      caracteristica: "São afetuosas e divertidas"
    },
    {
      nome: "Selena",
      significado: "deusa da lua, luminosa",
      caracteristica: "Têm personalidade marcante"
    },
    {
      nome: "Isis",
      significado: "rainha do trono, poderosa",
      caracteristica: "São decididas e inspiradoras"
    },
    {
      nome: "Amora",
      significado: "nome de fruta (doce e delicada)",
      caracteristica: "Costumam ser doces e únicas"
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
      significado: "oliveira, paz",
      caracteristica: "Mostram calma e elegância natural"
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
      significado: "desejo, vida, luz",
      caracteristica: "Têm olhar sensível ao mundo"
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
      caracteristica: "Inteligentes e questionadoras"
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
    {
      nome: "Penélope",
      significado: "tecelã, fiel esposa",
      caracteristica: "São fiéis e determinadas"
    },
    {
      nome: "Amélie",
      significado: "trabalhadora, ativa",
      caracteristica: "Têm um jeito único de ver o mundo"
    },
    {
      nome: "Zoe",
      significado: "vida",
      caracteristica: "Têm espírito vibrante"
    },
    {
      nome: "Annelise",
      significado: "combinação de 'cheia de graça' e 'consagrada a Deus'",
      caracteristica: "Graciosas e fortes"
    },
    {
      nome: "Emilly",
      significado: "rival, emulação, trabalhadora",
      caracteristica: "Têm espírito doce e sensível"
    },
    {
      nome: "Nathalia",
      significado: "nascimento, renascimento",
      caracteristica: "São cheias de entusiasmo"
    },
    {
      nome: "Kiara",
      significado: "clara, brilhante",
      caracteristica: "São criativas e sonhadoras"
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
      caracteristica: "São sonhadoras com os pés no chão"
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
      nome: "Bruna",
      significado: "morena, de pele escura",
      caracteristica: "Demonstram firmeza e afeto"
    },
    {
      nome: "Amanda",
      significado: "digna de amor, amável",
      caracteristica: "Despertam afeto espontâneo"
    },
    {
      nome: "Jéssica",
      significado: "aquela que Deus contempla",
      caracteristica: "São intuitivas e perceptivas"
    },
    {
      nome: "Letícia",
      significado: "alegria, prazer, deleite",
      caracteristica: "Espalham alegria por onde passam"
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
      significado: "brilhante, ilustre",
      caracteristica: "Costumam ser muito inteligentes"
    },
    {
      nome: "Eva",
      significado: "vida, a que dá vida",
      caracteristica: "São determinadas e leais"
    },
    {
      nome: "Rafaela",
      significado: "curada por Deus",
      caracteristica: "São protetoras naturais"
    },
    {
      nome: "Milena",
      significado: "trabalhadora, graciosa",
      caracteristica: "São doces e determinadas"
    },
    {
      nome: "Jade",
      significado: "pedra preciosa, a que tem valor",
      caracteristica: "São intensas e decididas"
    },
    {
      nome: "Emanuela",
      significado: "Deus está conosco",
      caracteristica: "Transmitem segurança e carinho"
    },
    {
      nome: "Bárbara",
      significado: "estrangeira, forasteira",
      caracteristica: "Mostram personalidade forte"
    },
    {
      nome: "Noemi",
      significado: "agradável, amável",
      caracteristica: "Têm espírito acolhedor"
    },
    {
      nome: "Aurélia",
      significado: "dourada, reluzente",
      caracteristica: "Têm brilho nobre"
    },
    {
      nome: "Yara",
      significado: "senhora das águas",
      caracteristica: "Encantam com sua presença"
    },
    {
      nome: "Agnes",
      significado: "pura, santa",
      caracteristica: "Têm pureza no coração"
    },
    {
      nome: "Alícia",
      significado: "nobre, verdadeira",
      caracteristica: "Gostam de organizar tudo"
    },
    {
      nome: "Chiara",
      significado: "clara, luminosa",
      caracteristica: "Espalham luz com o sorriso"
    },
    {
      nome: "Lara",
      significado: "protetora, alegre",
      caracteristica: "São serenas e confiáveis"
    },
    {
      nome: "Cristal",
      significado: "transparente, pura como cristal",
      caracteristica: "Valorizam a beleza interior"
    },
    {
      nome: "Olga",
      significado: "santa, abençoada",
      caracteristica: "Têm um olhar profundo"
    },
    {
      nome: "Flor",
      significado: "flor, bela flor",
      caracteristica: "Simbolizam delicadeza"
    },
    {
      nome: "Talita",
      significado: "menina, criança",
      caracteristica: "Têm ternura no olhar"
    },
    {
      nome: "Sabrina",
      significado: "princesa, fronteira",
      caracteristica: "Têm espírito romântico"
    },
    {
      nome: "Sol",
      significado: "sol, luz, energia vital",
      caracteristica: "Têm energia vibrante"
    },
    {
      nome: "Violeta",
      significado: "flor roxa, pequena violeta",
      caracteristica: "Têm alma artística"
    },
    {
      nome: "Siena",
      significado: "laranja-avermelhado, referência à cidade italiana",
      caracteristica: "Elegantes e misteriosas"
    },
    {
      nome: "Betina",
      significado: "prometida a Deus",
      caracteristica: "Têm atitude e charme"
    },
    {
      nome: "Manuella",
      significado: "Deus está conosco",
      caracteristica: "Sabem acolher como ninguém"
    },
    {
      nome: "Thalita",
      significado: "menina, jovem mulher",
      caracteristica: "São leves e afetuosas"
    },
    {
      nome: "Adélia",
      significado: "nobre, gentil",
      caracteristica: "Têm beleza clássica"
    },
    {
      nome: "Malu",
      significado: "junção de Maria + Luísa ('amada guerreira')",
      caracteristica: "Espontâneas e alegres"
    },
    {
      nome: "Marina",
      significado: "do mar, marinha",
      caracteristica: "Gostam de tranquilidade e poesia"
    },
    {
      nome: "Hadassa",
      significado: "murta, compaixão",
      caracteristica: "Têm fé e coragem"
    },
    {
      nome: "Nayara",
      significado: "lugar entre as rochas, de origem incerta",
      caracteristica: "Têm espírito livre"
    },
    {
      nome: "Selma",
      significado: "protetora, divina capacitada",
      caracteristica: "Têm coração acolhedor"
    },
    {
      nome: "Hana",
      significado: "graça, favor",
      caracteristica: "Têm ternura no sorriso"
    },
    {
      nome: "Tâmara",
      significado: "palmeira, fruto doce",
      caracteristica: "Têm energia maternal"
    },
    {
      nome: "Ingrid",
      significado: "beleza, fertilidade",
      caracteristica: "Determinação é seu sobrenome"
    },
    {
      nome: "Lana",
      significado: "suave, rocha, harmonia",
      caracteristica: "Leves como a brisa"
    },
    {
      nome: "Kaline",
      significado: "variação moderna, 'mulher pura' (associado a Kalina)",
      caracteristica: "Têm criatividade sem limites"
    },
  ]
};

// Nova lista para nomes neutros
const nomesNeutrosCompletos: NomeCompleto[] = [
  {
    nome: "Alex",
    significado: "defensor da humanidade",
    caracteristica: "São versáteis e adaptáveis"
  },
  {
    nome: "Noah",
    significado: "descanso, paz, consolo",
    caracteristica: "Têm espírito calmo e conciliador"
  },
  {
    nome: "Jordan",
    significado: "aquele que desce, fluir",
    caracteristica: "Costumam ser criativos e originais"
  },
  {
    nome: "Adrian",
    significado: "natural da região do mar Adriático",
    caracteristica: "Gostam de desafios mentais"
  },
  {
    nome: "Cauã",
    significado: "gavião",
    caracteristica: "Ligados à natureza e liberdade"
  },
  {
    nome: "Yuri",
    significado: "agricultor, trabalhador da terra",
    caracteristica: "São observadores e sensíveis"
  },
  {
    nome: "Gael",
    significado: "belo e generoso, protegido",
    caracteristica: "Têm empatia como traço marcante"
  },
  {
    nome: "Andréi",
    significado: "másculo, viril, valente",
    caracteristica: "Costumam ser discretos e inteligentes"
  },
  {
    nome: "Tay",
    significado: "diminutivo de Taylor ou Taylor Swift",
    caracteristica: "Têm espírito leve e criativo"
  },
  {
    nome: "Davi",
    significado: "amado, querido",
    caracteristica: "São carinhosos e afetuosos"
  },
  {
    nome: "Sam",
    significado: "diminutivo de Samuel ou Samantha, 'Deus ouve'",
    caracteristica: "Têm personalidade forte e carismática"
  },
  {
    nome: "Ravi",
    significado: "Sol, luz (em sânscrito)",
    caracteristica: "Inspiram calma e sabedoria"
  },
  {
    nome: "Chris",
    significado: "diminutivo de Christian/Christina, 'seguidor de Cristo'",
    caracteristica: "São comunicativos e sociáveis"
  },
  {
    nome: "Nico",
    significado: "povo vencedor",
    caracteristica: "Têm alma livre e divertida"
  },
  {
    nome: "Dani",
    significado: "diminutivo de Daniel/Daniela, 'Deus é meu juiz'",
    caracteristica: "Gostam de escutar e apoiar"
  },
  {
    nome: "Ariel",
    significado: "leão de Deus",
    caracteristica: "Têm energia mística e inspiradora"
  },
  {
    nome: "Zion",
    significado: "terra prometida, refúgio",
    caracteristica: "Buscam equilíbrio e paz"
  },
  {
    nome: "Eli",
    significado: "elevado, ascensão",
    caracteristica: "São doces e introspectivos"
  },
  {
    nome: "Jean",
    significado: "Deus é cheio de graça",
    caracteristica: "Demonstram calma e firmeza"
  },
  {
    nome: "Kai",
    significado: "mar (havaiano), força (nórdico)",
    caracteristica: "Têm espírito livre e espontâneo"
  },
  {
    nome: "René",
    significado: "renascido, nascido de novo",
    caracteristica: "Gostam de recomeços e transformações"
  },
  {
    nome: "Loren",
    significado: "natural de Laurento",
    caracteristica: "Elegantes e discretos"
  },
  {
    nome: "Morgan",
    significado: "nascido do mar",
    caracteristica: "Têm personalidade forte e enigmática"
  },
  {
    nome: "Ashley",
    significado: "clareira das cinzas",
    caracteristica: "São doces e confiantes"
  },
  {
    nome: "Sasha",
    significado: "diminutivo de Alexander(a), 'defensor(a) da humanidade'",
    caracteristica: "Têm brilho e coragem"
  },
  {
    nome: "Alexis",
    significado: "protetor(a), defensor(a)",
    caracteristica: "Inteligentes e estratégicos"
  },
  {
    nome: "Jules",
    significado: "diminutivo de Julia/Julian, 'jovem', 'macio'",
    caracteristica: "Gostam de arte e literatura"
  },
  {
    nome: "Marin",
    significado: "do mar, marinho",
    caracteristica: "São calmos e observadores"
  },
  {
    nome: "Rowan",
    significado: "pequeno ruivo, árvore encantada",
    caracteristica: "Têm força e delicadeza"
  },
  {
    nome: "Sky",
    significado: "céu, alto",
    caracteristica: "Sonhadores por natureza"
  },
  {
    nome: "Taylor",
    significado: "alfaiate",
    caracteristica: "Têm senso prático e criatividade"
  },
  {
    nome: "Cam",
    significado: "diminutivo de Cameron, 'nariz torto', mas hoje neutro moderno",
    caracteristica: "São discretos e carismáticos"
  },
  {
    nome: "Logan",
    significado: "pequena caverna, descendente",
    caracteristica: "Têm personalidade firme e marcante"
  },
  {
    nome: "Blair",
    significado: "campo, planície",
    caracteristica: "Transmitem elegância"
  },
  {
    nome: "Charlie",
    significado: "diminutivo de Charles/Charlotte, 'homem livre'",
    caracteristica: "Têm senso de humor e leveza"
  },
  {
    nome: "Luan",
    significado: "luar, guerreiro",
    caracteristica: "São serenos e introspectivos"
  },
  {
    nome: "Andrea",
    significado: "valente, másculo, corajoso",
    caracteristica: "Gostam de ajudar e acolher"
  },
  {
    nome: "Emery",
    significado: "poderoso, líder da casa",
    caracteristica: "São persistentes e inovadores"
  },
  {
    nome: "Phoenix",
    significado: "ave mítica que renasce das cinzas",
    caracteristica: "Têm espírito resiliente"
  },
  {
    nome: "Robin",
    significado: "brilhante, fama brilhante",
    caracteristica: "Têm coragem e senso de justiça"
  },
  {
    nome: "Toni",
    significado: "diminutivo de Antônio ou Antônia, 'valioso'",
    caracteristica: "São intuitivos e diretos"
  },
  {
    nome: "Ezra",
    significado: "ajuda, protetor",
    caracteristica: "Gostam de tranquilidade e sabedoria"
  },
  {
    nome: "Reese",
    significado: "entusiasmo, ardor",
    caracteristica: "São determinados e organizados"
  },
  {
    nome: "Alexi",
    significado: "variação de Alexis, 'defensor(a)'",
    caracteristica: "Carregam força e gentileza"
  },
  {
    nome: "Mika",
    significado: "quem é como Deus?",
    caracteristica: "Têm olhar doce e curioso"
  },
  {
    nome: "Alden",
    significado: "amigo velho, sábio conselheiro",
    caracteristica: "Gostam de compartilhar conhecimento"
  },
  {
    nome: "Skyler",
    significado: "erudito, acadêmico",
    caracteristica: "Têm mente inquieta e criativa"
  },
  {
    nome: "Remy",
    significado: "navegador, da região de Reims",
    caracteristica: "Têm uma presença marcante"
  },
  {
    nome: "Rio",
    significado: "rio, fluidez",
    caracteristica: "Têm espírito aventureiro"
  },
  {
    nome: "Casey",
    significado: "valente em batalha",
    caracteristica: "Gostam de resolver conflitos"
  },
  {
    nome: "Jesse",
    significado: "presente de Deus",
    caracteristica: "Têm aura tranquila e forte"
  },
  {
    nome: "Avery",
    significado: "governante dos elfos",
    caracteristica: "Têm essência doce e determinada"
  },
  {
    nome: "Lou",
    significado: "diminutivo de Louise/Louis, 'guerreiro famoso'",
    caracteristica: "São simples e encantadores"
  },
  {
    nome: "Ciel",
    significado: "céu (francês)",
    caracteristica: "Têm alma sensível e poética"
  },
  {
    nome: "Dakota",
    significado: "amigo, aliado (povo nativo americano)",
    caracteristica: "Gostam de união e conexão"
  },
  {
    nome: "Eden",
    significado: "paraíso, lugar de delícias",
    caracteristica: "Têm doçura natural"
  },
  {
    nome: "Lior",
    significado: "minha luz, luz para mim (hebraico)",
    caracteristica: "Brilham de forma sutil"
  },
  {
    nome: "Noel",
    significado: "nascimento, Natal",
    caracteristica: "Têm espírito festivo"
  },
  {
    nome: "Ocean",
    significado: "oceano",
    caracteristica: "Têm alma profunda e misteriosa"
  },
  {
    nome: "Parker",
    significado: "guardião do parque, cuidador",
    caracteristica: "Práticos e protetores"
  },
  {
    nome: "Rory",
    significado: "rei vermelho, corajoso",
    caracteristica: "Gostam de aventura"
  },
  {
    nome: "Sage",
    significado: "sábio, planta medicinal",
    caracteristica: "Têm sabedoria além da idade"
  },
  {
    nome: "Shiloh",
    significado: "tranquilo, pacífico, dádiva",
    caracteristica: "Têm uma calma inspiradora"
  },
  {
    nome: "Téa",
    significado: "diminutivo de Dorotea, 'presente de Deus'",
    caracteristica: "Transmitem leveza"
  },
  {
    nome: "Tami",
    significado: "palmeira, alegria",
    caracteristica: "São criativos e afetuosos"
  },
  {
    nome: "Valen",
    significado: "diminutivo de Valentina ou Valentim, 'forte', 'valente'",
    caracteristica: "São sonhadores com pé no chão"
  },
  {
    nome: "Zuri",
    significado: "belo, bonito (africano)",
    caracteristica: "Têm energia vibrante"
  },
  {
    nome: "Indi",
    significado: "diminutivo de Indigo ou India, 'cor do anil', 'país'",
    caracteristica: "Têm espírito livre"
  },
  {
    nome: "Ren",
    significado: "flor de lótus (japonês)",
    caracteristica: "Gostam da simplicidade"
  },
  {
    nome: "Neo",
    significado: "novo",
    caracteristica: "Têm mente futurista"
  },
  {
    nome: "Eliah",
    significado: "variação de Elias, 'meu Deus é Jeová'",
    caracteristica: "Têm força espiritual"
  },
  {
    nome: "Lennon",
    significado: "amante, amigo querido",
    caracteristica: "São calmos e pensativos"
  },
  {
    nome: "Storm",
    significado: "tempestade, força da natureza",
    caracteristica: "Têm energia intensa"
  },
  {
    nome: "Tris",
    significado: "diminutivo de Tristan ou Trishelle",
    caracteristica: "Têm foco e disciplina"
  },
  {
    nome: "Wren",
    significado: "pássaro pequeno (em inglês)",
    caracteristica: "Têm delicadeza e astúcia"
  },
  {
    nome: "Gray",
    significado: "cinza, equilíbrio",
    caracteristica: "Discretos e estilosos"
  },
  {
    nome: "Aven",
    significado: "bela flor (irlandês)",
    caracteristica: "Têm alma contemplativa"
  },
  {
    nome: "Lane",
    significado: "pequeno caminho",
    caracteristica: "Gostam de caminhar em silêncio"
  },
  {
    nome: "Zephyr",
    significado: "vento oeste, brisa suave",
    caracteristica: "Têm leveza e originalidade"
  }
];

// Verificar e filtrar qualquer nome sem significado ou característica
const filtrarNomesCompletos = (lista: NomeCompleto[]): NomeCompleto[] => {
  return lista.filter(item => 
    item.nome && 
    item.significado && 
    item.caracteristica &&
    item.significado.trim() !== '' && 
    item.caracteristica.trim() !== ''
  );
};

// Aplicar o filtro em todas as listas
const nomesMeninoCompletosFiltrados = {
  brasileiro: filtrarNomesCompletos(nomesMeninoCompletos.brasileiro),
  internacional: filtrarNomesCompletos(nomesMeninoCompletos.internacional),
  classico: filtrarNomesCompletos(nomesMeninoCompletos.classico)
};

const nomesMeninaCompletasFiltradas = {
  brasileiro: filtrarNomesCompletos(nomesMeninaCompletas.brasileiro),
  internacional: filtrarNomesCompletos(nomesMeninaCompletas.internacional),
  classico: filtrarNomesCompletos(nomesMeninaCompletas.classico)
};

// Filtrar os nomes neutros
const nomesNeutrosCompletosFiltrados = filtrarNomesCompletos(nomesNeutrosCompletos);

// Manter as listas originais de nomes simples para compatibilidade
const nomesMenino = {
  brasileiro: nomesMeninoCompletosFiltrados.brasileiro.map(item => item.nome),
  internacional: nomesMeninoCompletosFiltrados.internacional.map(item => item.nome),
  classico: nomesMeninoCompletosFiltrados.classico.map(item => item.nome)
};

// Atualizar a lista de nomes de menina para incluir os novos nomes completos
const nomesMenina = {
  brasileiro: nomesMeninaCompletasFiltradas.brasileiro.map(item => item.nome),
  internacional: nomesMeninaCompletasFiltradas.internacional.map(item => item.nome),
  classico: nomesMeninaCompletasFiltradas.classico.map(item => item.nome)
};

// Lista de nomes neutros simples
const nomesNeutro = nomesNeutrosCompletosFiltrados.map(item => item.nome);

// Função para verificar integridade dos dados - apenas para desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  const verificarIntegridadeDados = () => {
    console.log("Verificando integridade dos dados de nomes...");
    
    // Verificar nomes de menino
    let nomesSemDados = 0;
    
    // Verificar cada origem
    ['brasileiro', 'internacional', 'classico'].forEach(origem => {
      const nomesSimples = nomesMenino[origem as keyof typeof nomesMenino];
      const nomesCompletos = nomesMeninoCompletosFiltrados[origem as keyof typeof nomesMeninoCompletosFiltrados];
      
      // Verificar se todos os nomes da lista simples existem na lista completa
      nomesSimples.forEach(nome => {
        const temDadosCompletos = nomesCompletos.some(item => item.nome === nome);
        if (!temDadosCompletos) {
          console.warn(`Nome de menino sem dados completos: ${nome} (origem: ${origem})`);
          nomesSemDados++;
        }
      });
    });
    
    // Verificar nomes de menina
    ['brasileiro', 'internacional', 'classico'].forEach(origem => {
      const nomesSimples = nomesMenina[origem as keyof typeof nomesMenina];
      const nomesCompletos = nomesMeninaCompletasFiltradas[origem as keyof typeof nomesMeninaCompletasFiltradas];
      
      // Verificar se todos os nomes da lista simples existem na lista completa
      nomesSimples.forEach(nome => {
        const temDadosCompletos = nomesCompletos.some(item => item.nome === nome);
        if (!temDadosCompletos) {
          console.warn(`Nome de menina sem dados completos: ${nome} (origem: ${origem})`);
          nomesSemDados++;
        }
      });
    });
    
    // Verificar nomes neutros
    nomesNeutro.forEach(nome => {
      const temDadosCompletos = nomesNeutrosCompletosFiltrados.some(item => item.nome === nome);
      if (!temDadosCompletos) {
        console.warn(`Nome neutro sem dados completos: ${nome}`);
        nomesSemDados++;
      }
    });
    
    if (nomesSemDados === 0) {
      console.log("✅ Todos os nomes possuem dados completos!");
    } else {
      console.warn(`⚠️ Existem ${nomesSemDados} nomes sem dados completos.`);
    }
  };
  
  // Chamar a verificação apenas uma vez durante o carregamento do componente
  // Usar setTimeout para garantir que seja executado após o carregamento inicial
  if (typeof window !== 'undefined') {
    setTimeout(verificarIntegridadeDados, 1000);
  }
}

export default function Bebes() {
  const { language, t } = useLanguage();
  const [genero, setGenero] = useState('menino');
  const [nomeGerado, setNomeGerado] = useState<string | null>(null);
  const [dadosCompletos, setDadosCompletos] = useState<NomeCompleto | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modoGerador, setModoGerador] = useState<'tradicional' | 'ia'>('tradicional');
  
  // Estado para armazenar nomes já utilizados nesta sessão (simplificado, sem origem)
  const [nomesUtilizados, setNomesUtilizados] = useState<Record<string, string[]>>({
    menino: [],
    menina: [],
    neutro: []
  });

  // Carregar dados com base no idioma atual
  const babyNameData = getBabyNameData(language);
  
  // Juntar todos os nomes por gênero, ignorando a origem
  const nomesMeninoCompletosUnificados = [
    ...(babyNameData.meninos?.brasileiro || []),
    ...(babyNameData.meninos?.internacional || []),
    ...(babyNameData.meninos?.classico || [])
  ];
  
  const nomesMeninaCompletasUnificadas = [
    ...(babyNameData.meninas?.brasileiro || []),
    ...(babyNameData.meninas?.internacional || []),
    ...(babyNameData.meninas?.classico || [])
  ];
  
  const nomesNeutrosCompletosUnificados = [
    ...(babyNameData.neutros?.brasileiro || []),
    ...(babyNameData.neutros?.internacional || []),
    ...(babyNameData.neutros?.moderno || [])
  ];

  // Simplificar a função obterNomeCompleto para não depender mais da origem
  const obterNomeCompleto = (nome: string): NomeCompleto | undefined => {
    if (genero === 'menino') {
      return nomesMeninoCompletosUnificados.find((item: NomeCompleto) => item.nome === nome);
    } else if (genero === 'menina') {
      return nomesMeninaCompletasUnificadas.find((item: NomeCompleto) => item.nome === nome);
    } else {
      return nomesNeutrosCompletosUnificados.find((item: NomeCompleto) => item.nome === nome);
    }
  };

  const gerarNome = () => {
    setIsGenerating(true);
    
    // Simulação de tempo de processamento
    setTimeout(() => {
      let nomesDisponiveis: string[] = [];
      let nome: string = '';

      if (genero === 'menino') {
        // Nomes de menino
        const nomesCompletos = nomesMeninoCompletosUnificados;
        const nomesSimples = nomesCompletos.map((item: NomeCompleto) => item.nome);
        const nomesJaUtilizados = nomesUtilizados.menino;
        
        // Filtra apenas nomes que não foram usados
        nomesDisponiveis = nomesSimples.filter(nome => !nomesJaUtilizados.includes(nome));

        if (nomesDisponiveis.length === 0) {
          alert(language === 'pt' ? 'Todos os nomes desta categoria já foram mostrados! Recarregue a página para reiniciar.' : 
                language === 'en' ? 'All names in this category have already been shown! Reload the page to restart.' :
                'Todos los nombres de esta categoría ya se han mostrado! Recarga la página para reiniciar.');
          setIsGenerating(false);
          return;
        }

        nome = nomesDisponiveis[Math.floor(Math.random() * nomesDisponiveis.length)];
        
        // Adiciona o nome à lista de utilizados
        setNomesUtilizados(prev => ({
          ...prev,
          menino: [...prev.menino, nome]
        }));
      } else if (genero === 'menina') {
        // Nomes de menina
        const nomesCompletos = nomesMeninaCompletasUnificadas;
        const nomesSimples = nomesCompletos.map((item: NomeCompleto) => item.nome);
        const nomesJaUtilizados = nomesUtilizados.menina;
        
        // Filtra apenas nomes que não foram usados
        nomesDisponiveis = nomesSimples.filter(nome => !nomesJaUtilizados.includes(nome));

        if (nomesDisponiveis.length === 0) {
          alert(language === 'pt' ? 'Todos os nomes desta categoria já foram mostrados! Recarregue a página para reiniciar.' : 
                language === 'en' ? 'All names in this category have already been shown! Reload the page to restart.' :
                'Todos los nombres de esta categoría ya se han mostrado! Recarga la página para reiniciar.');
          setIsGenerating(false);
          return;
        }

        nome = nomesDisponiveis[Math.floor(Math.random() * nomesDisponiveis.length)];
        
        // Adiciona o nome à lista de utilizados
        setNomesUtilizados(prev => ({
          ...prev,
          menina: [...prev.menina, nome]
        }));
      } else {
        // Nomes neutros
        const nomesCompletos = nomesNeutrosCompletosUnificados;
        const nomesSimples = nomesCompletos.map((item: NomeCompleto) => item.nome);
        const nomesJaUtilizados = nomesUtilizados.neutro;
        
        // Filtra apenas nomes que não foram usados
        nomesDisponiveis = nomesSimples.filter(nome => !nomesJaUtilizados.includes(nome));

        if (nomesDisponiveis.length === 0) {
          alert(language === 'pt' ? 'Todos os nomes desta categoria já foram mostrados! Recarregue a página para reiniciar.' : 
                language === 'en' ? 'All names in this category have already been shown! Reload the page to restart.' :
                'Todos los nombres de esta categoría ya se han mostrado! Recarga la página para reiniciar.');
          setIsGenerating(false);
          return;
        }

        nome = nomesDisponiveis[Math.floor(Math.random() * nomesDisponiveis.length)];
        
        // Adiciona o nome à lista de utilizados
        setNomesUtilizados(prev => ({
          ...prev,
          neutro: [...prev.neutro, nome]
        }));
      }

      setNomeGerado(nome);
      setDadosCompletos(obterNomeCompleto(nome));
      setIsGenerating(false);
    }, 600);
  };

  return (
    <PageTransition>
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-4 text-center">
              {t('nav.babies')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center">
              {language === 'pt' ? 'Encontre o nome perfeito para o novo membro da família' : 
               language === 'en' ? 'Find the perfect name for the new family member' : 
               'Encuentra el nombre perfecto para el nuevo miembro de la familia'}
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
                      {language === 'pt' ? 'Gerador Simples' : 
                       language === 'en' ? 'Simple Generator' : 
                       'Generador Simple'}
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
                      {language === 'pt' ? 'Gerador Inteligente' : 
                       language === 'en' ? 'Smart Generator' : 
                       'Generador Inteligente'}
                </button>
                  </div>
              </div>
              
                {modoGerador === 'tradicional' ? (
                  <>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {language === 'pt' ? 'Gênero' : 
                   language === 'en' ? 'Gender' : 
                   'Género'}
              </label>
                <div className="flex flex-wrap gap-2 mb-6">
                <button 
                    className={`flex-1 px-4 py-2 rounded-lg ${genero === 'menino' 
                      ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setGenero('menino')}
                >
                    {language === 'pt' ? 'Menino' : 
                     language === 'en' ? 'Boy' : 
                     'Niño'}
                </button>
                <button 
                    className={`flex-1 px-4 py-2 rounded-lg ${genero === 'menina' 
                      ? 'bg-pink-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setGenero('menina')}
                >
                    {language === 'pt' ? 'Menina' : 
                     language === 'en' ? 'Girl' : 
                     'Niña'}
                </button>
                <button 
                    className={`flex-1 px-4 py-2 rounded-lg ${genero === 'neutro' 
                      ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setGenero('neutro')}
                >
                    {language === 'pt' ? 'Neutro' : 
                     language === 'en' ? 'Neutral' : 
                     'Neutro'}
                </button>
            </div>

            <button 
                      className={`w-full mt-6 py-3 px-4 font-medium rounded-lg transition-colors ${
                genero === 'menino' 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : genero === 'menina'
                      ? 'bg-pink-500 hover:bg-pink-600 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
              onClick={gerarNome}
              disabled={isGenerating}
            >
                {isGenerating ? t('button.generating') : t('button.generate')}
            </button>
                  </>
                ) : (
                  <AINameGenerator 
                    categoria="bebes" 
                    generoInicial={
                      genero === 'menino' 
                        ? 'masculino' 
                        : genero === 'menina' 
                          ? 'feminino' 
                          : 'neutro'
                    } 
                  />
                )}
              </div>
          </div>

            {modoGerador === 'tradicional' && nomeGerado && (
              <div className="w-full flex flex-col gap-2">
              <NomeDisplay 
                nome={nomeGerado} 
                  caracteristica={dadosCompletos && dadosCompletos.significado && dadosCompletos.caracteristica 
                    ? `${language === 'pt' ? 'Significado' : 
                         language === 'en' ? 'Meaning' : 
                         'Significado'}: ${dadosCompletos.significado}\n${
                         language === 'pt' ? 'Característica' : 
                         language === 'en' ? 'Characteristic' : 
                         'Característica'}: ${dadosCompletos.caracteristica}`
                    : dadosCompletos && dadosCompletos.significado 
                      ? `${language === 'pt' ? 'Significado' : 
                           language === 'en' ? 'Meaning' : 
                           'Significado'}: ${dadosCompletos.significado}` 
                      : dadosCompletos && dadosCompletos.caracteristica 
                        ? `${language === 'pt' ? 'Característica' : 
                             language === 'en' ? 'Characteristic' : 
                             'Característica'}: ${dadosCompletos.caracteristica}`
                        : ''}
                onGerarNovo={gerarNome}
                corDestaque={genero === 'menino' 
                  ? 'text-blue-500 dark:text-blue-400' 
                    : genero === 'menina'
                      ? 'text-pink-500 dark:text-pink-400'
                      : 'text-purple-500 dark:text-purple-400'}
                mostrarAnuncio={false}
                categoria="bebes"
                  textoBotaoGerar={t('button.generate.another')}
                />
                </div>
              )}
            </div>

          <div className="w-full max-w-2xl mt-8">
            <AdBanner adSlot="bebes-footer" />
        </div>
      </main>
      
      <Footer />
    </div>
    </PageTransition>
  );
} 