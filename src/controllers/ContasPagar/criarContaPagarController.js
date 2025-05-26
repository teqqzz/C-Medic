const criarContaPagarServices = require('../../services/ContasPagar/criarContaPagarServices');

const criarContaPagarController = async (req, res) => {
    try {
        // Adicionar validação de req.body com Joi ou express-validator aqui
        const novaConta = await criarContaPagarServices(req.body);
        res.status(201).json(novaConta);
    } catch (error) {
        if (error.message.includes('obrigatórios') || error.message.includes('não encontrado') || error.message.includes('positivo')) {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro ao criar conta a pagar:", error);
        res.status(500).json({ erro: 'Erro interno ao criar conta a pagar.' });
    }
};

module.exports = criarContaPagarController;
