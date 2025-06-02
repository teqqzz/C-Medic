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

  criadoPor: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  funcionarioCriadorId: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'funcionarios',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'pacientes',
  timestamps: false, 
});

module.exports = Paciente;
