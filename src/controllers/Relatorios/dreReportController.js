const gerarDreSimplificadoService = require('../../services/Relatorios/dreReportService');

async function dreReportController(req, res) {
  try {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ erro: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });
    }

    const relatorio = await gerarDreSimplificadoService({ dataInicio, dataFim });
    res.status(200).json(relatorio);
  } catch (error) {
    console.error("Erro no controller do DRE:", error.message);
     if (error.message.includes('obrigatórias')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao gerar o DRE Simplificado.' });
  }
}

module.exports = dreReportController;
