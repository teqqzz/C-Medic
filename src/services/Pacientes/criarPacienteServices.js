const Paciente = require('../../models/pacienteModel');
// Função para adicionar um novo paciente
const criarPacienteServices = (pacienteData) => {
  const paciente = new Paciente(pacienteData);
  return paciente.save();
};
module.exports = criarPacienteServices;