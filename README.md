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
- [OpenAI API](https://openai.com/blog/openai-api)

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
   OPENAI_API_KEY=sua_chave_da_api_aqui
   OPENAI_API_URL=https://api.openai.com/v1/chat/completions
   OPENAI_MODEL=gpt-3.5-turbo
   ```

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

## Licença

Este projeto está licenciado sob a licença MIT.
