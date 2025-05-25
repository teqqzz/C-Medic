const listarAtendimentosServices = require('../../services/Atendimentos/listarAtendimentosServices');

const listarAtendimentosController = async (req, res) => {
    try {
        const atendimentos = await listarAtendimentosServices(req.query);
        res.status(200).json(atendimentos);
    } catch (error) {
        console.error('Erro ao listar atendimentos:', error);
        res.status(500).json({ erro: 'Erro interno ao listar atendimentos.' });
    }
};

module.exports = listarAtendimentosController;