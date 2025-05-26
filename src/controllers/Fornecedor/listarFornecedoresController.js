const listarFornecedoresServices = require('../../services/Fornecedor/listarFornecedoresServices');

async function listarFornecedoresController(req, res) {
    try {
        const { nome, cnpjCpf, ativo } = req.query;
        const fornecedores = await listarFornecedoresServices({ nome, cnpjCpf, ativo });
        if (fornecedores.length === 0) {
            return res.status(200).json({ mensagem: "Nenhum fornecedor encontrado com os filtros aplicados.", data: [] });
        }
        res.status(200).json(fornecedores);
    } catch (error) {
        console.error("Erro no controller ao listar fornecedores:", error.message);
        res.status(500).json({ erro: 'Erro interno ao buscar fornecedores.' });
    }
}

module.exports = listarFornecedoresController;
