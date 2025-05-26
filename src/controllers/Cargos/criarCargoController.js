const criarCargoServices = require('../../services/Cargos/criarCargoServices');

const criarCargoController = async (req, res) => {
    try {
        const novoCargo = await criarCargoServices(req.body);
        res.status(201).json(novoCargo);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ erro: 'Um cargo com este nome já existe.' });
        }
        if (error.message.includes('obrigatório')) {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro ao criar cargo:", error);
        res.status(500).json({ erro: 'Erro interno ao criar cargo.' });
    }
};

module.exports = criarCargoController;
