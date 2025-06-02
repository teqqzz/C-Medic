const Paciente = require('../../models/pacienteModel');

const deletarPacienteServices = async (id) => {
  const paciente = await Paciente.findByPk(id);
  if (!paciente) return null;

  await paciente.destroy();
  return paciente;
};

module.exports = deletarPacienteServices;