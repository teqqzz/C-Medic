const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Exame = database.define('Exame', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('Laboratorial', 'Clínico', 'Imagem', 'Outros'),
    allowNull: false
  },
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT, 
    allowNull: false
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  criadoPor: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'exames',
  timestamps: false 
});

module.exports = Exame;