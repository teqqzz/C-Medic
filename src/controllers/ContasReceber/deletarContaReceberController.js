const deletarContaReceberServices = require('../../services/ContasReceber/deletarContaReceberServices');

const deletarContaReceberController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await deletarContaReceberServices(id);

        if (!deletado) { // Se o serviço retornar null para "não encontrado"
            return res.status(404).json({ erro: 'Conta a Receber não encontrada para deleção.' });
        }
        res.status(200).json({ mensagem: 'Conta a Receber deletada com sucesso.' });
    } catch (error) {
        console.error("Erro ao deletar conta a receber:", error.message);
        if (error.message.includes('não encontrada') || error.message.includes('Não é possível deletar')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao deletar conta a receber.' });
    }
};

module.exports = deletarContaReceberController;
