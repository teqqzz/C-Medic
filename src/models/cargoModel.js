
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Cargo = database.define('Cargo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nomeCargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'cargos',
    timestamps: true,
});

module.exports = Cargo;
