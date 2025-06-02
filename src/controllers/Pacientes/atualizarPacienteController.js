const atualizarPacienteServices = require('../../services/Pacientes/atualizarPacienteServices');

const atualizarPacienteController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, datanascimento, email, cpf, endereco, criadoPor } = req.body;

    const pacienteAtualizado = await atualizarPacienteServices(id, {
      nome,
      datanascimento,
      email,
      cpf,
      endereco,
      criadoPor,
    });

    if (!pacienteAtualizado) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    }

    res.status(200).json(pacienteAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar paciente', erro: error.message });
  }
};

module.exports = atualizarPacienteController;