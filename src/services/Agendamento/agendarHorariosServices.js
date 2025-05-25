const { Agendamento, Horario, Agenda, Exame, Paciente } = require('../../models');
const { database } = require('../../config/database');
const { Op } = require('sequelize');
const { subMonths, startOfDay } = require('date-fns');

const RECENT_EXAM_PERIOD_MONTHS = 6;

async function agendarHorariosServices({ pacienteId, horariosIds, exameId, observacoes }) {
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

        const dataLimiteExameRecente = subMonths(new Date(), RECENT_EXAM_PERIOD_MONTHS);

        const agendamentosRecentes = await Agendamento.findAll({
            where: {
                pacienteId,
                exameId,
            },
            include: [{
                model: Horario,
                required: true,
                include: [{
                    model: Agenda,
                    required: true,
                    where: {
                        data: {
                            [Op.gte]: startOfDay(dataLimiteExameRecente)
                        }
                    }
                }]
            }],
            transaction: t
        });

        const agendamentosRecentesNaoCancelados = agendamentosRecentes.filter(ag => ag.Horario.status !== 'Cancelado');

        if (agendamentosRecentesNaoCancelados.length > 0) {
            throw new Error(`Paciente já possui um agendamento para o exame '${exame.descricao}' nos últimos ${RECENT_EXAM_PERIOD_MONTHS} meses.`);
        }

        const agendadosComDetalhes = [];

        for (const horarioId of horariosIds) {
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
                throw new Error(`Horário ${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()} não está disponível (Status: ${horario.status}).`);
            }
            
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
                 throw new Error(`Paciente já possui um agendamento não cancelado neste horário (${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()}).`);
            }


            const novoAgendamento = await Agendamento.create({
                pacienteId,
                horarioId,
                exameId,
                observacoes
            }, { transaction: t });

            await horario.update({ status: 'Marcado' }, { transaction: t });

            agendadosComDetalhes.push({
                agendamentoId: novoAgendamento.id,
                pacienteNome: paciente.nome,
                exameDescricao: exame.descricao,
                data: horario.Agenda.data,
                hora: horario.hora,
                statusHorario: 'Marcado',
                observacoes: novoAgendamento.observacoes
            });
        }

        await t.commit();
        return agendadosComDetalhes;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

module.exports = agendarHorariosServices;