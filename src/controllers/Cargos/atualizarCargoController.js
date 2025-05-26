const atualizarCargoServices = require('../../services/Cargos/atualizarCargoServices');

const atualizarCargoController = async (req, res) => {
    try {
        const { id } = req.params;
        const cargoAtualizado = await atualizarCargoServices(id, req.body);
        if (!cargoAtualizado) {
            return res.status(404).json({ erro: 'Cargo não encontrado para atualização.' });
        }
        res.status(200).json(cargoAtualizado);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ erro: 'Um cargo com este nome já existe.' });
        }
        if (error.message.includes('não pode ser vazio')) {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro ao atualizar cargo:", error);
        res.status(500).json({ erro: 'Erro interno ao atualizar cargo.' });
    }
};

module.exports = atualizarCargoController;