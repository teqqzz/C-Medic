const Paciente = require('../../models/pacienteModel');

const atualizarPacienteServices = async (id, dadosAtualizados) => {
  const paciente = await Paciente.findByPk(id);
  if (!paciente) return null;

  await paciente.update(dadosAtualizados);
  return paciente;
};

module.exports = atualizarPacienteServices;