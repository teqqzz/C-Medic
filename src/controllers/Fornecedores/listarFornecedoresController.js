const listarFornecedoresServices = require('../../services/Fornecedores/listarFornecedoresServices');

const listarFornecedoresController = async (req, res) => {
    try {
        const fornecedores = await listarFornecedoresServices(req.query);
        res.status(200).json(fornecedores);
    } catch (error) {
        console.error("Erro ao listar fornecedores:", error);
        res.status(500).json({ erro: 'Erro interno ao listar fornecedores.' });
    }
};

module.exports = listarFornecedoresController;
