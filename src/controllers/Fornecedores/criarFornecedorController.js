const criarFornecedorServices = require('../../services/Fornecedores/criarFornecedorServices');

const criarFornecedorController = async (req, res) => {
    try {
        const novoFornecedor = await criarFornecedorServices(req.body);
        res.status(201).json(novoFornecedor);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ erro: 'CNPJ/CPF já cadastrado para outro fornecedor.' });
        }
        if (error.message.includes('obrigatórios')) {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro ao criar fornecedor:", error);
        res.status(500).json({ erro: 'Erro interno ao criar fornecedor.' });
    }
};

module.exports = criarFornecedorController;
