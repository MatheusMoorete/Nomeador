# Nomeador

Um gerador de nomes para pets, jogos, bebês e muito mais!

## Funcionalidades

- 🐕 Geração de nomes para pets
- 🎮 Nomes para personagens de jogos
- 👶 Nomes para bebês
- ⚡ Nomes aleatórios para diversos usos
- ❤️ Salvar nomes favoritos
- 📊 Histórico de nomes gerados
- 🧠 Geração inteligente de nomes com IA
- 📱 Design responsivo

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hugging Face API](https://huggingface.co/docs/api-inference/index) (Modelo Mistral)

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/MatheusMoorete/Nomeador.git
   cd Nomeador
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ```
   HUGGINGFACE_API_KEY=hf_sua_chave_aqui
   HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
   # Use true para usar apenas nomes locais sem API
   USE_FALLBACK_NAMES=false
   ```
   
   Para obter sua chave gratuita da Hugging Face:
   1. Crie uma conta em [huggingface.co](https://huggingface.co/join)
   2. Vá para [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   3. Gere um novo token com permissão de leitura

4. Execute o projeto:
   ```bash
   npm run dev
   ```

5. Acesse o projeto em [http://localhost:3000](http://localhost:3000)

## Características do Gerador de IA

O gerador de nomes com IA permite:
- Selecionar o gênero (masculino, feminino ou neutro)
- Escolher a origem (brasileiro, internacional, clássico)
- Adicionar características desejadas para o nome
- Visualizar significado e origem dos nomes gerados

### Modo Offline

O projeto também funciona sem API, usando uma lista local de nomes:
- Configure `USE_FALLBACK_NAMES=true` no arquivo `.env.local`
- A aplicação usará nomes pré-definidos organizados por categoria

## Licença

Este projeto está licenciado sob a licença MIT.
