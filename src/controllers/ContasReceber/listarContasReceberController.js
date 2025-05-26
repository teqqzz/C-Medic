const listarContasReceberServices = require('../../services/ContasReceber/listarContasReceberServices');

const listarContasReceberController = async (req, res) => {
    try {
        const contas = await listarContasReceberServices(req.query); // Passa query para filtros
        res.status(200).json(contas);
    } catch (error) {
        console.error("Erro ao listar contas a receber:", error);
        res.status(500).json({ erro: 'Erro interno ao listar contas a receber.' });
    }
};

module.exports = listarContasReceberController;
