const atualizarContaReceberServices = require('../../services/ContasReceber/atualizarContaReceberServices');

const atualizarContaReceberController = async (req, res) => {
    try {
        const { id } = req.params;
        const contaAtualizada = await atualizarContaReceberServices(id, req.body);

        if (!contaAtualizada) {
            return res.status(404).json({ erro: 'Conta a Receber não encontrada para atualização.' });
        }
        res.status(200).json(contaAtualizada);
    } catch (error) {
        console.error("Erro ao atualizar conta a receber:", error.message);
        if (error.message.includes('não encontrada') || error.message.includes('Nenhum dado válido') || error.message.includes('não pode ser menor') || error.message.includes('não é possível marcar')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao atualizar conta a receber.' });
    }
};

module.exports = atualizarContaReceberController;