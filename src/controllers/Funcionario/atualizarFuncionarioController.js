const atualizarFuncionarioServices = require('../../services/Funcionarios/atualizarFuncionarioServices');

const atualizarFuncionarioController = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionarioAtualizado = await atualizarFuncionarioServices(id, req.body);
        if (!funcionarioAtualizado) {
            return res.status(404).json({ erro: 'Funcionário não encontrado para atualização.' });
        }
        res.status(200).json(funcionarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar funcionário.' });
    }
};

module.exports = atualizarFuncionarioController;