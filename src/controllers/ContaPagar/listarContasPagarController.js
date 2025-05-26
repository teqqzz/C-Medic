const listarContasPagarServices = require('../../services/ContaPagar/listarContasPagarServices');

async function listarContasPagarController(req, res) {
    try {
        const filtros = req.query; // Passa todos os query params para o serviço
        const contas = await listarContasPagarServices(filtros);
        if (contas.length === 0) {
            return res.status(200).json({ mensagem: "Nenhuma conta a pagar encontrada com os filtros aplicados.", data: [] });
        }
        res.status(200).json(contas);
    } catch (error) {
        console.error("Erro no controller ao listar contas a pagar:", error.message);
        res.status(500).json({ erro: 'Erro interno ao buscar contas a pagar.' });
    }
}

module.exports = listarContasPagarController;
