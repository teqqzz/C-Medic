const gerarRelatorioFluxoCaixaService = require('../../services/Relatorios/fluxoCaixaService');

async function fluxoCaixaController(req, res) {
  try {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ erro: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });
    }

    const relatorio = await gerarRelatorioFluxoCaixaService({ dataInicio, dataFim });
    res.status(200).json(relatorio);
  } catch (error) {
    console.error("Erro no controller de fluxo de caixa:", error.message);
    if (error.message.includes('obrigatórias')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao gerar o relatório de fluxo de caixa.' });
  }
}

module.exports = fluxoCaixaController;