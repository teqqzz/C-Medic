// src/models/contaReceberModel.js
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const ContaReceber = database.define('ContaReceber', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    descricao: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    valorTotalAReceber: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    valorRecebido: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    dataEmissao: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    dataVencimento: {
        type: DataTypes.DATEONLY,
        allowNull: true, 
    },
    dataRecebimento: { 
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(
            'Pendente',
            'Recebida Parcialmente',
            'Recebida Totalmente',
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
    tableName: 'contas_receber',
    timestamps: true,
});

module.exports = ContaReceber;
