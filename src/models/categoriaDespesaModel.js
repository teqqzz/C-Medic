const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const CategoriaDespesa = database.define('CategoriaDespesa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'categorias_despesa',
    timestamps: true,
});

module.exports = CategoriaDespesa;