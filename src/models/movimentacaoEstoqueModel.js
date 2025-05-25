
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const MovimentacaoEstoque = database.define('MovimentacaoEstoque', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tipoMovimentacao: {
        type: DataTypes.ENUM(
            'Entrada Compra',
            'Saída por Uso', 
            'Saída por Venda',
            'Ajuste Inventário Positivo',
            'Ajuste Inventário Negativo',
            'Perda/Vencimento',
            'Devolução Fornecedor',
            'Devolução Cliente'
        ),
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dataMovimentacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    observacao: {
        type: DataTypes.STRING,
    },

}, {
    tableName: 'movimentacoes_estoque',
    timestamps: true,
});

module.exports = MovimentacaoEstoque;