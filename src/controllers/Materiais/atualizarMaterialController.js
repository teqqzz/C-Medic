const atualizarMaterialServices = require('../../services/Materiais/atualizarMaterialServices');

const atualizarMaterialController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID do material inválido.' });
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: 'Nenhum dado fornecido para atualização.' });
    }

    if (req.body.fornecedorId === '') {
        req.body.fornecedorId = null;
    }


    const materialAtualizado = await atualizarMaterialServices(parseInt(id, 10), req.body);

    if (!materialAtualizado) {
      return res.status(404).json({ mensagem: `Material com ID ${id} não encontrado.` });
    }
    res.status(200).json(materialAtualizado);
  } catch (error) {
    console.error('Erro no controller ao atualizar material:', error.message);
    if (error.message.startsWith('Código de material') || error.message.startsWith('Fornecedor com ID')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ mensagem: 'Erro interno ao atualizar material', erro: error.message });
  }
};

module.exports = atualizarMaterialController;
