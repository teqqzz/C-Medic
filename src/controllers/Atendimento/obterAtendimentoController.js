const obterAtendimentoService = require('../../services/Atendimento/obterAtendimentoService'); 

async function obterAtendimentoController(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID do atendimento inválido.' });
    }

    const atendimento = await obterAtendimentoService(parseInt(id, 10));

    if (!atendimento) {
      return res.status(404).json({ mensagem: `Atendimento com ID ${id} não encontrado.` });
    }

    res.status(200).json(atendimento);
  } catch (error) {
    console.error('Erro no controller ao obter atendimento:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar detalhes do atendimento.' });
  }
}

module.exports = obterAtendimentoController;
