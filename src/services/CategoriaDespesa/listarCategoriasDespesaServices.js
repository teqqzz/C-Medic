const { CategoriaDespesa } = require('../../models');
const { Op } = require('sequelize');

async function listarCategoriasDespesaServices({ nome }) {
  try {
    const whereClause = {};
    if (nome) {
      whereClause.nome = { [Op.like]: `%${nome}%` };
    }

    const categorias = await CategoriaDespesa.findAll({
      where: whereClause,
      order: [['nome', 'ASC']],
      
    });
    return categorias;
  } catch (error) {
    console.error("Erro ao listar categorias de despesa no serviço:", error.message);
    throw new Error('Falha ao buscar lista de categorias de despesa.');
  }
}

module.exports = listarCategoriasDespesaServices;
