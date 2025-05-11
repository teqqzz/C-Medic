const Paciente = require('../models/pacienteModel');

// Função para listar todos os pacientes
const listarPacientes = () => {
  return Paciente.find();
};

// Função para adicionar um novo paciente
const criarPaciente = (pacienteData) => {
  const paciente = new Paciente(pacienteData);
  return paciente.save();
};

// Atualizar um exame existente
const atualizarPaciente = (pacienteid, dadosAtualizados) => {
  return Paciente.findOneAndUpdate(
    { exameid },
    dadosAtualizados,
    { new: true }
  );
};

// Deletar um exame
const deletarPaciente = (id) => {
  return Paciente.findOneAndDelete({ pacienteid });
};

module.exports = { listarPacientes, criarPaciente, atualizarPaciente, deletarPaciente };