const { Horario, Agenda } = require('../../models');
const { addMinutes, format, isBefore } = require('date-fns');

const diasSemana = {
  domingo: 0,
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sabado: 6
};

function stringToDateHora(date, time) {
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function gerarHorarios(data, horaInicial, horaFinal, intervalo) {
  const horarios = [];
  let atual = stringToDateHora(data, horaInicial);
  const fim = stringToDateHora(data, horaFinal);

  while (isBefore(atual, fim)) {
    horarios.push(format(atual, 'HH:mm'));
    atual = addMinutes(atual, intervalo);
  }

  return horarios;
}

async function gerarAgendaServices({ dias, dataInicio, dataFim, intervalo, horaInicial, horaFinal }) {
  const dataInicioDate = new Date(dataInicio);
  const dataFimDate = new Date(dataFim);

  for (let d = new Date(dataInicioDate); d <= dataFimDate; d.setDate(d.getDate() + 1)) {
    const diaSemana = d.getDay();
    if (dias.some(dia => diasSemana[dia.toLowerCase()] === diaSemana)) {
      const dataStr = format(new Date(d), 'yyyy-MM-dd');
      const agenda = await Agenda.create({ data: dataStr });

      const horarios = gerarHorarios(dataStr, horaInicial, horaFinal, intervalo);
      for (const hora of horarios) {
        await Horario.create({ hora, agendaId: agenda.id });
      }
    }
  }

  return { mensagem: 'Agendas criadas com sucesso!' };
}

module.exports = gerarAgendaServices;