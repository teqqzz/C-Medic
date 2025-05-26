const atualizarVencimentoContaReceberService = require('../../services/ContaReceber/atualizarVencimentoContaReceberService'); // Ajuste o caminho

async function atualizarVencimentoContaReceberController(req, res) {
  try {
    const { id } = req.params; 
    const { novaDataVencimento } = req.body;

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID da conta a receber inválido.' });
    }
    if (!novaDataVencimento) {
      return res.status(400).json({ erro: "O campo 'novaDataVencimento' é obrigatório." });
    }

    const contaAtualizada = await atualizarVencimentoContaReceberService({
      contaReceberId: parseInt(id, 10),
      novaDataVencimento,
    });

    res.status(200).json({
      mensagem: 'Data de vencimento da conta atualizada com sucesso.',
      contaReceber: contaAtualizada,
    });
  } catch (error) {
    console.error('Erro no controller ao atualizar vencimento:', error.message);
     if (error.message.includes('não encontrada') || error.message.includes('inválida') || error.message.includes('está Pago') || error.message.includes('está Cancelado') || error.message.includes('não fornecida')) {
      return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao atualizar vencimento da conta.' });
  }
}

module.exports = atualizarVencimentoContaReceberController;
