const cancelarContaPagarService = require('../../services/ContaPagar/cancelarContaPagarService');

async function cancelarContaPagarController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID da conta a pagar inválido.' });
        }
        const resultado = await cancelarContaPagarService(parseInt(id, 10));
        res.status(resultado.status).json({ mensagem: resultado.message, conta: resultado.conta });
    } catch (error) {
        console.error("Erro no controller ao cancelar conta a pagar:", error.message);
        res.status(500).json({ erro: 'Erro interno ao cancelar conta a pagar.' });
    }
}

module.exports = cancelarContaPagarController;
