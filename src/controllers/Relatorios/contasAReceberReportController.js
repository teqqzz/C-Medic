const gerarRelatorioContasAReceberService = require('../../services/Relatorios/contasAReceberReportService');

async function contasAReceberReportController(req, res) {
  try {
    const { dataReferencia, pacienteId, status } = req.query;

    if (!dataReferencia) {
      return res.status(400).json({ erro: 'O parâmetro dataReferencia é obrigatório (formato AAAA-MM-DD).' });
    }

    const relatorio = await gerarRelatorioContasAReceberService({
      dataReferenciaStr: dataReferencia,
      pacienteId: pacienteId ? parseInt(pacienteId) : null,
      status
    });
    res.status(200).json(relatorio);
  } catch (error) {
    console.error("Erro no controller de relatório de contas a receber:", error.message);
    if (error.message.includes('obrigatória')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao gerar o relatório de contas a receber.' });
  }
}

module.exports = contasAReceberReportController;
