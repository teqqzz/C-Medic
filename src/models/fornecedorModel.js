// src/models/fornecedorModel.js
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Fornecedor = database.define('Fornecedor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nomeFantasia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    razaoSocial: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    cnpjCpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inscricaoEstadual: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
    telefonePrincipal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefoneSecundario: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: { // Sigla UF
        type: DataTypes.STRING(2),
        allowNull: true,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nomeContato: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'fornecedores',
    timestamps: true,
});

module.exports = Fornecedor;
