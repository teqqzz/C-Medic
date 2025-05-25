const listarMovimentacoesEstoqueServices = require('../../services/Estoque/listarMovimentacoesEstoqueServices');

const listarMovimentacoesEstoqueController = async (req, res) => {
    try {
        const movimentacoes = await listarMovimentacoesEstoqueServices(req.query);
        res.status(200).json(movimentacoes);
    } catch (error) {
        console.error('Erro ao listar movimentações de estoque:', error);
        res.status(500).json({ erro: 'Erro interno ao listar movimentações.' });
    }
};

module.exports = listarMovimentacoesEstoqueController;