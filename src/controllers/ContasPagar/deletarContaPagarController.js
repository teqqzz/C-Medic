const deletarContaPagarServices = require('../../services/ContasPagar/deletarContaPagarServices');

const deletarContaPagarController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await deletarContaPagarServices(id);

        if (!deletado) { 
            return res.status(404).json({ erro: 'Conta a Pagar não encontrada para deleção.' });
        }
        res.status(200).json({ mensagem: 'Conta a Pagar deletada com sucesso.' });
    } catch (error) {
        console.error("Erro ao deletar conta a pagar:", error.message);
        if (error.message.includes('não encontrada') || error.message.includes('Não é possível deletar')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao deletar conta a pagar.' });
    }
};

module.exports = deletarContaPagarController;