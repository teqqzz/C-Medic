const listarMateriaisServices = require('../../services/Materiais/listarMateriaisServices');

const listarMateriaisController = async (req, res) => {
  try {
    const { descricao, tipo, codigo, fornecedorId, incluirFornecedor } = req.query;
    const materiais = await listarMateriaisServices({ descricao, tipo, codigo, fornecedorId, incluirFornecedor });
    if (materiais.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum material encontrado com os filtros aplicados.", data: []});
    }
    res.status(200).json(materiais);
  } catch (error) {
    console.error('Erro no controller ao listar materiais:', error.message);
    res.status(500).json({ mensagem: 'Erro interno ao listar materiais', erro: error.message });
  }
};

module.exports = listarMateriaisController;
