const { Fornecedor, Funcionario } = require('../../models'); 
const { Op } = require('sequelize');

async function criarFornecedorServices(dadosFornecedor, funcionarioIdCriador) {
  try {
    // Validação de CNPJ/CPF únicos
    if (dadosFornecedor.cnpj) {
      const existenteCnpj = await Fornecedor.findOne({ where: { cnpj: dadosFornecedor.cnpj } });
      if (existenteCnpj) {
        throw new Error(`CNPJ ${dadosFornecedor.cnpj} já cadastrado.`);
      }
    }
    if (dadosFornecedor.cpf) {
      const existenteCpf = await Fornecedor.findOne({ where: { cpf: dadosFornecedor.cpf } });
      if (existenteCpf) {
        throw new Error(`CPF ${dadosFornecedor.cpf} já cadastrado.`);
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
        console.warn(`Funcionário criador com ID ${funcionarioIdCriador} não encontrado. Atribuindo 'Sistema' como criador do fornecedor.`);
      }
    }

    const dadosParaCriar = {
      ...dadosFornecedor,
      criadoPor: nomeCriador,
      funcionarioCriadorId: idFuncionarioParaSalvar,
    };

    const novoFornecedor = await Fornecedor.create(dadosParaCriar);
    return novoFornecedor;
  } catch (error) {
    console.error("Erro ao criar fornecedor no serviço:", error.message);
    if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error(`Erro de unicidade: ${error.errors.map(e => `${e.path} '${e.value}' já existe`).join(', ')}`);
    }
    throw error;
  }
}

module.exports = criarFornecedorServices;
