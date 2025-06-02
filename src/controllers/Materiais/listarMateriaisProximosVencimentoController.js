const listarMateriaisProximosVencimentoService = require('../../services/Materiais/listarMateriaisProximosVencimentoService');

async function listarMateriaisProximosVencimentoController(req, res) {
  try {
    let { diasAntecedencia, incluirVencidos } = req.query;

    // Converte para os tipos corretos, com defaults
    diasAntecedencia = diasAntecedencia ? parseInt(diasAntecedencia, 10) : 60;
    incluirVencidos = incluirVencidos === 'true' || incluirVencidos === true;

    if (isNaN(diasAntecedencia) || diasAntecedencia < 0) {
        return res.status(400).json({ erro: 'Parâmetro diasAntecedencia deve ser um número não negativo.' });
    }

    const materiais = await listarMateriaisProximosVencimentoService({ diasAntecedencia, incluirVencidos });
    if (materiais.length === 0) {
      return res.status(200).json({ mensagem: "Nenhum material encontrado próximo ao vencimento com os filtros aplicados.", data: [] });
    }
    res.status(200).json(materiais);
  } catch (error) {
    console.error("Erro no controller ao listar materiais próximos ao vencimento:", error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar materiais próximos ao vencimento.' });
  }
}

module.exports = listarMateriaisProximosVencimentoController;
