const { Material, Fornecedor, Funcionario } = require('../../models');

async function obterMaterialService(id) {
  try {
    const material = await Material.findByPk(id, {
      include: [
        {
          model: Fornecedor,
          as: 'fornecedorPrincipal',
          attributes: ['id', 'nomeFantasia', 'cnpj', 'cpf', 'telefonePrincipal', 'email']
        },
        {
          model: Funcionario,
          as: 'funcionarioQueCriou',
          attributes: ['id', 'nomeCompleto']
        }
      ]
    });
    return material; // Retorna null se não encontrado
  } catch (error) {
    console.error(`Erro ao obter material ID ${id} no serviço:`, error.message);
    throw new Error('Falha ao buscar detalhes do material.');
  }
}

module.exports = obterMaterialService;
