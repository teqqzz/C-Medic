const listarMateriaisServices = require('../../services/Materiais/listarMateriaisServices');

const listarMateriaisController = async (req, res) => {
  try {
    const materiais = await listarMateriaisServices();
    res.status(200).json(materiais);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar materiais', erro: error.message });
  }
};

module.exports = listarMateriaisController;
