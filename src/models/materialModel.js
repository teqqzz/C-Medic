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
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true 
  },
  valor: { 
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  vencimento: {
    type: DataTypes.DATEONLY,
    allowNull: true 
  },
  unidadeMedida: { // Ex: 'un', 'cx', 'pct', 'L', 'mg'
    type: DataTypes.STRING,
    allowNull: true
  },
  pontoPedido: { 
    type: DataTypes.INTEGER,
    allowNull: true
  },
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
  fornecedorId: { 
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'fornecedores', 
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL' 
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  atualizadoEm: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'materiais',
  timestamps: true, 
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm'
});

module.exports = Material;
