const Paciente = require('../../models/pacienteModel');
// Função para adicionar um novo paciente
const criarPacienteServices = (pacienteData) => {
  return Paciente.create(pacienteData);
};
module.exports = criarPacienteServices;