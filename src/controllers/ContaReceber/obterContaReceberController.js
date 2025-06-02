const obterContaReceberService = require('../../services/ContaReceber/obterContaReceberService'); // Ajuste o caminho

async function obterContaReceberController(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID da conta a receber inválido.' });
    }

    const conta = await obterContaReceberService(parseInt(id, 10));

    if (!conta) {
      return res.status(404).json({ mensagem: `Conta a receber com ID ${id} não encontrada.` });
    }

    res.status(200).json(conta);
  } catch (error) {
    console.error('Erro no controller ao obter conta a receber:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar detalhes da conta a receber.' });
  }
}

module.exports = obterContaReceberController;