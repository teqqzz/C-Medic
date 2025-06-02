const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

    const Agenda = database.define('Agenda',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        data:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        tableName: 'agenda',
        timestamps: false
    });

module.exports = Agenda;