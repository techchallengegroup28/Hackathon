# Utiliza uma imagem base oficial do Node.js
FROM node:20

# Define o diretório de do container
WORKDIR /app-none

# cria uma variável de ambiente para a porta
ARG PORT_BUILD=3001
ENV PORT=$PORT_BUILD

# Define a porta que a aplicação vai rodar
EXPOSE $PORT_BUILD

# Copia os arquivos do projeto para dentro do contêiner
COPY . .

# instala as dependendicas, roda o build e inica a aplicação
RUN npm install
RUN npm run build

ENTRYPOINT npm run start