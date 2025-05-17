const deletarPacienteServices = require('../../services/Pacientes/deletarPacienteServices');

const deletarPacienteController = async (req, res) => {
  try {
    const { id } = req.params;

    const pacienteDeletado = await deletarPacienteServices(id);

    if (!pacienteDeletado) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    }

    res.status(200).json({ mensagem: 'Paciente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar paciente', erro: error.message });
  }
};

module.exports = deletarPacienteController;