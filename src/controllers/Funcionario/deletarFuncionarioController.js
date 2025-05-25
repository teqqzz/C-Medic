const deletarFuncionarioServices = require('../../services/Funcionarios/deletarFuncionarioServices');

const deletarFuncionarioController = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await deletarFuncionarioServices(id); // Pode retornar true/false ou o objeto
        if (!resultado) { // Se o serviço retornar null ou false para "não encontrado"
            return res.status(404).json({ erro: 'Funcionário não encontrado para deleção.' });
        }
        res.status(200).json({ mensagem: 'Funcionário deletado com sucesso.' }); // Ou 204 No Content se não retornar corpo
    } catch (error) {
        console.error('Erro ao deletar funcionário:', error);
        res.status(500).json({ erro: 'Erro interno ao deletar funcionário.' });
    }
};

module.exports = deletarFuncionarioController;