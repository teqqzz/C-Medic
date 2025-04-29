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

module.exports = { listarPacientes, criarPaciente };