const obterFornecedorService = require('../../services/Fornecedor/obterFornecedorService');

async function obterFornecedorController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID do fornecedor inválido.' });
        }
        const fornecedor = await obterFornecedorService(parseInt(id, 10));
        if (!fornecedor) {
            return res.status(404).json({ mensagem: `Fornecedor com ID ${id} não encontrado.` });
        }
        res.status(200).json(fornecedor);
    } catch (error) {
        console.error("Erro no controller ao obter fornecedor:", error.message);
        res.status(500).json({ erro: 'Erro interno ao buscar detalhes do fornecedor.' });
    }
}

module.exports = obterFornecedorController;
