// Tipos de nomes compartilhados que funcionam bem para vários tipos de pets
const nomesGenericosMacho = [
  // Nomes inspirados em cores
  'Azul', 'Preto', 'Branco', 'Cinza', 'Amarelo', 'Vermelho', 'Marrom',
  
  // Nomes inspirados na natureza
  'Sky', 'Sol', 'Flash', 'Storm', 'Thunder', 'Trovão', 'Raio', 'Relâmpago',
  'Furacão', 'Rio', 'Mar', 'Oceano', 'Montanha', 'Forest', 'Floresta',
  
  // Nomes inspirados em comidas
  'Cookie', 'Biscoito', 'Caramelo', 'Chocolate', 'Amendoim', 'Pipoca', 'Bacon',
  
  // Nomes inspirados em personalidade
  'Lucky', 'Sortudo', 'Happy', 'Feliz', 'Valente', 'Bravo', 'Grumpy',
  'Soneca', 'Dunga', 'Zangado', 'Mestre', 'Astuto', 'Amigo', 'Buddy',
  
  // Nomes de personagens/mitologia que funcionam para pets
  'Thor', 'Zeus', 'Apollo', 'Hercules', 'Atlas', 'Odin', 'Loki', 'Zeus',
  'Max', 'Rex', 'Toby', 'Bolt', 'Duke', 'Bob', 'Simba', 'Rocky',
  'Olaf', 'Marvin', 'Gizmo', 'Yoda', 'Django', 'Logan', 'Oscar',
  
  // Outros nomes genéricos (masculinos)
  'Patinho', 'Monstro', 'Duque', 'Príncipe', 'Rei', 'Chefe', 'Boss',
  'Spike', 'Sparky', 'Rookie', 'Fuzzy', 'Fofinho', 'Tiger', 'Tigre',
  'Leo', 'Leão', 'Nick', 'Hank', 'Harry', 'Jack', 'Fred', 'Billy',
  'Pingo', 'Spot', 'Pintado', 'Luke', 'Theo', 'Teddy', 'Ben', 'Benny',
  'Charlie', 'Jimmy', 'Timmy', 'Bruce', 'Bruno', 'Brutus', 'Beethoven'
];

const nomesGenericosFemea = [
  // Nomes inspirados em cores
  'Rosa', 'Azul', 'Branca', 'Amarela', 'Vermelha', 'Cinza',
  
  // Nomes inspirados na natureza
  'Aurora', 'Luna', 'Estrela', 'Star', 'Lua', 'Moon', 'Flor', 'Flower',
  'Sky', 'Dawn', 'Neve', 'Winter', 'Summer', 'Autumn', 'Spring', 'Crystal',
  
  // Nomes inspirados em comidas
  'Cookie', 'Pipoca', 'Caramelo', 'Canela', 'Amendoim', 'Morango', 'Mel',
  'Chocolate', 'Nutella', 'Pepper', 'Pimenta', 'Coco',
  
  // Nomes inspirados em personalidade
  'Lady', 'Princess', 'Princesa', 'Rainha', 'Queen', 'Feliz', 'Happy', 
  'Soneca', 'Alegria', 'Joy', 'Amora', 'Nina', 'Mia', 'Nana', 'Belinha',
  
  // Nomes de personagens que funcionam para pets
  'Dory', 'Ariel', 'Leia', 'Lilo', 'Nala', 'Kiara', 'Elsa', 'Ana',
  'Jade', 'Bella', 'Daisy', 'Minnie', 'Maggie', 'Sophie', 'Chloe', 'Zoe',
  
  // Outros nomes genéricos (femininos)
  'Lola', 'Maya', 'Malu', 'Kika', 'Nina', 'Meg', 'Penny', 'Lili',
  'Ruby', 'Pearl', 'Pérola', 'Safira', 'Aqua', 'Lily', 'Lola', 'Sofia',
  'Pandora', 'Diva', 'Patinha', 'Fofinha', 'Bolinha', 'Branquinha', 'Cotton',
  'Fluffy', 'Floquinho', 'Pituca', 'Cherie', 'Mimi', 'Mely', 'Amy'
];

