const listarExamesServices = require('../../services/Exames/listarExamesServices');

const listarExamesController = async (req, res) => {
  try {
    const exames = await listarExamesServices();
    res.status(200).json(exames);
  } catch (err) {
    console.error('Erro ao listar exames:', err);
    res.status(500).json({ mensagem: "Erro ao obter exames", erro: err.message });
  }
};

module.exports = listarExamesController;