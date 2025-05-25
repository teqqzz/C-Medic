const { Agendamento, Horario, Atendimento, database } = require('../../models');
const { Op } = require('sequelize');


async function confirmarAgendamentoServices(agendamentoId, acaoAgendamento) {

    if (!['Marcado', 'Cancelado'].includes(acaoAgendamento)) {
        throw new Error("Ação inválida para o agendamento. Use 'Marcado' ou 'Cancelado'.");
    }

    const t = await database.transaction();
    try {
        const agendamento = await Agendamento.findByPk(agendamentoId, {
            include: [Horario, Atendimento],
            transaction: t
        });

        if (!agendamento) {
            throw new Error(`Agendamento com ID ${agendamentoId} não encontrado.`);
        }
        if (!agendamento.Horario) {
            throw new Error(`Horário associado ao agendamento ID ${agendamentoId} não encontrado.`);
        }

        if (!agendamento.Atendimento) {

             console.warn(`Agendamento ID ${agendamentoId} não possui um Atendimento vinculado. O status do Atendimento não será atualizado.`);
        }

        const horarioOriginalStatus = agendamento.Horario.status;
        let novoStatusParaHorarioBd;
        let novoStatusParaAtendimentoBd;

        if (acaoAgendamento === 'Cancelado') {
            if (agendamento.Atendimento) {
                novoStatusParaAtendimentoBd = 'Cancelado'; 

                if (agendamento.Atendimento.valorPago > 0) {
                    await agendamento.Atendimento.update({
                        statusAtendimento: novoStatusParaAtendimentoBd,
                        statusPagamento: 'Aguardando Reembolso'
                    }, { transaction: t });
                } else {
                    await agendamento.Atendimento.update({
                        statusAtendimento: novoStatusParaAtendimentoBd,
                        statusPagamento: 'Pendente' 
                    }, { transaction: t });
                }
            }
        } else if (acaoAgendamento === 'Marcado') {

            if (horarioOriginalStatus === 'Aberto' || horarioOriginalStatus === 'Cancelado') {
                const horarioAtual = await Horario.findByPk(agendamento.Horario.id, { transaction: t });
                if (horarioAtual.status !== 'Aberto') {
                     throw new Error(`Não é possível marcar. O horário ${horarioAtual.hora} já está ${horarioAtual.status}.`);
                }

                const conflito = await Agendamento.findOne({
                    where: {
                        horarioId: agendamento.Horario.id,
                        id: { [Op.ne]: agendamentoId } 
                    },
                    include: [{ model: Horario, where: { status: 'Marcado' } }],
                    transaction: t
                });
                if (conflito) {
                    throw new Error(`Não é possível marcar. O horário já está ocupado por outro agendamento (ID: ${conflito.id}).`);
                }
            }
            novoStatusParaHorarioBd = 'Marcado';
            if (agendamento.Atendimento) {
                novoStatusParaAtendimentoBd = 'Agendado'; 
                 await agendamento.Atendimento.update({
                    statusAtendimento: novoStatusParaAtendimentoBd,

                }, { transaction: t });
            }
        }

        await agendamento.Horario.update({ status: novoStatusParaHorarioBd }, { transaction: t });

        let obs = agendamento.observacoes || "";
        obs += `\n[Status do Agendamento alterado para ${acaoAgendamento} em ${new Date().toLocaleString()}].`;
        await agendamento.update({ observacoes: obs }, {transaction: t});


        await t.commit();
        return {
            agendamentoId: agendamento.id,
            horarioId: agendamento.Horario.id,
            statusAnteriorHorario: horarioOriginalStatus,
            novoStatusHorario: novoStatusParaHorarioBd,
            atendimentoStatus: agendamento.Atendimento ? novoStatusParaAtendimentoBd : null,
            observacoes: agendamento.observacoes
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

module.exports = confirmarAgendamentoServices;