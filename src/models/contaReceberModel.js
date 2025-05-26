const { DataTypes } = require('sequelize');
const { database } = require('../config/database'); 
const { addDays } = require('date-fns');

const ContaReceber = database.define('ContaReceber', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  atendimentoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
    references: {
      model: 'atendimentos', 
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
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dataEmissao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dataVencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    // Default to 30 days from emission, can be overridden
    defaultValue: () => format(addDays(new Date(), 30), 'yyyy-MM-dd'),
  },
  dataPagamento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  valorPago: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Pago', 'Vencido', 'Cancelado'),
    allowNull: false,
    defaultValue: 'Pendente',
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
  tableName: 'contas_receber',
  timestamps: true,
  createdAt: 'criadoEm',
  updatedAt: 'atualizadoEm',
  hooks: {
    beforeValidate: (conta) => {
      if (!conta.dataVencimento && conta.dataEmissao) {
          const { format } = require('date-fns'); 
          conta.dataVencimento = format(addDays(new Date(conta.dataEmissao), 30), 'yyyy-MM-dd');
      } else if (!conta.dataVencimento && !conta.dataEmissao) {
          const { format } = require('date-fns');
          const today = new Date();
          conta.dataEmissao = format(today, 'yyyy-MM-dd');
          conta.dataVencimento = format(addDays(today, 30), 'yyyy-MM-dd');
      }
    }
  }
});


function format(date, formatString) {
    const { format: formatDateFn } = require('date-fns');
    return formatDateFn(date, formatString);
}


module.exports = ContaReceber;
