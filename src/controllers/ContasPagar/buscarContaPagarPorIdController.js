const buscarContaPagarPorIdServices = require('../../services/ContasPagar/buscarContaPagarPorIdServices');

const buscarContaPagarPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const conta = await buscarContaPagarPorIdServices(id);
        if (!conta) {
            return res.status(404).json({ erro: 'Conta a Pagar não encontrada.' });
        }
        res.status(200).json(conta);
    } catch (error) {
        console.error("Erro ao buscar conta a pagar por ID:", error);
        res.status(500).json({ erro: 'Erro interno ao buscar conta a pagar.' });
    }
};

module.exports = buscarContaPagarPorIdController;