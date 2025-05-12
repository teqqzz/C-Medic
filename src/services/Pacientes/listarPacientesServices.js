const Paciente = require('../../models/pacienteModel');

// Função para listar todos os pacientes
const listarPacientesServices = () => {
  return Paciente.find();
};
module.exports = listarPacientesServices;