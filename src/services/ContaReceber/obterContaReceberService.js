const { ContaReceber, Paciente, Atendimento, Exame, Material } = require('../../models'); 

async function obterContaReceberService(contaReceberId) {
  try {
    const conta = await ContaReceber.findByPk(contaReceberId, {
      include: [
        {
          model: Paciente,
          attributes: ['id', 'nome', 'cpf', 'email', 'datanascimento'],
        },
        {
          model: Atendimento,
          attributes: ['id', 'dataAtendimento', 'descricaoAtendimento', 'valorExame', 'valorMaterial', 'valorTotal', 'statusPagamento'],
          include: [
            { model: Exame, attributes: ['id', 'descricao', 'tipo'] },
            { model: Material, attributes: ['id', 'descricao'], required: false }
          ]
        },
      ],
    });

    if (!conta) {
      return null;
    }
    
    const contaJson = conta.toJSON();
    return contaJson;

  } catch (error) {
    console.error(`Erro ao obter conta a receber ID ${contaReceberId}:`, error.message);
    throw new Error('Falha ao buscar detalhes da conta a receber.');
  }
}

module.exports = obterContaReceberService;
