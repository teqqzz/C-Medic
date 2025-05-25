const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const ItemCarrinho = database.define('ItemCarrinho', {
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
    precoUnitarioNoMomento: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }

}, {
    tableName: 'itens_carrinho',
    timestamps: false, 
});

module.exports = ItemCarrinho;