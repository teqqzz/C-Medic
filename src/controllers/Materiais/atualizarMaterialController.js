const atualizarMaterialServices = require('../../services/Materiais/atualizarMaterialServices');

const atualizarMaterialController = async (req, res) => {
  try {
    const { id } = req.params;
    const materialAtualizado = await atualizarMaterialServices(id, req.body);

    if (!materialAtualizado) {
      return res.status(404).json({ mensagem: 'Material não encontrado' });
    }

    res.status(200).json(materialAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar material', erro: error.message });
  }
};

module.exports = atualizarMaterialController;
