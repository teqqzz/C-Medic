const atualizarContaPagarService = require('../../services/ContaPagar/atualizarContaPagarService');

async function atualizarContaPagarController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID da conta a pagar inválido.' });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ erro: 'Nenhum dado fornecido para atualização.' });
        }

        const contaAtualizada = await atualizarContaPagarService(parseInt(id, 10), req.body);

        if (!contaAtualizada) { // O serviço retorna null se não encontrar
            return res.status(404).json({ mensagem: `Conta a pagar com ID ${id} não encontrada.` });
        }
        res.status(200).json(contaAtualizada);
    } catch (error) {
        console.error("Erro no controller ao atualizar conta a pagar:", error.message);
        if (error.message.includes('não encontrado') || error.message.includes('inválida') || error.message.includes('Não é possível alterar')) {
            return res.status(400).json({ erro: error.message });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ erro: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ erro: 'Erro interno ao atualizar conta a pagar.' });
    }
}

module.exports = atualizarContaPagarController;
