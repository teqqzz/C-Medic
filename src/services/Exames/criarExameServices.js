const { Exame, Funcionario } = require('../../models'); // Adicionado Funcionario

async function criarExameServices(exameData, funcionarioIdCriador) {
  try {
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
      ...exameData,
      criadoPor: nomeCriador,
      funcionarioCriadorId: idFuncionarioParaSalvar,
    };

    const novoExame = await Exame.create(dadosParaCriar);
    return novoExame;
  } catch (error) {
    console.error("Erro ao criar exame no serviço:", error.message);
    if (error.name === 'SequelizeValidationError') {
        throw new Error(`Erro de validação ao criar exame: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error; 
  }
}

module.exports = criarExameServices;
