const Paciente = require('../../models/pacienteModel');

const deletarPacienteServices = (pacienteid) => {
  return Paciente.findOneAndDelete({ pacienteid });
};

module.exports = deletarPacienteServices;