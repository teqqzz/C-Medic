const { Agendamento, Horario } = require('../../models');
const { database } = require('../../config/database');
const { Op } = require('sequelize');

async function confirmarAgendamentoServices(agendamentoId, novoStatusHorario) {
    if (!['Aberto', 'Marcado', 'Cancelado'].includes(novoStatusHorario)) {
        throw new Error("Status inválido. Use 'Aberto', 'Marcado' ou 'Cancelado'.");
    }

    const t = await database.transaction();
    try {
        const agendamento = await Agendamento.findByPk(agendamentoId, {
            include: [Horario],
            transaction: t
        });

        if (!agendamento) {
            await t.rollback();
            throw new Error(`Agendamento com ID ${agendamentoId} não encontrado.`);
        }

        if (!agendamento.Horario) {
            await t.rollback();
            throw new Error(`Horário associado ao agendamento ID ${agendamentoId} não encontrado.`);
        }
        
        const horarioOriginalStatus = agendamento.Horario.status;

        if (horarioOriginalStatus === 'Cancelado' && novoStatusHorario === 'Marcado') {
            const conflito = await Agendamento.findOne({
                where: {
                    horarioId: agendamento.horarioId,
                    id: { [Op.ne]: agendamentoId } 
                },
                include: [{ model: Horario, where: { status: 'Marcado' } }],
                transaction: t
            });
            if (conflito) {
                await t.rollback();
                throw new Error(`Não é possível marcar. O horário já está ocupado por outro agendamento.`);
            }
        }


        await agendamento.Horario.update({ status: novoStatusHorario }, { transaction: t });
        

        await t.commit();
        return {
            agendamentoId: agendamento.id,
            horarioId: agendamento.horarioId,
            statusAnterior: horarioOriginalStatus,
            novoStatus: novoStatusHorario,
            observacoes: agendamento.observacoes_atualizadas || agendamento.observacoes
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

module.exports = confirmarAgendamentoServices;