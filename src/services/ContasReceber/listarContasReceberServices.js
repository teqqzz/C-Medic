const { ContaReceber, Paciente, Atendimento } = require('../../models');
const { Op } = require('sequelize');

const listarContasReceberServices = async (filtros = {}) => {
    const whereClause = {};
    const includeClause = [
        { model: Paciente, attributes: ['id', 'nome', 'cpf'] },
        { model: Atendimento, attributes: ['id', 'dataHoraInicioReal', 'statusAtendimento'] } 
    ];

    if (filtros.pacienteId) {
        whereClause.pacienteId = filtros.pacienteId;
    }
    if (filtros.atendimentoId) {
        whereClause.atendimentoId = filtros.atendimentoId;
    }
    if (filtros.status) {
        whereClause.status = filtros.status;
    }
    if (filtros.dataVencimentoInicio && filtros.dataVencimentoFim) {
        whereClause.dataVencimento = {
            [Op.between]: [new Date(filtros.dataVencimentoInicio), new Date(filtros.dataVencimentoFim + 'T23:59:59.999Z')]
        };
    } else if (filtros.dataVencimentoInicio) {
        whereClause.dataVencimento = { [Op.gte]: new Date(filtros.dataVencimentoInicio) };
    } else if (filtros.dataVencimentoFim) {
        whereClause.dataVencimento = { [Op.lte]: new Date(filtros.dataVencimentoFim + 'T23:59:59.999Z') };
    }


    return ContaReceber.findAll({
        where: whereClause,
        include: includeClause,
        order: [['dataVencimento', 'ASC'], ['dataEmissao', 'DESC']]
    });
};

module.exports = listarContasReceberServices;