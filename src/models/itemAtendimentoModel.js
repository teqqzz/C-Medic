
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const ItemAtendimento = database.define('ItemAtendimento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1,
        }
    },
    valorUnitarioRegistrado: { 
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    descricaoItem: { 
        type: DataTypes.STRING,
        allowNull: true, 
    }
}, {
    tableName: 'itens_atendimento',
    timestamps: true, 
});

module.exports = ItemAtendimento;