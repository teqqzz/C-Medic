const deletarMaterialServices = require('../../services/Materiais/deletarMaterialServices');

const deletarMaterialController = async (req, res) => {
  try {
    const { id } = req.params;
    const materialDeletado = await deletarMaterialServices(id);

    if (!materialDeletado) {
      return res.status(404).json({ mensagem: 'Material não encontrado' });
    }

    res.status(200).json({ mensagem: 'Material deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar material', erro: error.message });
  }
};

module.exports = deletarMaterialController;
