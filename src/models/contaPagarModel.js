// src/models/contaPagarModel.js
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

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
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dataEmissao: {
        type: DataTypes.DATEONLY,
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
    valorPago: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(
            'Pendente',
            'Paga Parcialmente',
            'Paga Totalmente',
            'Vencida',
            'Cancelada'
        ),
        allowNull: false,
        defaultValue: 'Pendente',
    },
    observacoes: {
        type: DataTypes.TEXT,
    },
    
}, {
    tableName: 'contas_pagar',
    timestamps: true,
});

module.exports = ContaPagar;
