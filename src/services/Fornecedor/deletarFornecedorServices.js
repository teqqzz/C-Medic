const { Fornecedor, ContaPagar } = require('../../models');

async function deletarFornecedorServices(id) {
  try {
    const fornecedor = await Fornecedor.findByPk(id);
    if (!fornecedor) {
      return { status: 404, message: `Fornecedor com ID ${id} não encontrado.` };
    }

    const contasAssociadas = await ContaPagar.count({ where: { fornecedorId: id } });
    if (contasAssociadas > 0) {
      await fornecedor.update({ ativo: false });
      return { status: 200, message: `Fornecedor ID ${id} possui ${contasAssociadas} contas a pagar associadas e foi marcado como inativo. Não foi deletado.` };
    }

    await fornecedor.destroy();
    return { status: 200, message: `Fornecedor com ID ${id} deletado com sucesso.` };

  } catch (error) {
    console.error(`Erro ao deletar fornecedor ID ${id} no serviço:`, error.message);
    if (error.name === 'SequelizeForeignKeyConstraintError') { 
        return { status: 409, message: `Não é possível deletar o fornecedor ID ${id} pois ele está referenciado em contas a pagar. Considere marcá-lo como 'Inativo'.`};
    }
    throw new Error('Falha ao deletar/inativar fornecedor.');
  }
}

module.exports = deletarFornecedorServices;
