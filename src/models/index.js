const Paciente = require('./pacienteModel');
const Exame = require('./exameModel');
const Material = require('./materialModel');
const Agenda = require('./agendaModel');
const Horario = require('./horarioModel');
const Agendamento = require('./agendamentoModel');

// Relacionamentos: Agendamento
Paciente.hasMany(Agendamento, { foreignKey: 'pacienteId' });
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Exame.hasMany(Agendamento, { foreignKey: 'exameId' });
Agendamento.belongsTo(Exame, { foreignKey: 'exameId' });

Horario.hasOne(Agendamento, { foreignKey: 'horarioId' });
Agendamento.belongsTo(Horario, { foreignKey: 'horarioId' });

// Relacionamento: Horário
Agenda.hasMany(Horario, { foreignKey: 'agendaId' });
Horario.belongsTo(Agenda, { foreignKey: 'agendaId' });

// Exportando os models
module.exports = {
  Paciente,
  Exame,
  Material,
  Agenda,
  Horario,
  Agendamento
};