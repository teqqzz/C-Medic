const gerarDespesasCategoriaService = require('../../services/Relatorios/despesasCategoriaReportService');

async function despesasCategoriaReportController(req, res) {
  try {
    const { dataInicio, dataFim, categoriaId, fornecedorId } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ erro: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });
    }

    const relatorio = await gerarDespesasCategoriaService({
        dataInicio,
        dataFim,
        categoriaId: categoriaId ? parseInt(categoriaId) : null,
        fornecedorId: fornecedorId ? parseInt(fornecedorId) : null,
    });
    res.status(200).json(relatorio);
  } catch (error) {
    console.error("Erro no controller de despesas por categoria:", error.message);
    if (error.message.includes('obrigatórias')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao gerar o relatório de despesas por categoria.' });
  }
}

module.exports = despesasCategoriaReportController;
