## Instalação

[Repositório] (https://github.com/techchallengegroup28/Hackathon.git)

Ao baixar o projeto navegue até o diretório backend

E instale as dependências:

```bash
  npm install
```

Agora vamos subir o banco inicial e executar o Docker. Para isso lembre de deixar o Docker executando no Windows e execute os seguintes comandos:

Faça o build do Docker para construir as imagens definidas no `docker-compose.yml`

```bash
  docker-compose build
```

Para criar o ambiente de desenvolvimento, execute o comando abaixo. Isso irá iniciar os contêineres, criar o banco de dados FIAP, criar a tabela post, fazer a inserção inicial dos dados e criar um contêiner do banco de dados:

Para o ambiente de desenvolvimento utilize
```bash
  docker-compose up -d
```

Para o ambiente de produção utilize

```bash
  docker-compose up --build
```

A aplicação pode ser vista na URL
[http://localhost:3000/](http://localhost:3000/)

## Visualizando a documentação da api

Para visualizar a documentação interativa com Swagger
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)


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
