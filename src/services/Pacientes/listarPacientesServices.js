const Paciente = require('../../models/pacienteModel');

const listarPacientesServices = () => {
  return Paciente.findAll();
};

module.exports = listarPacientesServices;