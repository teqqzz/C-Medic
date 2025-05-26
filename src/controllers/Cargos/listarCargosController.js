const listarCargosServices = require('../../services/Cargos/listarCargosServices');

const listarCargosController = async (req, res) => {
    try {
        const cargos = await listarCargosServices(req.query); // Passa query para filtros
        res.status(200).json(cargos);
    } catch (error) {
        console.error("Erro ao listar cargos:", error);
        res.status(500).json({ erro: 'Erro interno ao listar cargos.' });
    }
};

module.exports = listarCargosController;