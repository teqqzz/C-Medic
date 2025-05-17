const criarPacienteServices = require('../../services/Pacientes/criarPacienteServices');

const criarPacienteController = async (req, res) => {
  try {
    const { nome, datanascimento, email, cpf, endereco, criadoPor } = req.body;

    const novoPaciente = await criarPacienteServices({
      nome,
      datanascimento,
      email,
      cpf,
      endereco,
      criadoPor
    });

    res.status(201).json(novoPaciente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar paciente', erro: error.message });
  }
};

module.exports = criarPacienteController;