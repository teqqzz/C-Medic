const { ContaPagar, Funcionario, Fornecedor, CategoriaDespesa } = require('../../models'); // Ajuste o caminho
const { parseISO, isValid } = require('date-fns');

async function criarContaPagarServices(dadosConta, funcionarioIdCriador) {
  try {
    // Validações de IDs de Fornecedor e Categoria
    if (!dadosConta.fornecedorId) {
        throw new Error("ID do Fornecedor é obrigatório.");
    }
    const fornecedor = await Fornecedor.findByPk(dadosConta.fornecedorId);
    if (!fornecedor) {
      throw new Error(`Fornecedor com ID ${dadosConta.fornecedorId} não encontrado.`);
    }

    if (!dadosConta.categoriaDespesaId) {
        throw new Error("ID da Categoria de Despesa é obrigatório.");
    }
    const categoria = await CategoriaDespesa.findByPk(dadosConta.categoriaDespesaId);
    if (!categoria) {
      throw new Error(`Categoria de despesa com ID ${dadosConta.categoriaDespesaId} não encontrada.`);
    }

    // Validação de datas
    if (!dadosConta.dataVencimento || !isValid(parseISO(dadosConta.dataVencimento))) {
        throw new Error("Data de vencimento é obrigatória e deve estar no formato AAAA-MM-DD.");
    }
    if (dadosConta.dataEmissao && !isValid(parseISO(dadosConta.dataEmissao))) {
        throw new Error("Data de emissão, se fornecida, deve estar no formato AAAA-MM-DD.");
    }
     if (dadosConta.dataPagamento && !isValid(parseISO(dadosConta.dataPagamento))) {
        throw new Error("Data de pagamento, se fornecida, deve estar no formato AAAA-MM-DD.");
    }


    let nomeCriador = "Sistema";
    let idFuncionarioParaSalvar = null;

    if (funcionarioIdCriador) {
      const funcionario = await Funcionario.findByPk(funcionarioIdCriador);
      if (funcionario) {
        nomeCriador = funcionario.nomeCompleto;
        idFuncionarioParaSalvar = funcionarioIdCriador;
      } else {
        console.warn(`Funcionário criador com ID ${funcionarioIdCriador} não encontrado. Atribuindo 'Sistema' como criador da conta a pagar.`);
      }
    }

    const dadosParaCriar = {
      ...dadosConta,
      criadoPor: nomeCriador,
      funcionarioCriadorId: idFuncionarioParaSalvar,
      dataEmissao: dadosConta.dataEmissao || new Date().toISOString().slice(0,10), // Default para hoje se não fornecido
    };

    const novaConta = await ContaPagar.create(dadosParaCriar);
    return novaConta;
  } catch (error) {
    console.error("Erro ao criar conta a pagar no serviço:", error.message);
    if (error.name === 'SequelizeValidationError' || error.message.includes('não encontrado') || error.message.includes('obrigatório') || error.message.includes('formato')) {
        throw error; // Re-lança para o controller
    }
    throw new Error('Falha interna ao criar conta a pagar.');
  }
}

module.exports = criarContaPagarServices;
