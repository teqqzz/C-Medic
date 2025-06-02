const atualizarStatusPagamentoAtendimentoService = require('../../services/Atendimento/atualizarStatusPagamentoAtendimentoService'); 

async function atualizarStatusPagamentoAtendimentoController(req, res) {
  try {
    const { id } = req.params;
    const { statusPagamento, valorPago } = req.body; 

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID do atendimento inválido.' });
    }

    if (!statusPagamento) {
      return res.status(400).json({ erro: "O campo 'statusPagamento' é obrigatório." });
    }

    const resultado = await atualizarStatusPagamentoAtendimentoService(parseInt(id, 10), statusPagamento, valorPago);

    res.status(200).json({
      mensagem: 'Status de pagamento do atendimento e da conta atualizados com sucesso.',
      atendimento: resultado.atendimento,
    });
  } catch (error) {
    console.error('Erro no controller ao atualizar status de pagamento:', error.message);
    if (error.message.includes('não encontrado') || error.message.includes('inválido')) {
      return res.status(404).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao atualizar status de pagamento.' });
  }
}

module.exports = atualizarStatusPagamentoAtendimentoController;
