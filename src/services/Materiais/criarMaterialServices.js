const { Material, Funcionario, Fornecedor } = require('../../models'); // Adicionado Fornecedor

async function criarMaterialServices(materialData, funcionarioIdCriador) {
  try {
    // Validação de código único
    if (materialData.codigo) {
        const materialExistente = await Material.findOne({ where: { codigo: materialData.codigo } });
        if (materialExistente) {
            throw new Error(`Código de material '${materialData.codigo}' já existe.`);
        }
    } else {
        throw new Error("Código do material é obrigatório.");
    }
    
    if (materialData.fornecedorId) {
        const fornecedor = await Fornecedor.findByPk(materialData.fornecedorId);
        if (!fornecedor) {
            throw new Error(`Fornecedor com ID ${materialData.fornecedorId} não encontrado.`);
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
        console.warn(`Funcionário criador com ID ${funcionarioIdCriador} não encontrado. Atribuindo 'Sistema' como criador do material.`);
      }
    }

    const dadosParaCriar = {
      ...materialData,
      criadoPor: nomeCriador,
      funcionarioCriadorId: idFuncionarioParaSalvar,

    };

    const novoMaterial = await Material.create(dadosParaCriar);
    return novoMaterial;
  } catch (error) {
    console.error("Erro ao criar material no serviço:", error.message);
    if (error.name === 'SequelizeValidationError' || error.message.startsWith('Código de material') || error.message.startsWith('Fornecedor com ID')) {
        throw error; 
    }
    throw new Error('Falha interna ao criar material.'); 
  }
}

module.exports = criarMaterialServices;
