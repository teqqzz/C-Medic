const { Horario, Agendamento } = require('../../models');

const deletarHorarioServices = async (horarioId) => {
    const horario = await Horario.findByPk(horarioId, {
        include: [Agendamento] // Para verificar se está agendado
    });

    if (!horario) {
        throw new Error(`Horário com ID ${horarioId} não encontrado.`);
    }

    if (horario.status === 'Marcado' && horario.Agendamento) {
        throw new Error(`Não é possível excluir o horário. Ele está agendado (Agendamento ID: ${horario.Agendamento.id}). Cancele o agendamento primeiro.`);
    }

    // Se status for 'Aberto' ou 'Cancelado', pode deletar
    await horario.destroy();
    return { mensagem: `Horário ID ${horarioId} (${horario.hora}) excluído com sucesso.` };
};

module.exports = deletarHorarioServices;