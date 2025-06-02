const listarPacientesServices = require('../../services/Pacientes/listarPacientesServices');

const listarPacientesController = async (req, res) => {
  try {
    const pacientes = await listarPacientesServices();
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao obter pacientes', erro: err.message });
  }
};

module.exports = listarPacientesController;