const { Paciente, Funcionario } = require('../../models');
const { Op } = require('sequelize');


async function criarPacienteServices(pacienteData, funcionarioIdCriador) {
  try {
    if (pacienteData.cpf) {
        const pacienteExistenteCpf = await Paciente.findOne({ where: { cpf: pacienteData.cpf } });
        if (pacienteExistenteCpf) {
            throw new Error(`CPF ${pacienteData.cpf} já cadastrado para outro paciente.`);
        }
    }
    if (pacienteData.email) {
        const pacienteExistenteEmail = await Paciente.findOne({ where: { email: pacienteData.email } });
        if (pacienteExistenteEmail) {
            throw new Error(`Email ${pacienteData.email} já cadastrado para outro paciente.`);
        }
    }


    let nomeCriador = "Sistema";
    let idFuncionarioParaSalvar = null;

    if (funcionarioIdCriador) {
      const funcionario = await Funcionario.findByPk(funcionarioIdCriador);
      if (funcionario) {
        nomeCriador = funcionario.nomeCompleto;
        idFuncionarioParaSalvar = funcionarioIdCriador;
      } else {
        console.warn(`Funcionário criador com ID ${funcionarioIdCriador} não encontrado. Atribuindo 'Sistema' como criador.`);
      }
    }

    const dadosParaCriar = {
      ...pacienteData,
      criadoPor: nomeCriador,
      funcionarioCriadorId: idFuncionarioParaSalvar,
    };

    const novoPaciente = await Paciente.create(dadosParaCriar);
    return novoPaciente;
  } catch (error) {
    console.error("Erro ao criar paciente no serviço:", error.message);
    if (error.message.includes('já cadastrado')) {
        throw error; 
    }
    if (error.name === 'SequelizeValidationError') {
        throw new Error(`Erro de validação ao criar paciente: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
}

module.exports = criarPacienteServices;
