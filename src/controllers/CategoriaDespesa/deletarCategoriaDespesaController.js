const deletarCategoriaDespesaServices = require('../../services/CategoriaDespesa/deletarCategoriaDespesaServices');

async function deletarCategoriaDespesaController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID da categoria de despesa inválido.' });
        }
        const resultado = await deletarCategoriaDespesaServices(parseInt(id, 10));
        res.status(resultado.status).json({ mensagem: resultado.message });
    } catch (error) {
        console.error("Erro no controller ao deletar categoria de despesa:", error.message);
        res.status(500).json({ erro: 'Erro interno ao deletar categoria de despesa.' });
    }
}

module.exports = deletarCategoriaDespesaController;
