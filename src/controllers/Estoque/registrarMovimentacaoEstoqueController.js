const registrarMovimentacaoEstoqueServices = require('../../services/Estoque/registrarMovimentacaoEstoqueServices');

const registrarMovimentacaoEstoqueController = async (req, res) => {
    try {
        const resultado = await registrarMovimentacaoEstoqueServices(req.body);
        res.status(201).json({ mensagem: "Movimentação de estoque registrada com sucesso.", ...resultado });
    } catch (error) {
        console.error('Erro ao registrar movimentação de estoque:', error);
        if (error.message.includes('não encontrado') || error.message.includes('insuficiente') || error.message.includes('obrigatórios')) {
             return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao registrar movimentação.' });
    }
};

module.exports = registrarMovimentacaoEstoqueController;