const { Atendimento, Paciente, Exame, Material, ContaReceber, Agendamento, Horario, Agenda } = require('../../models'); // Adjust path
const { Op } = require('sequelize');

async function listarAtendimentosServices({ pacienteId, dataInicio, dataFim, statusPagamento }) {
  try {
    const whereClause = {};
    if (pacienteId) {
      whereClause.pacienteId = pacienteId;
    }
    if (dataInicio && dataFim) {
      whereClause.dataAtendimento = { [Op.between]: [dataInicio, dataFim] };
    } else if (dataInicio) {
      whereClause.dataAtendimento = { [Op.gte]: dataInicio };
    } else if (dataFim) {
      whereClause.dataAtendimento = { [Op.lte]: dataFim };
    }
    if (statusPagamento) {
      whereClause.statusPagamento = statusPagamento;
    }

    const atendimentos = await Atendimento.findAll({
      where: whereClause,
      include: [
        { model: Paciente, attributes: ['id', 'nome', 'datanascimento', 'cpf'] },
        { model: Exame, attributes: ['id', 'descricao', 'tipo'] },
        { model: Material, attributes: ['id', 'descricao', 'tipo'], required: false }, 
        { model: ContaReceber, attributes: ['id', 'valor', 'dataVencimento', 'status'] },
        {
          model: Agendamento,
          attributes: ['id'],
          include: [
            {
              model: Horario,
              attributes: ['hora'],
              include: [
                {model: Agenda, attributes: ['data']}
              ]
            }
          ]
        }
      ],
      order: [['dataAtendimento', 'DESC'], ['id', 'DESC']],
    });

    return atendimentos.map(at => {
        const atendimentoJson = at.toJSON();
        return {
            ...atendimentoJson,
            dataAgendamento: at.Agendamento?.Horario?.Agenda?.data, 
            horaAgendamento: at.Agendamento?.Horario?.hora, 
        };
    });
  } catch (error) {
    console.error('Erro ao listar atendimentos:', error.message);
    throw new Error('Falha ao buscar lista de atendimentos.');
  }
}

module.exports = listarAtendimentosServices;
