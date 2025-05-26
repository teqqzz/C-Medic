const atualizarContaPagarServices = require('../../services/ContasPagar/atualizarContaPagarServices');

const atualizarContaPagarController = async (req, res) => {
    try {
        const { id } = req.params;
        // req.body pode conter dados para edição geral e/ou dados de pagamento
        const contaAtualizada = await atualizarContaPagarServices(id, req.body);
        
        res.status(200).json(contaAtualizada);
    } catch (error) {
        console.error("Erro ao atualizar conta a pagar:", error.message);
        // Melhorar tratamento de erro para diferenciar não encontrado de outras validações
        if (error.message.includes('não encontrada') || 
            error.message.includes('obrigatórios') || 
            error.message.includes('positivo') ||
            error.message.includes('não pode ser menor') ||
            error.message.includes('não pode receber novos pagamentos')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao atualizar conta a pagar.' });
    }
};

module.exports = atualizarContaPagarController;