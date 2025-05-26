const { CategoriaDespesa, Funcionario } = require('../../models'); // Ajuste o caminho

async function criarCategoriaDespesaServices(dadosCategoria, funcionarioIdCriador) {
  try {
    // Validação de nome único
    const categoriaExistente = await CategoriaDespesa.findOne({ where: { nome: dadosCategoria.nome } });
    if (categoriaExistente) {
      throw new Error(`Categoria de despesa com nome '${dadosCategoria.nome}' já existe.`);
    }

    let nomeCriador = "Sistema";
    let idFuncionarioParaSalvar = null;

    if (funcionarioIdCriador) {
      const funcionario = await Funcionario.findByPk(funcionarioIdCriador);
      if (funcionario) {
        nomeCriador = funcionario.nomeCompleto;
        idFuncionarioParaSalvar = funcionarioIdCriador;
      } else {
        console.warn(`Funcionário criador com ID ${funcionarioIdCriador} não encontrado. Atribuindo 'Sistema' como criador da categoria.`);
      }
    }

    const dadosParaCriar = {
      ...dadosCategoria,
      criadoPor: nomeCriador,
      funcionarioCriadorId: idFuncionarioParaSalvar,
    };

    const novaCategoria = await CategoriaDespesa.create(dadosParaCriar);
    return novaCategoria;
  } catch (error) {
    console.error("Erro ao criar categoria de despesa no serviço:", error.message);
    if (error.name === 'SequelizeUniqueConstraintError' || error.message.includes('já existe')) {
        throw new Error(error.message); // Re-lança para o controller
    }
    throw new Error('Falha interna ao criar categoria de despesa.');
  }
}

module.exports = criarCategoriaDespesaServices;
