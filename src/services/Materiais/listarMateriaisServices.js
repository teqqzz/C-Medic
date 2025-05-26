const { Material, Fornecedor, Funcionario } = require('../../models'); // Adicionado Fornecedor e Funcionario
const { Op } = require('sequelize');

async function listarMateriaisServices({ descricao, tipo, codigo, fornecedorId, incluirFornecedor }) {
  try {
    const whereClause = {};
    if (descricao) {
      whereClause.descricao = { [Op.like]: `%${descricao}%` };
    }
    if (tipo) {
      whereClause.tipo = tipo;
    }
    if (codigo) {
      whereClause.codigo = codigo;
    }
    if (fornecedorId) {
      whereClause.fornecedorId = fornecedorId;
    }

    const includeOptions = [
        {
            model: Funcionario,
            as: 'funcionarioQueCriou', 
            attributes: ['id', 'nomeCompleto']
        }
    ];

    if (incluirFornecedor === 'true' || incluirFornecedor === true) {
      includeOptions.push({
        model: Fornecedor,
        as: 'fornecedorPrincipal', 
        attributes: ['id', 'nomeFantasia', 'cnpj', 'cpf']
      });
    }

    const materiais = await Material.findAll({
      where: whereClause,
      include: includeOptions,
      order: [['descricao', 'ASC']],
    });
    return materiais;
  } catch (error) {
    console.error("Erro ao listar materiais no serviço:", error.message);
    throw new Error('Falha ao buscar lista de materiais.');
  }
}

module.exports = listarMateriaisServices;
