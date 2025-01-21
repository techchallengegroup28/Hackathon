 require('dotenv').config();

const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Carrega as variáveis de ambiente
const envPath = fs.existsSync('/.dockerenv') ? '.env.docker' : '.env';
require('dotenv').config({ path: path.resolve(__dirname, envPath) });

const databaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL;

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',  
  timezone: '+00:00' // Para evitar problemas com o timezone
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível estabelecer conexão com o banco de dados:', err);
  });

module.exports = sequelize;