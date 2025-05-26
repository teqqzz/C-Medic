const { DataTypes } = require('sequelize');
const { database } = require('../config/database'); // Ajuste o caminho conforme necessário
const { addDays, format } = require('date-fns');

const ContaPagar = database.define('ContaPagar', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  valorPago: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  dataEmissao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dataVencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dataPagamento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  numeroDocumento: { // Ex: número da nota fiscal, boleto
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigoBarras: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Paga', 'Vencida', 'Cancelada', 'Agendada'),
    allowNull: false,
    defaultValue: 'Pendente',
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  recorrente: { // Indica se é uma despesa recorrente
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  tableName: 'contas_pagar',
  timestamps: true,
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm',
  hooks: {
    beforeValidate: (conta) => {
      if (!conta.dataVencimento && conta.dataEmissao) {
        conta.dataVencimento = format(addDays(new Date(conta.dataEmissao), 30), 'yyyy-MM-dd');
      } else if (!conta.dataVencimento && !conta.dataEmissao) {
          const today = new Date();
          conta.dataEmissao = format(today, 'yyyy-MM-dd');
          conta.dataVencimento = format(addDays(today, 30), 'yyyy-MM-dd');
      }
    }
  }
});

module.exports = ContaPagar;
