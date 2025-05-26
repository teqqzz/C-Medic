const listarContasReceberService = require('../../services/ContaReceber/listarContasReceberService');

async function listarContasReceberController(req, res) {
  try {
    const { pacienteId, dataVencimentoInicio, dataVencimentoFim, status } = req.query;

    const contas = await listarContasReceberService({
      pacienteId,
      dataVencimentoInicio,
      dataVencimentoFim,
      status,
    });

    if (contas.length === 0) {
      return res.status(200).json({ mensagem: 'Nenhuma conta a receber encontrada com os filtros aplicados.', data: [] });
    }

    res.status(200).json(contas);
  } catch (error) {
    console.error('Erro no controller ao listar contas a receber:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar contas a receber.' });
  }
}

module.exports = listarContasReceberController;
