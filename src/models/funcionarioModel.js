const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Funcionario = database.define('Funcionario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rg: {
        type: DataTypes.STRING,
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
    },
    endereco: {
        type: DataTypes.STRING,
    },
    telefone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    dataAdmissao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    dataDemissao: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    salario: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

}, {
    tableName: 'funcionarios',
    timestamps: true, 
});

module.exports = Funcionario;