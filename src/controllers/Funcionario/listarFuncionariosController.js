const listarFuncionariosServices = require('../../services/Funcionarios/listarFuncionariosServices');

const listarFuncionariosController = async (req, res) => {
    try {
        const funcionarios = await listarFuncionariosServices(req.query);
        if (funcionarios.length === 0 && Object.keys(req.query).length > 0) {
            return res.status(200).json({ mensagem: 'Nenhum funcionário encontrado com os filtros aplicados.', data: [] });
        }
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        res.status(500).json({ erro: 'Erro interno ao listar funcionários.' });
    }
};

module.exports = listarFuncionariosController;