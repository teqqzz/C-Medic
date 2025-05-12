const Paciente = require('../../models/pacienteModel');

const atualizarPacienteServices = (pacienteid, dadosAtualizados) => {
  return Paciente.findOneAndUpdate(
    { pacienteid },
    dadosAtualizados,
    { new: true }
  );
};

module.exports = atualizarPacienteServices;