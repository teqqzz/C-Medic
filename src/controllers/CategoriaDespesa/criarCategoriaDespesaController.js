const criarCategoriaDespesaServices = require('../../services/CategoriaDespesa/criarCategoriaDespesaServices');

async function criarCategoriaDespesaController(req, res) {
  try {
    const { nome, descricao } = req.body;
    if (!nome) {
      return res.status(400).json({ erro: 'O campo nome é obrigatório para a categoria de despesa.' });
    }

    const funcionarioIdLogado = req.usuarioLogado ? req.usuarioLogado.id : null;

    const novaCategoria = await criarCategoriaDespesaServices({ nome, descricao }, funcionarioIdLogado);
    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error("Erro no controller ao criar categoria de despesa:", error.message);
    if (error.message.includes('já existe')) {
        return res.status(409).json({ erro: error.message }); // 409 Conflict
    }
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: error.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ erro: 'Erro interno ao criar categoria de despesa.' });
  }
}

module.exports = criarCategoriaDespesaController;
