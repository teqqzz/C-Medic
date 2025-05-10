const Paciente = require('../src/models/pacienteModel');  // Importando o modelo de paciente

// Função para listar todos os pacientes
const listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao obter pacientes', erro: err });
  }
};

// Função para criar um novo paciente
const criarPaciente = async (req, res) => {
  try {
    const { nome, datanascimento, email, cpf, endereco, criadoPor } = req.body;
    const novoPaciente = new Paciente({
      nome,
      datanascimento,
      email,
      cpf,
      endereco,
      criadoPor
    });

    const pacienteSalvo = await novoPaciente.save();
    res.status(201).json(pacienteSalvo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar paciente', erro: error.message });
  }
};

// Função para atualizar um paciente
const atualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, datanascimento, email, cpf, endereco, criadoPor } = req.body;

    // Atualiza o paciente pelo ID
    const pacienteAtualizado = await Paciente.findOneAndUpdate(
      { id },
      { nome, datanascimento, email, cpf, endereco, criadoPor },
      { new: true }
    );

    if (!pacienteAtualizado) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    }

    res.status(200).json(pacienteAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar paciente', erro: error.message });
  }
};

// Função para deletar um paciente
const deletarPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta o paciente pelo ID
    const pacienteDeletado = await Paciente.findOneAndDelete({ id });

    if (!pacienteDeletado) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    }

    res.status(200).json({ mensagem: 'Paciente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar paciente', erro: error.message });
  }
};

module.exports = { listarPacientes, criarPaciente, atualizarPaciente, deletarPaciente };