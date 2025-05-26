const obterContaPagarService = require('../../services/ContaPagar/obterContaPagarService');

async function obterContaPagarController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID da conta a pagar inválido.' });
        }
        const conta = await obterContaPagarService(parseInt(id, 10));
        if (!conta) {
            return res.status(404).json({ mensagem: `Conta a pagar com ID ${id} não encontrada.` });
        }
        res.status(200).json(conta);
    } catch (error) {
        console.error("Erro no controller ao obter conta a pagar:", error.message);
        res.status(500).json({ erro: 'Erro interno ao buscar detalhes da conta a pagar.' });
    }
}

module.exports = obterContaPagarController;
