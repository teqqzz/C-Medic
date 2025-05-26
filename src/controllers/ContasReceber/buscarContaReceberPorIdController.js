const buscarContaReceberPorIdServices = require('../../services/ContasReceber/buscarContaReceberPorIdServices');

const buscarContaReceberPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const conta = await buscarContaReceberPorIdServices(id);
        if (!conta) {
            return res.status(404).json({ erro: 'Conta a Receber não encontrada.' });
        }
        res.status(200).json(conta);
    } catch (error) {
        console.error("Erro ao buscar conta a receber por ID:", error);
        res.status(500).json({ erro: 'Erro interno ao buscar conta a receber.' });
    }
};

module.exports = buscarContaReceberPorIdController;
