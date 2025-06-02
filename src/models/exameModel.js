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
    defaultValue: DataTypes.NOW
  }

}, {
  tableName: 'exames',
  timestamps: false 
});

module.exports = Exame;