// Nomes específicos para cada tipo de animal
const nomesEspecificosCachorro = {
  macho: [
    'Totó', 'Scooby', 'Rex', 'Pluto', 'Bidu', 'Snoop', 'Snoopy', 'Bingo',
    'Wolf', 'Lobo', 'Akita', 'Pastor', 'Buldogue', 'Dálmata', 'Fila',
    'Husky', 'Mastiff', 'Pitbull', 'Beagle', 'Labrador', 'Basset',
    'Doberman', 'Taco', 'Pug', 'Rambo', 'Salsicha', 'Hunter', 'Caçador',
    'Xerife', 'Policial', 'Farejador', 'Barky', 'Latido', 'Cowboy'
  ],
  femea: [
    'Lassie', 'Laika', 'Pucca', 'Collie', 'Baleia', 'Dóris', 'Cacau',
    'Poodle', 'Foxy', 'Hana', 'Kyra', 'Lupita', 'Mila', 'Molly', 'Polly',
    'Perola', 'Gaia', 'Baronesa', 'Duquesa', 'Huskita', 'Malu', 'Branca',
    'Diana', 'Flor', 'Fiona', 'Belinha', 'Valentina', 'Nina', 'Luna',
    'Mel', 'Mila', 'Miss', 'Moça', 'Docinho', 'Sandy', 'Tequila', 'Whisky'
  ]
};

const nomesEspecificosGato = {
  macho: [
    'Garfield', 'Felix', 'Tom', 'Frajola', 'Sylvester', 'Miau', 'Mingau',
    'Persa', 'Siamês', 'Angorá', 'Sphynx', 'Malhado', 'Gato de Botas',
    'Rajado', 'Bigodes', 'Peludo', 'Romeu', 'Oliver', 'Cheshire',
    'Felino', 'Whiskas', 'Gatuno', 'Tigre', 'Pantera', 'Leão', 'Jaguar',
    'Aslan', 'Miado', 'Ronron', 'Xaninho', 'Maracujá', 'Laranja'
  ],
  femea: [
    'Cleópatra', 'Marie', 'Mimi', 'Kitty', 'Hello Kitty', 'Gatinha',
    'Fifi', 'Siamesa', 'Persa', 'Angorá', 'Malhada', 'Chita', 'Tigrinha',
    'Miau', 'Ronrona', 'Frajola', 'Mittens', 'Filomena', 'Julieta',
    'Gata Borralheira', 'Sushi', 'Fiona', 'Felícia', 'Ágata', 'Pucca',
    'Luna', 'Frida', 'Aurora', 'Mulekinha', 'Manchinha', 'Clarinha',
    'Malhada', 'Listrada', 'Tigresa', 'Panterinha'
  ]
};

const nomesEspecificosPeixe = {
  macho: [
    'Nemo', 'Marlin', 'Gill', 'Jacques', 'Bloat', 'Bubbles', 'Peach',
    'Beta', 'Koi', 'Baiacu', 'Tubarão', 'Dori', 'Dourado', 'Carpa',
    'Peixoto', 'Flipper', 'Aquaman', 'Tritão', 'Poseidon', 'Nadar',
    'Merlin', 'Gurgle', 'Tubarão', 'Barracuda', 'Chico', 'Goldie',
    'Bolhas', 'Jacques', 'Sharky', 'Tilapia', 'Bagre', 'Piaba'
  ],
  femea: [
    'Dory', 'Ariel', 'Pequena Sereia', 'Peixinha', 'Flounder', 'Pearl',
    'Wanda', 'Marina', 'Sereia', 'Aquática', 'Coral', 'Kira', 'Bubble',
    'Goldie', 'Escama', 'Azulina', 'Estrela do Mar', 'Pérola',
    'Sardinha', 'Anchova', 'Cavala', 'Fanny', 'Lulu', 'Nada',
    'Marlene', 'Espuma', 'Concha', 'Maré', 'Ondina', 'Iara', 'Uiara'
  ]
};

