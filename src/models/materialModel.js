const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Material = database.define('Material', {
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
    type: DataTypes.ENUM('Medicamento', 'EPI', 'Escritorio', 'Hospitalar', 'Outros'),
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
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vencimento: {
    type: DataTypes.DATEONLY,
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
  tableName: 'materiais',
  timestamps: false
});

module.exports = Material;