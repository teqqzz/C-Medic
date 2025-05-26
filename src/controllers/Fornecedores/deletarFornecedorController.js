const deletarFornecedorServices = require('../../services/Fornecedores/deletarFornecedorServices');

const deletarFornecedorController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await deletarFornecedorServices(id);
        if (!deletado) { 
            return res.status(404).json({ erro: 'Fornecedor não encontrado para deleção.' });
        }
        res.status(200).json({ mensagem: 'Fornecedor deletado com sucesso.' });
    } catch (error) {
        if (error.message.includes('não encontrado') || error.message.includes('Não é possível deletar')) {
            return res.status(400).json({ erro: error.message }); // Erro de regra de negócio
        }
        console.error("Erro ao deletar fornecedor:", error);
        res.status(500).json({ erro: 'Erro interno ao deletar fornecedor.' });
    }
};

module.exports = deletarFornecedorController;