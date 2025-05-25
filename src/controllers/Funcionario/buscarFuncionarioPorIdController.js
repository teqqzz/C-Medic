const buscarFuncionarioPorIdServices = require('../../services/Funcionarios/buscarFuncionarioPorIdServices');

const buscarFuncionarioPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionario = await buscarFuncionarioPorIdServices(id);
        if (!funcionario) {
            return res.status(404).json({ erro: 'Funcionário não encontrado.' });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        console.error('Erro ao buscar funcionário por ID:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar funcionário.' });
    }
};

module.exports = buscarFuncionarioPorIdController;