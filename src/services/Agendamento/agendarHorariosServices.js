const { Agendamento, Horario, Agenda, Exame, Paciente } = require('../../models'); // Ajuste o caminho conforme sua estrutura
const { database } = require('../../config/database'); // Ajuste o caminho
const { Op } = require('sequelize');

async function agendarHorariosServices({ pacienteId, agendamentosPropostos }) {
  const t = await database.transaction();
  try {
    const paciente = await Paciente.findByPk(pacienteId, { transaction: t });
    if (!paciente) {
      throw new Error(`Paciente com ID ${pacienteId} não encontrado.`);
    }

    if (!agendamentosPropostos || !Array.isArray(agendamentosPropostos) || agendamentosPropostos.length === 0) {
        throw new Error('A lista de agendamentos propostos é obrigatória e não pode estar vazia.');
    }

    const agendadosComDetalhes = [];

    for (const proposta of agendamentosPropostos) {
      const { horarioId, exameId, observacoes } = proposta;

      if (!horarioId || !exameId) {
          await t.rollback(); // Garante que a transação seja desfeita se um item for inválido
          throw new Error(`Cada proposta de agendamento deve conter horarioId e exameId. Proposta inválida: ${JSON.stringify(proposta)}`);
      }

      const exame = await Exame.findByPk(exameId, { transaction: t });
      if (!exame) {
        await t.rollback();
        throw new Error(`Exame com ID ${exameId} (proposto para o horário ID ${horarioId}) não encontrado.`);
      }

      const horario = await Horario.findByPk(horarioId, {
        include: [Agenda],
        transaction: t
      });

      if (!horario) {
        await t.rollback();
        throw new Error(`Horário com ID ${horarioId} não encontrado.`);
      }

      if (horario.status !== 'Aberto') {
        await t.rollback();
        throw new Error(`Horário ${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()} (ID: ${horarioId}) não está disponível (Status: ${horario.status}).`);
      }
      
      // Verifica se o paciente já tem algum agendamento (não cancelado) neste mesmo horário, independente do exame
      const agendamentoExistenteParaPacienteNoHorario = await Agendamento.findOne({
          where: {
              pacienteId: pacienteId,
              horarioId: horarioId,
          },
          include: [{ model: Horario, where: { status: { [Op.ne]: 'Cancelado' } } }],
          transaction: t
      });

      if (agendamentoExistenteParaPacienteNoHorario) {
          await t.rollback();
          throw new Error(`Paciente já possui um agendamento não cancelado neste horário (${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()}, ID: ${horarioId}).`);
      }


      const novoAgendamento = await Agendamento.create({
        pacienteId,
        horarioId,
        exameId, // Usar o exameId da proposta atual
        observacoes // Usar as observacoes da proposta atual
      }, { transaction: t });

      await horario.update({ status: 'Marcado' }, { transaction: t });

      agendadosComDetalhes.push({
        agendamentoId: novoAgendamento.id,
        pacienteNome: paciente.nome,
        exameDescricao: exame.descricao,
        exameId: exame.id,
        data: horario.Agenda.data,
        hora: horario.hora,
        horarioId: horario.id,
        statusHorario: 'Marcado',
        observacoes: novoAgendamento.observacoes
      });
    }

    await t.commit();
    return agendadosComDetalhes;
  } catch (error) {
    await t.rollback(); // Garante rollback em qualquer erro durante o loop ou antes
    console.error("Erro no serviço agendarHorariosServices (carrinho):", error.message);
    throw error; // Re-lança o erro para ser tratado pelo controller
  }
}

module.exports = agendarHorariosServices;