const nomesEspecificosCoelho = {
  macho: [
    'Pernalonga', 'Thumper', 'Roger Rabbit', 'Coelhinho', 'Peter',
    'Rabito', 'Bugs', 'Tambor', 'Algodão', 'Beny', 'Bunny', 'Orelhudo',
    'Saltador', 'Pézinho', 'Cenoura', 'Pepito', 'Mr. Whiskers', 'Fluffy',
    'Bigode', 'Saltitante', 'Pulador', 'Pelúcia', 'Teco', 'Felpudo',
    'Pipinho', 'Coelho da Páscoa', 'Orelha', 'Bigfoot', 'Pat-Pat'
  ],
  femea: [
    'Coelhinha', 'Lola Bunny', 'Judy Hopps', 'Mônica', 'Cotton',
    'Lilica', 'Flora', 'Flor', 'Fofura', 'Algodão', 'Neve', 'Cenoura',
    'Patinha', 'Bolinha', 'Fofa', 'Fofinha', 'Pula-Pula', 'Orelhinha',
    'Miss Cotton', 'Pipoca', 'Moranguinho', 'Salad', 'Flor', 'Fru-Fru',
    'Belinha', 'Boneca', 'Pérola', 'Branquinha', 'Snowball', 'Docinho'
  ]
};

const nomesEspecificosRoedor = {
  macho: [
    'Mickey', 'Stuart Little', 'Jerry', 'Hamtaro', 'Remy', 'Splinter',
    'Pinky', 'Brain', 'Ratatouille', 'Ratinho', 'Twister', 'Stuart',
    'Hamster', 'Roedor', 'Rato', 'Ratata', 'Pikachu', 'Squirrel',
    'Esquilo', 'Darwin', 'Gus', 'Nugget', 'Amendoim', 'Pitufo',
    'Pequenino', 'Chip', 'Dale', 'Tico', 'Teco', 'Quico', 'Bolota',
    'Chester', 'Cheetos', 'Alvin', 'Simon', 'Theodore'
  ],
  femea: [
    'Minnie', 'Ratinha', 'Lilo', 'Amy', 'Chispita', 'Emilia', 
    'Bolinha', 'Floco', 'Pipoca', 'Sementinha', 'Lentilha', 'Petunia',
    'Mochi', 'Pimenta', 'Fofinha', 'Snowball', 'Nibbles', 'Queijinho',
    'Pintada', 'Xuxinha', 'Minie', 'Daisy', 'Bibi', 'Lolita', 'Topi',
    'Tica', 'Brigitte', 'Manchinha', 'Susi', 'Britney', 'Lilu', 'Kiki'
  ]
};

const nomesEspecificosAve = {
  macho: [
    'Blu', 'Zazu', 'Louro', 'Piu-Piu', 'Frajola', 'Nigel', 'Tweety', 
    'Falcão', 'Águia', 'Gavião', 'Papagaio', 'Tucano', 'Rafael', 
    'Pedro', 'Nico', 'Kiwi', 'Azulão', 'Canário', 'Pardal', 'Beija-Flor', 
    'Peninha', 'Asinha', 'Pássaro', 'Bico', 'Squawks', 'Pica-Pau',
    'Woody Woodpecker', 'Gralha', 'Corvo', 'Pinguim', 'Asa Delta'
  ],
  femea: [
    'Jade', 'Safira', 'Petúnia', 'Cecília', 'Jewel', 'Ruby', 'Esmeralda',
    'Papagaia', 'Calopsita', 'Maritaca', 'Andorinha', 'Sabiá', 'Pomba',
    'Garça', 'Arara', 'Kiki', 'Coco', 'Rainbow', 'Sunny', 'Piu', 'Pia',
    'Biquinho', 'Pluminha', 'Asas', 'Tweet', 'Twitter', 'Passarinha',
    'Graúna', 'Asa Branca', 'Pena', 'Periquita', 'Matilda', 'Gaivotas'
  ]
};

const nomesEspecificosReptil = {
  macho: [
    'Draco', 'Spike', 'Rex', 'Godzilla', 'Yoshi', 'Rango', 'Crush',
    'Ziggy', 'Komodo', 'Slither', 'Cobra', 'Python', 'Jiboia', 'Cascavel',
    'Jacaré', 'Crocodilo', 'Lagarto', 'Camaleão', 'Iguana', 'Gecko',
    'Dragão', 'Salamandra', 'Dinosaur', 'Dino', 'T-Rex', 'Raptor',
    'Kraken', 'Mushu', 'Tartaruga', 'Jabuti', 'Sapo', 'Rã', 'Kaa'
  ],
  femea: [
    'Hydra', 'Scale', 'Cobra', 'Lagartixa', 'Nila', 'Escama', 'Reptilia',
    'Iguana', 'Jiboia', 'Sucuri', 'Cascavel', 'Naja', 'Píton', 'Coral',
    'Lagarta', 'Serpente', 'Mamba', 'Anaconda', 'Salamandra', 'Medusa',
    'Gorgon', 'Nagini', 'Jacaroa', 'Dinosaura', 'Dina', 'Tartaruga',
    'Jabulani', 'Casco', 'Jabuti', 'Squirtle', 'Tortuga', 'Donatella'
  ]
};

