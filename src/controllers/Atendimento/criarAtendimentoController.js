const criarAtendimentoServices = require('../../services/Atendimento/criarAtendimentoServices');

async function criarAtendimentoController(req, res) {
  try {
    const { agendamentoId, materialId, descricaoAtendimento } = req.body;

    if (!agendamentoId) {
      return res.status(400).json({ erro: 'O campo agendamentoId é obrigatório.' });
    }
    if (materialId !== undefined && (materialId !== null && isNaN(parseInt(materialId)))) {
        return res.status(400).json({ erro: 'O campo materialId, se fornecido, deve ser um número válido ou nulo.' });
    }


    const funcionarioIdLogado = req.usuarioLogado ? req.usuarioLogado.id : null;

    const paramsAtendimento = {
      agendamentoId: parseInt(agendamentoId),
      materialId: materialId ? parseInt(materialId) : null,
      descricaoAtendimento,
    };

    const resultado = await criarAtendimentoServices(paramsAtendimento, funcionarioIdLogado);

    res.status(201).json({
        mensagem: 'Atendimento e conta a receber criados com sucesso!',
        atendimento: resultado.atendimento,
        contaReceber: resultado.contaReceber
    });
  } catch (error) {
    console.error('Erro no controller ao criar atendimento:', error.message);
    if (error.message.includes('não encontrado') || error.message.includes('não está com status \'Marcado\'') || error.message.includes('Já existe um atendimento')) {
        return res.status(400).json({ erro: error.message }); 
    }
    if (error.message.startsWith('Erro de validação')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao processar a criação do atendimento.' });
  }
}

module.exports = criarAtendimentoController;
