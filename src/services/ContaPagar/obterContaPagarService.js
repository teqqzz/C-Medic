const { ContaPagar, Fornecedor, CategoriaDespesa, Funcionario } = require('../../models');

async function obterContaPagarService(id) {
  try {
    const conta = await ContaPagar.findByPk(id, {
      include: [
        { model: Fornecedor, as: 'fornecedor', attributes: ['id', 'nomeFantasia', 'cnpj', 'cpf'] },
        { model: CategoriaDespesa, as: 'categoriaDespesa', attributes: ['id', 'nome'] },
        { model: Funcionario, as: 'funcionarioCriadorContaPagar', attributes: ['id', 'nomeCompleto']}
      ]
    });
    return conta;
  } catch (error) {
    console.error(`Erro ao obter conta a pagar ID ${id} no serviço:`, error.message);
    throw new Error('Falha ao buscar detalhes da conta a pagar.');
  }
}

module.exports = obterContaPagarService;
