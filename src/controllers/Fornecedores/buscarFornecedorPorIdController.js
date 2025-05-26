const buscarFornecedorPorIdServices = require('../../services/Fornecedores/buscarFornecedorPorIdServices');

const buscarFornecedorPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = await buscarFornecedorPorIdServices(id);
        if (!fornecedor) {
            return res.status(404).json({ erro: 'Fornecedor não encontrado.' });
        }
        res.status(200).json(fornecedor);
    } catch (error) {
        console.error("Erro ao buscar fornecedor por ID:", error);
        res.status(500).json({ erro: 'Erro interno ao buscar fornecedor.' });
    }
};

module.exports = buscarFornecedorPorIdController;
