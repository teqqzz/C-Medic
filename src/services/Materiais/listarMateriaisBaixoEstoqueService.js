const { Material, Fornecedor } = require('../../models'); // Ajuste o caminho conforme necessário
const { Op, Sequelize } = require('sequelize');


async function listarMateriaisBaixoEstoqueService() {
  try {
    const materiais = await Material.findAll({
      where: {
        pontoPedido: {
          [Op.gt]: 0, 
        },
        quantidade: {
          [Op.lte]: Sequelize.col('pontoPedido'),
        },
      },
      include: [
        {
          model: Fornecedor,
          as: 'fornecedorPrincipal',
          attributes: ['id', 'nomeFantasia', 'telefonePrincipal', 'email'],
          required: false, 
        },
      ],
      attributes: [
        'id',
        'descricao',
        'codigo',
        'quantidade',
        'pontoPedido',
        'unidadeMedida',
        [Sequelize.literal('pontoPedido - quantidade'), 'necessidadeReposicao'],
      ],
      order: [
        [Sequelize.literal('pontoPedido - quantidade'), 'DESC'],
        ['descricao', 'ASC'],
      ],
    });

    return materiais.map(material => {
        const matJson = material.toJSON();
        matJson.necessidadeReposicao = Math.max(0, matJson.necessidadeReposicao);
        return matJson;
    });

  } catch (error) {
    console.error("Erro ao listar materiais com baixo estoque:", error.message);
    throw new Error('Falha ao buscar materiais com baixo estoque.');
  }
}

module.exports = listarMateriaisBaixoEstoqueService;
