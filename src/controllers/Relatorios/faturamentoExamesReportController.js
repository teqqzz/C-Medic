const gerarFaturamentoExamesService = require('../../services/Relatorios/faturamentoExamesReportService');

async function faturamentoExamesReportController(req, res) {
  try {
    const { dataInicio, dataFim, exameId } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ erro: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });
    }

    const relatorio = await gerarFaturamentoExamesService({
        dataInicio,
        dataFim,
        exameId: exameId ? parseInt(exameId) : null
    });
    res.status(200).json(relatorio);
  } catch (error) {
    console.error("Erro no controller de faturamento por exame:", error.message);
    if (error.message.includes('obrigatórias')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao gerar o relatório de faturamento por exame.' });
  }
}

module.exports = faturamentoExamesReportController;
