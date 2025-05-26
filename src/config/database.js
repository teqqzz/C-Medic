const { Sequelize } = require('sequelize');

async function createDatabaseIfNotExists() {
  // Conexão sem banco definido para criar o DB se não existir
  const sequelize = new Sequelize('', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });

  try {
    await sequelize.query('CREATE DATABASE IF NOT EXISTS cmedic;');
  } catch (error) {
    console.error('Erro ao criar banco:', error);
  } finally {
    await sequelize.close();
  }
}


const database = new Sequelize('cmedic', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = {
  database,
  createDatabaseIfNotExists,
};