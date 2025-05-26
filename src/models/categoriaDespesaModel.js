const { DataTypes } = require('sequelize');
const { database } = require('../config/database'); // Ajuste o caminho conforme necessário

const CategoriaDespesa = database.define('CategoriaDespesa', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  criadoPor: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  funcionarioCriadorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'funcionarios', 
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  atualizadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'categorias_despesa',
  timestamps: true,
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm',
});

module.exports = CategoriaDespesa;
