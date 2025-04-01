# Nomeador / Nominator - Gerador de Nomes com IA

O Nomeador (Nominator em inglês) é uma aplicação web que utiliza Inteligência Artificial para gerar nomes criativos para:

- Pets 🐾
- Personagens de Jogos 🎮
- Bebês 👶
- Nomes aleatórios para qualquer finalidade 🌟

## Modos de Geração de Nomes

O sistema conta com três modos diferentes de geração de nomes:

### 1. Modo IA (100% IA)
- Utiliza exclusivamente a API do Hugging Face (modelo Mistral 7B)
- Máxima criatividade e variedade
- Requer conexão com a internet
- Você precisa de uma chave de API do Hugging Face

### 2. Modo Híbrido
- Combina resultados da API com nomes da biblioteca local
- Oferece o melhor dos dois mundos: criatividade da IA + velocidade da biblioteca local
- Funciona parcialmente mesmo com problemas de conexão
- **Recomendado para a maioria dos usuários**

### 3. Modo Local (Offline)
- Utiliza apenas a biblioteca local de nomes pré-definidos
- Mais de 100 nomes disponíveis em diferentes categorias
- Funciona completamente offline
- Resposta instantânea, sem latência de API

## Configuração

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Copie o arquivo `.env.local.example` para `.env.local`
4. Obtenha uma chave gratuita da [Hugging Face](https://huggingface.co)
5. Configure seu arquivo `.env.local`:

```
# API Hugging Face
HUGGINGFACE_API_KEY=sua_chave_aqui
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2

# Configuração do modo de geração de nomes
# Valores possíveis: 'api', 'local', 'hibrido'
DEFAULT_MODE=hibrido
```

## Como Obter uma Chave da Hugging Face

1. Crie uma conta gratuita em [huggingface.co](https://huggingface.co)
2. Vá até Settings > Access Tokens
3. Crie um novo token com permissões de Leitura para acessar modelos públicos
4. Marque a opção "Make calls to Inference Providers" para poder usar a API
5. Copie a chave gerada e adicione no seu arquivo `.env.local`

## Executando o Projeto

```bash
# Iniciar em modo de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar em modo de produção
npm start
```

## Tecnologias Utilizadas

- Next.js 15
- TypeScript
- TailwindCSS
- Hugging Face API
- Lucide Icons

## Licença

Este projeto é distribuído sob a licença MIT.
