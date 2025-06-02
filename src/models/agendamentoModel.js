const { DataTypes } = require('sequelize');
const { database } = require('../config/database');


const Agendamento = database.define('Agendamento', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  observacoes: { type: DataTypes.STRING }
}, {
  tableName: 'agendamentos',
  timestamps: false
});

module.exports = Agendamento;