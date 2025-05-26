const listarAtendimentosServices = require('../../services/Atendimento/listarAtendimentosServices'); 

async function listarAtendimentosController(req, res) {
  try {
    const { pacienteId, dataInicio, dataFim, statusPagamento } = req.query;

    const atendimentos = await listarAtendimentosServices({
      pacienteId,
      dataInicio,
      dataFim,
      statusPagamento,
    });

    if (atendimentos.length === 0) {
      return res.status(200).json({ mensagem: 'Nenhum atendimento encontrado com os filtros aplicados.', data: [] });
    }

    res.status(200).json(atendimentos);
  } catch (error) {
    console.error('Erro no controller ao listar atendimentos:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar atendimentos.' });
  }
}

module.exports = listarAtendimentosController;
