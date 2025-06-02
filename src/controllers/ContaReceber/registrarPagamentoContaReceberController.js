const registrarPagamentoContaReceberService = require('../../services/ContaReceber/registrarPagamentoContaReceberService'); // Ajuste o caminho

async function registrarPagamentoContaReceberController(req, res) {
  try {
    const { id } = req.params; 
    const { dataPagamento, valorPago } = req.body;

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID da conta a receber inválido.' });
    }
    if (valorPago === undefined) {
        return res.status(400).json({ erro: "O campo 'valorPago' é obrigatório." });
    }
    // dataPagamento é opcional no service (default para hoje)

    const contaAtualizada = await registrarPagamentoContaReceberService({
      contaReceberId: parseInt(id, 10),
      dataPagamento,
      valorPago,
    });

    res.status(200).json({
      mensagem: 'Pagamento da conta registrado com sucesso.',
      contaReceber: contaAtualizada,
    });
  } catch (error) {
    console.error('Erro no controller ao registrar pagamento:', error.message);
    if (error.message.includes('não encontrada') || error.message.includes('inválida') || error.message.includes('já está')) {
      return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao registrar pagamento da conta.' });
  }
}

module.exports = registrarPagamentoContaReceberController;
