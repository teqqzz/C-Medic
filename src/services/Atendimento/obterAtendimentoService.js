const { Atendimento, Paciente, Exame, Material, ContaReceber, Agendamento, Horario, Agenda } = require('../../models'); 

async function obterAtendimentoService(atendimentoId) {
  try {
    const atendimento = await Atendimento.findByPk(atendimentoId, {
      include: [
        { model: Paciente, attributes: ['id', 'nome', 'datanascimento', 'email', 'cpf', 'endereco'] },
        { model: Exame, attributes: ['id', 'descricao', 'tipo', 'codigo', 'valor'] },
        { model: Material, attributes: ['id', 'descricao', 'tipo', 'codigo', 'valor', 'quantidade', 'vencimento'], required: false },
        { model: ContaReceber }, 
        {
          model: Agendamento,
          attributes: ['id', 'observacoes'],
          include: [
            {
              model: Horario,
              attributes: ['hora', 'status'],
              include: [
                {model: Agenda, attributes: ['data']}
              ]
            }
          ]
        }
      ],
    });

    if (!atendimento) {
      return null; 
    }
    
    const atendimentoJson = atendimento.toJSON();
    return {
        ...atendimentoJson,
        dataAgendamentoOriginal: atendimento.Agendamento?.Horario?.Agenda?.data,
        horaAgendamentoOriginal: atendimento.Agendamento?.Horario?.hora,
        statusHorarioOriginal: atendimento.Agendamento?.Horario?.status,
        observacoesAgendamentoOriginal: atendimento.Agendamento?.observacoes,
    };

  } catch (error) {
    console.error(`Erro ao obter atendimento ID ${atendimentoId}:`, error.message);
    throw new Error('Falha ao buscar detalhes do atendimento.');
  }
}

module.exports = obterAtendimentoService;