const nomesEspecificosExotico = {
  macho: [
    'Exótico', 'Rajah', 'Django', 'Yoda', 'Bamboo', 'Storm', 'Enigma',
    'Cosmos', 'Onyx', 'Alien', 'Furão', 'Porco-Espinho', 'Axolote',
    'Quati', 'Chinchila', 'Ouriço', 'Suricate', 'Tatu', 'Sagui',
    'Capivara', 'Gambá', 'Raposa', 'Lontra', 'Castor', 'Tamanduá',
    'Pangolim', 'Guaxinim', 'Panda', 'Koala', 'Canguru', 'Gnu', 'Zebra'
  ],
  femea: [
    'Safira', 'Íris', 'Quimera', 'Nebulosa', 'Pandora', 'Aurora',
    'Winter', 'Mystic', 'Shadow', 'Quest', 'Exótica', 'Lotus', 'Exotic',
    'Fuinha', 'Chinchila', 'Curió', 'Capivara', 'Quati', 'Suricata',
    'Foxy', 'Raposinha', 'Lontrinha', 'Castora', 'Tamanduá', 'Lhama',
    'Alpaca', 'Guaxinina', 'Pandinha', 'Koalinha', 'Canguru', 'Zebrinha'
  ]
};

// Função para combinar nomes genéricos com específicos e garantir mais de 100 nomes por categoria
export function gerarListasDeNomes() {
  // Funções auxiliares
  const combinarNomes = (genericos: string[], especificos: string[]) => {
    // Remove duplicatas
    const combinados = [...new Set([...genericos, ...especificos])];
    return combinados;
  };
  
  // Gerar 110-120 nomes para cada categoria (macho, fêmea, neutro)
  const expandirLista = (lista: string[], min: number = 100) => {
    // Se já temos mais de 100 nomes, retorna a lista
    if (lista.length >= min) return lista;
    
    // Caso contrário, repetimos alguns nomes aleatórios até atingir o mínimo
    const novaLista = [...lista];
    while (novaLista.length < min) {
      const nomeAleatorio = lista[Math.floor(Math.random() * lista.length)];
      if (!novaLista.includes(nomeAleatorio)) {
        novaLista.push(nomeAleatorio);
      }
    }
    return novaLista;
  };
  
  // Combinar nomes específicos com genéricos para cada tipo de animal
  return {
    cachorro: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosCachorro.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosCachorro.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosCachorro.macho, ...nomesEspecificosCachorro.femea]
      ))
    },
    gato: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosGato.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosGato.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosGato.macho, ...nomesEspecificosGato.femea]
      ))
    },
    peixe: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosPeixe.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosPeixe.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosPeixe.macho, ...nomesEspecificosPeixe.femea]
      ))
    },
    coelho: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosCoelho.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosCoelho.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosCoelho.macho, ...nomesEspecificosCoelho.femea]
      ))
    },
    roedor: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosRoedor.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosRoedor.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosRoedor.macho, ...nomesEspecificosRoedor.femea]
      ))
    },
    ave: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosAve.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosAve.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosAve.macho, ...nomesEspecificosAve.femea]
      ))
    },
    reptil: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosReptil.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosReptil.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosReptil.macho, ...nomesEspecificosReptil.femea]
      ))
    },
    exotico: {
      macho: expandirLista(combinarNomes(nomesGenericosMacho, nomesEspecificosExotico.macho)),
      femea: expandirLista(combinarNomes(nomesGenericosFemea, nomesEspecificosExotico.femea)),
      neutro: expandirLista(combinarNomes(
        [...nomesGenericosMacho, ...nomesGenericosFemea],
        [...nomesEspecificosExotico.macho, ...nomesEspecificosExotico.femea]
      ))
    }
  };
}

// Exporta as listas de nomes já processadas
export const LISTA_NOMES_PETS = gerarListasDeNomes(); 