const atualizarCategoriaDespesaServices = require('../../services/CategoriaDespesa/atualizarCategoriaDespesaServices');

async function atualizarCategoriaDespesaController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID da categoria de despesa inválido.' });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ erro: 'Nenhum dado fornecido para atualização.' });
        }
        if (req.body.nome !== undefined && !req.body.nome.trim()) {
             return res.status(400).json({ erro: 'O nome da categoria não pode ser vazio.' });
        }


        const categoriaAtualizada = await atualizarCategoriaDespesaServices(parseInt(id, 10), req.body);

        if (!categoriaAtualizada) {
            return res.status(404).json({ mensagem: `Categoria de despesa com ID ${id} não encontrada.` });
        }
        res.status(200).json(categoriaAtualizada);
    } catch (error) {
        console.error("Erro no controller ao atualizar categoria de despesa:", error.message);
        if (error.message.includes('já existe')) {
            return res.status(409).json({ erro: error.message });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ erro: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ erro: 'Erro interno ao atualizar categoria de despesa.' });
    }
}

module.exports = atualizarCategoriaDespesaController;
