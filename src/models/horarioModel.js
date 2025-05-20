const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Horario = database.define('Horario', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('Aberto', 'Marcado', 'Cancelado'),
        defaultValue: 'Aberto'
    }
}, {
    tableName: 'horarios',
    timestamps: false
});



module.exports = Horario;