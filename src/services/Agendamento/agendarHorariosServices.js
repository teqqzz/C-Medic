const { Agendamento, Horario, Agenda, Exame, Paciente, Atendimento, database } = require('../../models');
const { Op } = require('sequelize');

async function agendarHorariosServices({ pacienteId, horariosIds, exameId, observacoes, funcionarioIdLogado }) {
    const t = await database.transaction();
    try {
        const paciente = await Paciente.findByPk(pacienteId, { transaction: t });
        if (!paciente) {
            throw new Error(`Paciente com ID ${pacienteId} não encontrado.`);
        }

        const exame = await Exame.findByPk(exameId, { transaction: t });
        if (!exame) {
            throw new Error(`Exame com ID ${exameId} não encontrado.`);
        }

        const resultadosFinais = [];

        for (const horarioId of horariosIds) {
            const horario = await Horario.findByPk(horarioId, { include: [Agenda], transaction: t });

            if (!horario) {
                throw new Error(`Horário com ID ${horarioId} não encontrado.`);
            }
            if (horario.status !== 'Aberto') {
                throw new Error(`Horário ${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()} não está disponível (Status: ${horario.status}).`);
            }
            const agendamentoExistenteParaPacienteNoHorario = await Agendamento.findOne({
                where: { pacienteId: pacienteId, horarioId: horarioId },
                include: [{ model: Horario, where: { status: { [Op.ne]: 'Cancelado' } } }],
                transaction: t
            });
            if (agendamentoExistenteParaPacienteNoHorario) {
                 throw new Error(`Paciente já possui um agendamento não cancelado neste horário (${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()}).`);
            }

            const novoAgendamento = await Agendamento.create({
                pacienteId,
                horarioId,
                exameId,
                observacoes
            }, { transaction: t });

            await horario.update({ status: 'Marcado' }, { transaction: t });

            const novoAtendimento = await Atendimento.create({
                agendamentoId: novoAgendamento.id,
                pacienteId: paciente.id,
                exameId: exame.id,
                funcionarioId: funcionarioIdLogado || null,
                valorCobrado: exame.valor,
                statusAtendimento: 'Agendado',
                statusPagamento: 'Pendente',
            }, { transaction: t });

            resultadosFinais.push({
                agendamento: {
                    id: novoAgendamento.id,
                    observacoes: novoAgendamento.observacoes,
                    horarioId: novoAgendamento.horarioId,
                    exameId: novoAgendamento.exameId,
                    pacienteId: novoAgendamento.pacienteId
                },
                atendimento: {
                    id: novoAtendimento.id,
                    statusAtendimento: novoAtendimento.statusAtendimento,
                    statusPagamento: novoAtendimento.statusPagamento,
                    valorCobrado: novoAtendimento.valorCobrado
                },
                detalhesVisuais: {
                    pacienteNome: paciente.nome,
                    exameDescricao: exame.descricao,
                    data: horario.Agenda.data,
                    hora: horario.hora,
                    statusHorarioFinal: 'Marcado',
                }
            });
        }

        await t.commit();
        return resultadosFinais;

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

module.exports = agendarHorariosServices;