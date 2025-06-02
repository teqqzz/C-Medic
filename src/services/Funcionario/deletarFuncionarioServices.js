const { Funcionario } = require('../../models');

async function deletarFuncionarioServices(id) {
  try {
    const funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {
      return 0; // Indica que nenhum funcionário foi deletado (não encontrado)
    }
    
    await funcionario.destroy();
    return 1; 

  } catch (error) {
    console.error(`Erro ao deletar funcionário ID ${id} no serviço:`, error.message);
    // Verificar se o erro é por restrição de chave estrangeira
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new Error(`Não é possível deletar o funcionário ID ${id} pois ele está referenciado em outros registros (ex: exames, pacientes). Considere marcá-lo como 'Inativo'.`);
    }
    throw new Error('Falha ao deletar funcionário.');
  }
}

module.exports = deletarFuncionarioServices;
