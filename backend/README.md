# PosTech

Backend desenvolvido para criaão de uma biblioteca online destinado a alunos e professores. 
Este projeto utilizar as seguintes tecnologias:

## Frameworks e Bibliotecas Utilizados

- **Node.js**:   Ambiente de execução JavaScript server-side.
- **Express**:   Framework web para Node.js, utilizado para construir APIs RESTful.
- **Postgres**:  Sistema de gerenciamento de banco de dados relacional.
- **Sequelize**: ORM (Object-Relational Mapper) para Node.js, utilizado para interagir com o banco de dados Postgres.
- **Swagger**:   Ferramenta para documentação de APIs, permitindo a criação de documentação interativa.

## Instalação

[Repositório] (https://github.com/techchallengegroup28/Hackathon.git)

Ao baixar o projeto navegue até o diretório backend

E instale as dependências:

```Terminal
  npm install
```

Agora vamos subir o banco inicial e executar o Docker. Para isso lembre de deixar o Docker executando no Windows e execute os seguintes comandos:

Faça o build do Docker para construir as imagens definidas no `docker-compose.yml`

```Terminal
  docker-compose build
```

Para criar o ambiente de desenvolvimento, execute o comando abaixo. Isso irá iniciar os contêineres, criar o banco de dados FIAP, criar a tabela post, fazer a inserção inicial dos dados e criar um contêiner do banco de dados:

Para o ambiente de desenvolvimento utilize
```Terminal
  docker-compose up -d
```

Para o ambiente de produção utilize

```Terminal
  docker-compose up --build
```

A aplicação pode ser vista na URL
[http://localhost:3000/](http://localhost:3000/)

## Visualizando a documentação da api

Para visualizar a documentação interativa com Swagger
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Estrutura de Diretórios e Arquivos
A estrutura de diretórios e arquivos do projeto é a seguinte:

```
📦backend
 ┣ 📂bin
 ┃ ┗ 📜www                        	 # Arquivo de inicialização do servidor
 ┣ 📂controller
 ┃ ┣ 📜autenticacaoController.js     # Controlador para autenticação
 ┃ ┣ 📜conteudoController.js         # Controlador para conteúdos
 ┃ ┗ 📜usuarioController.js          # Controlador para usuários
 ┣ 📂database
 ┃ ┗ 📜database.js                	 # Configuração do banco de dados
 ┣ 📂middlewares
 ┃ ┣ 📜autorizarPermissoes.js        # Middleware para autorização de permissões
 ┃ ┗ 📜verificarToken.js             # Middleware para verificação de token
 ┣ 📂model
 ┃ ┣ 📜Conteudo.js                   # Modelo de dados para conteúdos
 ┃ ┗ 📜Usuario.js                    # Modelo de dados para usuários
 ┣ 📂routes
 ┃ ┣ 📜autenticacao.js               # Rotas de autenticação
 ┃ ┣ 📜conteudos.js                  # Rotas de conteúdos
 ┃ ┗ 📜usuarios.js                   # Rotas de usuários
 ┣ 📜.env.docker                     # Arquivo de variáveis de ambiente para Docker
 ┣ 📜.gitignore                      # Arquivos e diretórios ignorados pelo Git
 ┣ 📜app.js                          # Configuração do aplicativo Express
 ┣ 📜docker-compose.yml              # Configuração do Docker Compose
 ┣ 📜Dockerfile                      # Dockerfile para criar a imagem do Docker
 ┣ 📜Dockerfile.db                               # Dockerfile para o banco de dados
 ┣ 📜FIAP-Hackathon.postman_collection.json      # Coleção do Postman para testes de API
 ┣ 📜FIAP_BIBLIOTECA_ONLINE.sql                  # Script SQL para criação do banco de dados
 ┣ 📜package-lock.json               # Arquivo de lock do npm
 ┣ 📜package.json                    # Dependências e scripts do npm
 ┣ 📜README.md                       # Documentação do projeto
 ┗ 📜swaggerConfig.js                # Configuração do Swagger para documentação da API

```

## Comandos úteis do Docker

Criar uma imagem

```Terminal
  docker build -t Nome_da_Imagem:tag .
```

Parar os contêineres em execução e deletar

```Terminal
  docker-compose down
```

Listar as imagens docker

```Terminal
  docker images
```

Remover imagens

```Terminal
  docker rmi <id_imagem>
```

Baixar uma imagem de um repositório

```Terminal
  docker pull Seu_Repositorio/Nome_da_imagem:latest
```

Criar tag para uma imagem docker

```Terminal
  docker tag postgres:latest Seu_Repositorio/postgres:latest
```

Realizar o push para o repositório remoto

```Terminal
  docker push Seu_Repositorio/postgres:latest
```
