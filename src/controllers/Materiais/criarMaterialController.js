const criarMaterialServices = require('../../services/Materiais/criarMaterialServices');

const criarMaterialController = async (req, res) => {
  try {
    const material = await criarMaterialServices(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar material', erro: error.message });
  }
};

module.exports = criarMaterialController;
