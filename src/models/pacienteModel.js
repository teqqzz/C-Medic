const { DataTypes } = require('sequelize');
const { database } = require('../config/database'); 
const Paciente = database.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: DataTypes.STRING,
  datanascimento: DataTypes.DATEONLY,
  email: DataTypes.STRING,
  cpf: DataTypes.STRING,
  endereco: DataTypes.STRING,
  criadoPor: DataTypes.STRING,
}, {
  tableName: 'pacientes',
  timestamps: false,
});

module.exports = Paciente;