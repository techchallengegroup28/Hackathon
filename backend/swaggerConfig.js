const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentação da API da Biblioteca Online",
      description:
        "Esta documentação descreve as APIs do projeto de biblioteca online, explicando como gerenciar conteúdos como livros, artigos e outros materiais, além da autenticação de usuários e controle de permissões.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

module.exports = specs;
