const listarContasPagarServices = require('../../services/ContasPagar/listarContasPagarServices');

const listarContasPagarController = async (req, res) => {
    try {
        const contas = await listarContasPagarServices(req.query); // Passa query para filtros
        res.status(200).json(contas);
    } catch (error) {
        console.error("Erro ao listar contas a pagar:", error);
        res.status(500).json({ erro: 'Erro interno ao listar contas a pagar.' });
    }
};

module.exports = listarContasPagarController;
