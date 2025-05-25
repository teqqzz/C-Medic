const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Atendimento = database.define('Atendimento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dataHoraInicioReal: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dataHoraFimReal: {
        type: DataTypes.DATE, 
        allowNull: true,
    },
    statusAtendimento: {
        type: DataTypes.ENUM(
            'Agendado', 
            'Aguardando', 
            'Em Andamento',
            'Realizado',
            'Cancelado',
            'Não Compareceu',
            'Laudado' 
        ),
        defaultValue: 'Agendado',
        allowNull: false,
    },
    statusPagamento: {
        type: DataTypes.ENUM(
            'Pendente',
            'Pago',
            'Pago Parcialmente',
            'Isento',
            'Aguardando Reembolso',
            'Reembolsado',
            'Cortesia'
        ),
        defaultValue: 'Pendente',
        allowNull: false,
    },
    valorCobrado: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    valorPago: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0
    },
    observacoesClinicas: {
        type: DataTypes.TEXT,
    },
    laudoPath: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'atendimentos',
    timestamps: true,
});

module.exports = Atendimento;