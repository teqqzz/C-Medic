const deletarFornecedorServices = require('../../services/Fornecedor/deletarFornecedorServices');

async function deletarFornecedorController(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ erro: 'ID do fornecedor inválido.' });
        }
        const resultado = await deletarFornecedorServices(parseInt(id, 10));
        res.status(resultado.status).json({ mensagem: resultado.message });
    } catch (error) {
        console.error("Erro no controller ao deletar/inativar fornecedor:", error.message);
        res.status(500).json({ erro: 'Erro interno ao processar a solicitação de deleção/inativação do fornecedor.' });
    }
}

module.exports = deletarFornecedorController;
