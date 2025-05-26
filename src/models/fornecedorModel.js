const { DataTypes } = require('sequelize');
const { database } = require('../config/database'); 

const Fornecedor = database.define('Fornecedor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeFantasia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razaoSocial: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  cpf: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  inscricaoEstadual: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: { // UF
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefonePrincipal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefoneSecundario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  nomeContato: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
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
  tableName: 'fornecedores',
  timestamps: true,
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm',
  hooks: {
    beforeValidate: (fornecedor) => {
        if (fornecedor.cnpj) fornecedor.cpf = null;
        else if (fornecedor.cpf) fornecedor.cnpj = null;
    }
  }
});

module.exports = Fornecedor;
