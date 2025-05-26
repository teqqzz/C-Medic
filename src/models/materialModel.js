// src/models/materialModel.js
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
    type: DataTypes.ENUM(
        'Medicamento', 'EPI', 'Material Cirúrgico', 'Material de Curativo',
        'Material de Coleta Laboratorial', 'Material Odontológico',
        'Material de Escritório', 'Material de Limpeza',
        'Insumo Hospitalar Geral', 'Outros Insumos Médicos'
    ),
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unidadeMedida: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'UN'
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
  estoqueMinimo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  estoqueMaximo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  vencimentoGeral: { 
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  criadoPor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'materiais',
  timestamps: true 
});



module.exports = Material;
