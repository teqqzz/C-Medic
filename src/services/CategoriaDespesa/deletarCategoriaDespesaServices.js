const { CategoriaDespesa, ContaPagar } = require('../../models');

async function deletarCategoriaDespesaServices(id) {
  try {
    const categoria = await CategoriaDespesa.findByPk(id);
    if (!categoria) {
      return { status: 404, message: `Categoria de despesa com ID ${id} não encontrada.` };
    }

    // Verifica se há contas a pagar associadas
    const contasAssociadas = await ContaPagar.count({ where: { categoriaDespesaId: id } });
    if (contasAssociadas > 0) {
      return { status: 409, message: `Não é possível deletar a categoria '${categoria.nome}' (ID: ${id}) pois ela possui ${contasAssociadas} contas a pagar associadas.` };
    }

    await categoria.destroy();
    return { status: 200, message: `Categoria de despesa '${categoria.nome}' (ID: ${id}) deletada com sucesso.` };

  } catch (error) {
    console.error(`Erro ao deletar categoria de despesa ID ${id} no serviço:`, error.message);
    throw new Error('Falha ao deletar categoria de despesa.');
  }
}

module.exports = deletarCategoriaDespesaServices;
