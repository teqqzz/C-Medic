const { Horario, Agenda} = require('../../models');

async function adicionarEncaixeServices(data, hora) {
  let agenda = await Agenda.findOne({ where: { data } });

  if (!agenda) {
    agenda = await Agenda.create({ data });
  }

  const novoHorario = await Horario.create({ hora, agendaId: agenda.id, status: 'Aberto' });
  return novoHorario;
}

module.exports = adicionarEncaixeServices;