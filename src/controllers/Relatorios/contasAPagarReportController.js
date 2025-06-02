const gerarRelatorioContasAPagarService = require('../../services/Relatorios/contasAPagarReportService');

async function contasAPagarReportController(req, res) {
  try {
    const { dataReferencia, fornecedorId, categoriaDespesaId, status } = req.query;

    if (!dataReferencia) {
      return res.status(400).json({ erro: 'O parâmetro dataReferencia é obrigatório (formato AAAA-MM-DD).' });
    }

    const relatorio = await gerarRelatorioContasAPagarService({
      dataReferenciaStr: dataReferencia,
      fornecedorId: fornecedorId ? parseInt(fornecedorId) : null,
      categoriaDespesaId: categoriaDespesaId ? parseInt(categoriaDespesaId) : null,
      status
    });
    res.status(200).json(relatorio);
  } catch (error) {
    console.error("Erro no controller de relatório de contas a pagar:", error.message);
    if (error.message.includes('obrigatória')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao gerar o relatório de contas a pagar.' });
  }
}

module.exports = contasAPagarReportController;
