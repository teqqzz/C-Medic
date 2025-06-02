const { Funcionario } = require('../../models');

async function obterFuncionarioService(id) {
  try {
    const funcionario = await Funcionario.findByPk(id);
    return funcionario; // Retorna null se não encontrado, o controller trata
  } catch (error) {
    console.error(`Erro ao obter funcionário ID ${id} no serviço:`, error.message);
    throw new Error('Falha ao buscar detalhes do funcionário.');
  }
}

module.exports = obterFuncionarioService;
