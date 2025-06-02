const { DataTypes } = require('sequelize');
const { database } = require('../config/database'); 

const Funcionario = database.define('Funcionario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  genero: {
    type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro não informar'),
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
  telefoneCelular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefoneResidencial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  cargo: { // Campo de cargo diretamente no funcionário
    type: DataTypes.STRING,
    allowNull: false, // Ex: 'Médico', 'Recepcionista', 'Administrador'
  },
  dataAdmissao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dataDemissao: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  status: { // Ativo, Inativo, Férias, Licença
    type: DataTypes.ENUM('Ativo', 'Inativo', 'Ferias', 'Licenca'),
    defaultValue: 'Ativo',
    allowNull: false,
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  tableName: 'funcionarios',
  timestamps: true,
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm',
});

module.exports = Funcionario;
