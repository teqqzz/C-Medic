const { CategoriaDespesa, Funcionario } = require('../../models');

async function obterCategoriaDespesaService(id) {
  try {
    const categoria = await CategoriaDespesa.findByPk(id, {
        include: [{
            model: Funcionario,
            as: 'funcionarioCriadorCategoria', // Alias definido no indexModel.js
            attributes: ['id', 'nomeCompleto']
        }]
    });
    return categoria;
  } catch (error) {
    console.error(`Erro ao obter categoria de despesa ID ${id} no serviço:`, error.message);
    throw new Error('Falha ao buscar detalhes da categoria de despesa.');
  }
}

module.exports = obterCategoriaDespesaService;
