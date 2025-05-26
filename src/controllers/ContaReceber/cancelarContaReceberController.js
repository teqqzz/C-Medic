const cancelarContaReceberService = require('../../services/ContaReceber/cancelarContaReceberService'); // Ajuste o caminho

async function cancelarContaReceberController(req, res) {
  try {
    const { id } = req.params; // ID da Conta a Receber

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID da conta a receber inválido.' });
    }

    const contaAtualizada = await cancelarContaReceberService(parseInt(id, 10));

    res.status(200).json({
      mensagem: 'Conta a receber cancelada com sucesso.',
      contaReceber: contaAtualizada,
    });
  } catch (error) {
    console.error('Erro no controller ao cancelar conta a receber:', error.message);
    if (error.message.includes('não encontrada') || error.message.includes('já está paga') || error.message.includes('já está cancelada')) {
      return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao cancelar a conta a receber.' });
  }
}

module.exports = cancelarContaReceberController;