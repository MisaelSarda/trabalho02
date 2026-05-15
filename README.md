# Sistema de Doação de Roupas e Alimentos

## Descrição da Aplicação
Este projeto é um Sistema de Doação desenvolvido para gerir o cadastro e consulta de doações de roupas e alimentos. A aplicação possui uma interface web funcional onde é possível realizar as operações de Create, Read e Delete (CRUD) de itens doados. O ambiente foi totalmente conteinerizado utilizando Docker e Docker Compose, simulando um ambiente real de Cloud Computing e DevOps.

## Tecnologias Utilizadas
- **Backend:** Node.js com Express
- **Frontend:** HTML, CSS e JavaScript Vanilla
- **Banco de Dados:** PostgreSQL
- **Orquestração:** Docker e Docker Compose

## Arquitetura Utilizada
O projeto utiliza uma arquitetura multicontainer composta por:
1. **Container da Aplicação:** Executa o servidor Node.js (imagem personalizada publicada no DockerHub).
2. **Container do Banco de Dados:** Executa o PostgreSQL (imagem oficial do DockerHub).
- Ambos os containers comunicam entre si através de uma rede interna (`doacoes_network`) criada pelo Docker Compose.
- O banco de dados utiliza um volume Docker (`db_data`) para garantir a persistência dos dados, assegurando que os registos não se percam em caso de reinicialização dos containers.

## Variáveis de Ambiente
As configurações de conexão da base de dados são feitas através do ficheiro `.env` ou injetadas diretamente pelo Docker Compose:
- `DB_USER`: postgres
- `DB_PASSWORD`: 12345
- `DB_NAME`: doacoes_db
- `DB_HOST`: db
- `DB_PORT`: 5432

## Portas Utilizadas
- **Aplicação Web:** Porta `3000` (mapeada para `localhost:3000`)
- **Banco de Dados PostgreSQL:** Porta `5432` (interna do container)

## Instruções Completas de Execução

Para que o professor ou qualquer utilizador consiga executar este projeto localmente, basta ter o Docker e o Docker Compose instalados e seguir os passos abaixo:

**1. Clonar o repositório e aceder à pasta:**
\`\`\`bash
git clone https://github.com/MisaelSarda/trabalho02.git
cd trabalho02
\`\`\`

**2. Iniciar a aplicação e o banco de dados:**
O comando abaixo irá baixar as imagens (incluindo a da aplicação no DockerHub), criar os containers, a rede e o volume para persistência de dados.
\`\`\`bash
docker compose up -d
\`\`\`

**3. Aceder à Aplicação:**
Abra o navegador e aceda ao endereço:
\`\`\`text
http://localhost:3000
\`\`\`

**4. Validar as funcionalidades:**
- Cadastre um novo item no formulário.
- Verifique se a lista na tabela é atualizada.
- A persistência dos dados pode ser validada parando os containers (`docker compose down`) e voltando a iniciá-los (`docker compose up -d`); as doações continuarão listadas.

**5. Encerrar a aplicação:**
Para parar os containers e remover a rede (sem perder os dados do volume):
\`\`\`bash
docker compose down
\`\`\`