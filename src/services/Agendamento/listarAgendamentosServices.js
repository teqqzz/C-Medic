const { Agendamento, Paciente, Exame, Horario, Agenda } = require('../../models');

async function listarAgendamentosServices(pacienteId) {
    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
        throw new Error(`Paciente com ID ${pacienteId} não encontrado.`);
    }

    const agendamentos = await Agendamento.findAll({
        where: { pacienteId },
        include: [
            {
                model: Paciente,
                attributes: ['nome', 'datanascimento']
            },
            {
                model: Exame,
                attributes: ['descricao', 'tipo', 'codigo']
            },
            {
                model: Horario,
                attributes: ['hora', 'status'],
                include: {
                    model: Agenda,
                    attributes: ['data']
                }
            }
        ],
        order: [
            [{ model: Horario }, { model: Agenda }, 'data', 'ASC'],
            [{ model: Horario }, 'hora', 'ASC']
        ]
    });

    if (!agendamentos || agendamentos.length === 0) {
        return [];
    }

    return agendamentos.map(ag => ({
        idAgendamento: ag.id,
        observacoes: ag.observacoes,
        paciente: {
            nome: ag.Paciente.nome,
            datanascimento: ag.Paciente.datanascimento
        },
        exame: {
            descricao: ag.Exame.descricao,
            tipo: ag.Exame.tipo,
            codigo: ag.Exame.codigo
        },
        horario: {
            data: ag.Horario.Agenda.data,
            hora: ag.Horario.hora,
            status: ag.Horario.status
        }
    }));
}

module.exports = listarAgendamentosServices;