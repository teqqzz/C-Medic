const { Atendimento, Paciente, Exame, Funcionario, Agendamento, Horario, Agenda } = require('../../models');

const buscarAtendimentoPorIdServices = async (id) => {
    return Atendimento.findByPk(id, {
        include: [
            { model: Paciente, attributes: ['id', 'nome', 'email'] },
            { model: Exame, attributes: ['id', 'descricao'] },
            { model: Funcionario, attributes: ['id', 'nomeCompleto', 'cargo'] },
            {
                model: Agendamento,
                attributes: ['id', 'observacoes'],
                include: [{ model: Horario, attributes: ['hora'], include: [{ model: Agenda, attributes: ['data'] }] }]
            }
        ]
    });
};

module.exports = buscarAtendimentoPorIdServices;