const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Conteudo = sequelize.define(
  "conteudo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "titulo",
    },
    descricao: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "descricao",
    },
    data_postagem: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "data_postagem",
    },
    data_atualizacao: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "data_atualizacao",
    },
    texto_conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "texto_conteudo",
    },
    imagem: {
      type: DataTypes.BLOB,
      allowNull: true,
      field: "imagem",
    },
    link_youtube: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "link_youtube",
    },
    nome_documento: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "nome_documento",
    },
    saiba_mais: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "saiba_mais",
    },
  },
  {
    tableName: "conteudos",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Conteudo;
