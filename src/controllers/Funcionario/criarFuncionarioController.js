const criarFuncionarioServices = require('../../services/Funcionarios/criarFuncionarioServices');

const criarFuncionarioController = async (req, res) => {
    try {
        const novoFuncionario = await criarFuncionarioServices(req.body);
        res.status(201).json(novoFuncionario);
    } catch (error) {
        console.error('Erro ao criar funcionário:', error);
        res.status(500).json({ erro: 'Erro interno ao criar funcionário', detalhes: error.message });
    }
};

module.exports = criarFuncionarioController;