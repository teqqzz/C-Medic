const { Agenda, Horario, Agendamento, database } = require('../../models');
const { Op } = require('sequelize');

const deletarAgendaServices = async (agendaId) => {
    const t = await database.transaction();
    try {
        const agenda = await Agenda.findByPk(agendaId, {
            include: [{
                model: Horario,
                include: [Agendamento] 
            }],
            transaction: t
        });

        if (!agenda) {
            throw new Error(`Agenda com ID ${agendaId} não encontrada.`);
        }

        const horariosAgendados = agenda.Horarios.filter(h => h.status === 'Marcado' && h.Agendamento);
        if (horariosAgendados.length > 0) {
            throw new Error(`Não é possível excluir a agenda. Existem ${horariosAgendados.length} horários agendados nesta data (${agenda.data}). Cancele os agendamentos primeiro.`);
        }


        const idsHorariosParaDeletar = agenda.Horarios.map(h => h.id);
        if (idsHorariosParaDeletar.length > 0) {
            await Horario.destroy({
                where: { id: { [Op.in]: idsHorariosParaDeletar } },
                transaction: t
            });
        }


        await agenda.destroy({ transaction: t });

        await t.commit();
        return { mensagem: `Agenda do dia ${agenda.data} e seus horários não agendados foram excluídos com sucesso.` };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = deletarAgendaServices;