const { DataTypes } = require('sequelize');
const { database } = require('../config/database'); 

const Atendimento = database.define('Atendimento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  agendamentoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'agendamentos',
      key: 'id',
    },
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pacientes',
      key: 'id',
    },
  },
  exameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'exames',
      key: 'id',
    },
  },
  materialId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'materiais',
      key: 'id',
    },
  },
  dataAtendimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  descricaoAtendimento: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  valorExame: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  valorMaterial: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  statusPagamento: {
    type: DataTypes.ENUM('Pendente', 'Pago', 'Cancelado'),
    allowNull: false,
    defaultValue: 'Pendente',
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
    defaultValue: DataTypes.NOW,
  },
  atualizadoEm: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  }
}, {
  tableName: 'atendimentos',
  timestamps: true,
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm',
});

module.exports = Atendimento;
