# Utiliza uma imagem base oficial do Node.js
FROM node:22

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Porta que a aplicação vai expor
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "bin/www"]