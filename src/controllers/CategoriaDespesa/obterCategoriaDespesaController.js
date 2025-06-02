const obterCategoriaDespesaService = require('../../services/CategoriaDespesa/obterCategoriaDespesaService');

async function obterCategoriaDespesaController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID da categoria de despesa inválido.' });
        }
        const categoria = await obterCategoriaDespesaService(parseInt(id, 10));
        if (!categoria) {
            return res.status(404).json({ mensagem: `Categoria de despesa com ID ${id} não encontrada.` });
        }
        res.status(200).json(categoria);
    } catch (error) {
        console.error("Erro no controller ao obter categoria de despesa:", error.message);
        res.status(500).json({ erro: 'Erro interno ao buscar detalhes da categoria de despesa.' });
    }
}

module.exports = obterCategoriaDespesaController;
