const listarCategoriasDespesaServices = require('../../services/CategoriaDespesa/listarCategoriasDespesaServices');

async function listarCategoriasDespesaController(req, res) {
    try {
        const { nome } = req.query;
        const categorias = await listarCategoriasDespesaServices({ nome });
        if (categorias.length === 0) {
            return res.status(200).json({ mensagem: "Nenhuma categoria de despesa encontrada.", data: [] });
        }
        res.status(200).json(categorias);
    } catch (error) {
        console.error("Erro no controller ao listar categorias de despesa:", error.message);
        res.status(500).json({ erro: 'Erro interno ao buscar categorias de despesa.' });
    }
}

module.exports = listarCategoriasDespesaController;
