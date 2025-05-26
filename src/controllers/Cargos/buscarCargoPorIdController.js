const buscarCargoPorIdServices = require('../../services/Cargos/buscarCargoPorIdServices');

const buscarCargoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const cargo = await buscarCargoPorIdServices(id);
        if (!cargo) {
            return res.status(404).json({ erro: 'Cargo não encontrado.' });
        }
        res.status(200).json(cargo);
    } catch (error) {
        console.error("Erro ao buscar cargo por ID:", error);
        res.status(500).json({ erro: 'Erro interno ao buscar cargo.' });
    }
};

module.exports = buscarCargoPorIdController;