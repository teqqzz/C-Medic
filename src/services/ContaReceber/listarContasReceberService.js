const { ContaReceber, Paciente, Atendimento, Exame } = require('../../models');
const { Op } = require('sequelize');

async function listarContasReceberService({ pacienteId, dataVencimentoInicio, dataVencimentoFim, status }) {
  try {
    const whereClause = {};
    if (pacienteId) {
      whereClause.pacienteId = pacienteId;
    }
    if (dataVencimentoInicio && dataVencimentoFim) {
      whereClause.dataVencimento = { [Op.between]: [dataVencimentoInicio, dataVencimentoFim] };
    } else if (dataVencimentoInicio) {
      whereClause.dataVencimento = { [Op.gte]: dataVencimentoInicio };
    } else if (dataVencimentoFim) {
      whereClause.dataVencimento = { [Op.lte]: dataVencimentoFim };
    }
    if (status) {
      const validStatuses = ContaReceber.getAttributes().status.values;
      if (validStatuses.includes(status)) {
        whereClause.status = status;
      } else {
        console.warn(`Status de filtro inválido: ${status}. Ignorando filtro de status.`);
      }
    }

    const contas = await ContaReceber.findAll({
      where: whereClause,
      include: [
        {
          model: Paciente,
          attributes: ['id', 'nome', 'cpf'],
        },
        {
          model: Atendimento,
          attributes: ['id', 'dataAtendimento', 'valorTotal'],
          include: [
            {
              model: Exame,
              attributes: ['descricao']
            }
          ]
        },
      ],
      order: [
        ['dataVencimento', 'ASC'],
        ['id', 'ASC']
      ],
    });

    return contas.map(conta => {
        const contaJson = conta.toJSON();
        return {
            ...contaJson,
            descricaoExameAtendimento: conta.Atendimento?.Exame?.descricao
        }
    });

  } catch (error) {
    console.error('Erro ao listar contas a receber:', error.message);
    throw new Error('Falha ao buscar lista de contas a receber.');
  }
}

module.exports = listarContasReceberService;
