const { ContaPagar, CategoriaDespesa, Fornecedor } = require('../../models');
const { Op, Sequelize } = require('sequelize');
const { startOfDay, endOfDay, parseISO } = require('date-fns');

async function gerarDespesasCategoriaService({ dataInicio, dataFim, categoriaId, fornecedorId }) {
  try {
    if (!dataInicio || !dataFim) {
      throw new Error('Datas de início e fim são obrigatórias.');
    }

    const inicioPeriodo = startOfDay(parseISO(dataInicio));
    const fimPeriodo = endOfDay(parseISO(dataFim));

    const whereContaPagar = {
      dataEmissao: { // Ou dataPagamento se quiser despesas pagas, ou dataVencimento
        [Op.between]: [inicioPeriodo, fimPeriodo],
      },
      status: { [Op.ne]: 'Cancelada' } // Exclui contas canceladas
    };

    if (categoriaId) {
      whereContaPagar.categoriaDespesaId = categoriaId;
    }
    if (fornecedorId) {
      whereContaPagar.fornecedorId = fornecedorId;
    }
    
    const includeOptions = [{
        model: CategoriaDespesa,
        as: 'categoriaDespesa',
        attributes: ['id', 'nome'],
        required: true // Garante que apenas contas com categoria sejam retornadas
    }];

    if (fornecedorId) { // Se filtrar por fornecedor, pode ser útil incluí-lo
        includeOptions.push({
            model: Fornecedor,
            as: 'fornecedor',
            attributes: ['id', 'nomeFantasia']
        });
    }


    const despesas = await ContaPagar.findAll({
      where: whereContaPagar,
      include: includeOptions,
      attributes: [
        // Agrupamento é feito pelo 'CategoriaDespesa.id'
        [Sequelize.col('categoriaDespesa.id'), 'categoriaId'],
        [Sequelize.fn('SUM', Sequelize.col('ContaPagar.valorTotal')), 'totalDespesaCategoria'],
        [Sequelize.fn('COUNT', Sequelize.col('ContaPagar.id')), 'quantidadeContas']
      ],
      group: [
          'categoriaDespesa.id', // Agrupa pela chave primária da categoria
          'categoriaDespesa.nome',
          // Se o fornecedor for incluído no group by (se não for um filtro fixo)
          // ...(fornecedorId ? [] : ['fornecedor.id', 'fornecedor.nomeFantasia'])
      ],
      order: [[Sequelize.fn('SUM', Sequelize.col('ContaPagar.valorTotal')), 'DESC']],
      raw: true,
      nest: true // Para aninhar CategoriaDespesa
    });

    // Ajuste para o nome da categoria quando raw:true e nest:true podem não aninhar perfeitamente com group
    const resultadoFormatado = despesas.map(item => ({
        categoriaId: item.categoriaId,
        categoriaNome: item.categoriaDespesa.nome, // Acesso aninhado devido ao 'as' e include
        totalDespesa: parseFloat(item.totalDespesaCategoria || 0),
        quantidadeContas: parseInt(item.quantidadeContas)
    }));

    const totalGeralDespesasFiltradas = resultadoFormatado.reduce((sum, item) => sum + item.totalDespesa, 0);

    return {
      periodo: { dataInicio, dataFim },
      filtros: { categoriaId, fornecedorId },
      totalGeralDespesasFiltradas,
      despesasPorCategoria: resultadoFormatado,
    };

  } catch (error) {
    console.error("Erro ao gerar relatório de despesas por categoria:", error.message);
    throw error;
  }
}

module.exports = gerarDespesasCategoriaService;
