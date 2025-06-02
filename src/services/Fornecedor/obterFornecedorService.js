const { Fornecedor, Funcionario } = require('../../models');

async function obterFornecedorService(id) {
  try {
    const fornecedor = await Fornecedor.findByPk(id, {
        include: [{
            model: Funcionario,
            as: 'funcionarioCriadorFornecedor', // Use o alias definido no indexModel
            attributes: ['id', 'nomeCompleto']
        }]
    });
    return fornecedor;
  } catch (error) {
    console.error(`Erro ao obter fornecedor ID ${id} no serviço:`, error.message);
    throw new Error('Falha ao buscar detalhes do fornecedor.');
  }
}

module.exports = obterFornecedorService;
