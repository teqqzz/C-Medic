const atualizarFornecedorServices = require('../../services/Fornecedor/atualizarFornecedorServices');

async function atualizarFornecedorController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID do fornecedor inválido.' });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ erro: 'Nenhum dado fornecido para atualização.' });
        }

        const fornecedorAtualizado = await atualizarFornecedorServices(parseInt(id, 10), req.body);

        if (!fornecedorAtualizado) {
            return res.status(404).json({ mensagem: `Fornecedor com ID ${id} não encontrado.` });
        }
        res.status(200).json(fornecedorAtualizado);
    } catch (error) {
        console.error("Erro no controller ao atualizar fornecedor:", error.message);
        if (error.message.includes('já pertence') || error.message.includes('já existe')) {
            return res.status(409).json({ erro: error.message }); // 409 Conflict
        }
        // Trata erros de validação do Sequelize (ex: unique constraint) ou do serviço
        if (error.name === 'SequelizeValidationError' || error.message.startsWith('Erro de unicidade:') || error.message.startsWith('CNPJ') || error.message.startsWith('CPF')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao atualizar fornecedor.' });
    }
}

module.exports = atualizarFornecedorController;
