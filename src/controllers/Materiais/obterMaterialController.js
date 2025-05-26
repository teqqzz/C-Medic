const obterMaterialService = require('../../services/Materiais/obterMaterialService');

async function obterMaterialController(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID do material inválido.' });
    }
    const material = await obterMaterialService(parseInt(id, 10));
    if (!material) {
      return res.status(404).json({ mensagem: `Material com ID ${id} não encontrado.` });
    }
    res.status(200).json(material);
  } catch (error) {
    console.error('Erro no controller ao obter material:', error.message);
    res.status(500).json({ mensagem: 'Erro interno ao buscar detalhes do material', erro: error.message });
  }
}

module.exports = obterMaterialController;
