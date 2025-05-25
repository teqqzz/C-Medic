const buscarAtendimentoPorIdServices = require('../../services/Atendimentos/buscarAtendimentoPorIdServices');

const buscarAtendimentoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const atendimento = await buscarAtendimentoPorIdServices(id);
        if (!atendimento) {
            return res.status(404).json({ erro: 'Atendimento não encontrado.' });
        }
        res.status(200).json(atendimento);
    } catch (error) {
        console.error('Erro ao buscar atendimento:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar atendimento.' });
    }
};

module.exports = buscarAtendimentoPorIdController;