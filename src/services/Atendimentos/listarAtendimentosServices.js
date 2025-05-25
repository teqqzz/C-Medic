const { Atendimento, Paciente, Exame, Funcionario, Agendamento, Horario, Agenda } = require('../../models');
const { Op } = require('sequelize');

const listarAtendimentosServices = async (filtros = {}) => {
    const whereClause = {};
    if (filtros.pacienteId) whereClause.pacienteId = filtros.pacienteId;
    if (filtros.funcionarioId) whereClause.funcionarioId = filtros.funcionarioId;
    if (filtros.exameId) whereClause.exameId = filtros.exameId;
    if (filtros.statusAtendimento) whereClause.statusAtendimento = filtros.statusAtendimento;
    if (filtros.statusPagamento) whereClause.statusPagamento = filtros.statusPagamento;
    if (filtros.dataInicio && filtros.dataFim) {
    }
    
    return Atendimento.findAll({
        where: whereClause,
        include: [
            { model: Paciente, attributes: ['id', 'nome'] },
            { model: Exame, attributes: ['id', 'descricao'] },
            { model: Funcionario, attributes: ['id', 'nomeCompleto'] },
            {
                model: Agendamento,
                attributes: ['id'],
                include: [{ model: Horario, attributes: ['hora'], include: [{ model: Agenda, attributes: ['data'] }] }]
            }
        ],
        order: [['id', 'DESC']] 
    });
};

module.exports = listarAtendimentosServices;