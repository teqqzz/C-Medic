const atualizarFornecedorServices = require('../../services/Fornecedores/atualizarFornecedorServices');

const atualizarFornecedorController = async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedorAtualizado = await atualizarFornecedorServices(id, req.body);
        if (!fornecedorAtualizado) {
            return res.status(404).json({ erro: 'Fornecedor não encontrado para atualização.' });
        }
        res.status(200).json(fornecedorAtualizado);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError' || error.message.includes('CNPJ/CPF') || error.message.includes('Nome Fantasia')) {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro ao atualizar fornecedor:", error);
        res.status(500).json({ erro: 'Erro interno ao atualizar fornecedor.' });
    }
};

module.exports = atualizarFornecedorController;