# PosTech

Projeto para a pós da fiap, back end de uma aplicação para posts destinado a alunos e professores. Para essse projeto utilizamos as seguintes tecnologias:

**Back-end:**

- Node.js
- Express

**Banco de Dados:**

- Postgres
- Sequelize

**Documentação:**

- Swagger

## Instalação

[Repositorio](https://github.com/techchallengegroup28/TechChallengeFase2.git)

Ao baixar o projeto navegue até o diretorio principal

E instale as dependencias:

```bash
  npm install
```

Agora vamos subir o banco inicial e executar o Docker. Para isso lembre de deixar o Docker executando no windows e execute os seguintes comandos:

Faça o build do Docker para construir as imagens definidas no `docker-compose.yml`

```bash
  docker-compose build
```

Para criar o ambiente de desenvolvimento, execute o comando abaixo. Isso irá iniciar os contêineres, criar o banco de dados FIAP, criar a tabela post, fazer a inserção inicial dos dados e criar um contêiner do banco de dados:

```bash
  docker-compose up -d
```

Para o ambiente de produção utilize

```bash
  docker-compose up --build
```

A aplicação pode ser vista na URL
[http://localhost:3000/](http://localhost:3000/)

## Visualizando a documentação

Para visualizar a cocumentação interativa com Swagger
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Comandos uteis do Docker

Criar uma imagem

```bash
  docker build -t Nome_da_Imagem:tag .
```

Parar os contêineres em execução e deletar

```bash
  docker-compose down
```

istar as imagens docker

```bash
  docker images
```

Remover imagens

```bash
  docker rmi <id_imagem>
```

Baixar uma imagem de um repositorio

```bash
  docker pull Seu_Repositorio/Nome_da_imagem:lasted
```

Cria tag para uma imagen docker

```bash
  docker tag postgres:latest Seu_Repositorio/postgres:latest
```

Realizar o push para o repositório remoto

```bash
  docker push Seu_Repositoriov/postgres:latest
```
