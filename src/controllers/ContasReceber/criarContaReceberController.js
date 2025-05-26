const criarContaReceberServices = require('../../services/ContasReceber/criarContaReceberServices');

const criarContaReceberController = async (req, res) => {
    try {
        const novaConta = await criarContaReceberServices(req.body);
        res.status(201).json(novaConta);
    } catch (error) {
        if (error.message.includes('obrigatórios')) {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro ao criar conta a receber:", error);
        res.status(500).json({ erro: "Erro interno ao criar conta a receber." });
    }
};
module.exports = criarContaReceberController;