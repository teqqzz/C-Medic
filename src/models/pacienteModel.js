const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Paciente = database.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
      type: DataTypes.STRING,
      allowNull: false 
  },
  datanascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true
  },
  email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
          isEmail: true,
      },
  },
  cpf: {
      type: DataTypes.STRING,
      allowNull: true, 
  },
  endereco: {
      type: DataTypes.STRING,
      allowNull: true
  },
  telefone: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  criadoPor: {
      type: DataTypes.STRING,
      allowNull: true
  },
}, {
  tableName: 'pacientes',
  timestamps: true, 
});

module.exports = Paciente;
