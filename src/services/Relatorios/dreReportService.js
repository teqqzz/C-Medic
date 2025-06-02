const { Atendimento, Exame, ContaPagar, CategoriaDespesa } = require('../../models');
const { Op, Sequelize } = require('sequelize'); 
const { startOfDay, endOfDay, parseISO } = require('date-fns');

async function gerarDreSimplificadoService({ dataInicio, dataFim }) {
  try {
    if (!dataInicio || !dataFim) {
      throw new Error('Datas de início e fim são obrigatórias para o DRE.');
    }

    const inicioPeriodo = startOfDay(parseISO(dataInicio));
    const fimPeriodo = endOfDay(parseISO(dataFim));

    const receitas = await Atendimento.findAll({
      where: {
        dataAtendimento: {
          [Op.between]: [inicioPeriodo, fimPeriodo],
        },
      },
      include: [{
        model: Exame,
        attributes: ['id', 'descricao', 'tipo'], // Detalhes do exame para agrupar receita
      }],
      attributes: [
        'exameId', // Para agrupar
        [Sequelize.fn('SUM', Sequelize.col('Atendimento.valorTotal')), 'totalReceitaBruta'], // Usar Atendimento.valorTotal
        [Sequelize.fn('COUNT', Sequelize.col('Atendimento.id')), 'quantidadeAtendimentos']
      ],
      group: ['exameId', 'Exame.id', 'Exame.descricao', 'Exame.tipo'], // Agrupa por exame
      raw: true, // Retorna plain objects
    });

    const totalReceitasBrutas = receitas.reduce((sum, item) => sum + parseFloat(item.totalReceitaBruta || 0), 0);
    
    const receitasFormatadas = receitas.map(r => ({
        tipo: `Exame: ${r['Exame.descricao']} (Tipo: ${r['Exame.tipo']})`,
        valor: parseFloat(r.totalReceitaBruta),
        quantidade: parseInt(r.quantidadeAtendimentos)
    }));


    // Despesas: Soma do valorTotal das Contas a Pagar emitidas no período
    // Agrupado por Categoria de Despesa
    const despesas = await ContaPagar.findAll({
      where: {
        dataEmissao: { // Usando dataEmissao como base de competência para despesa
          [Op.between]: [inicioPeriodo, fimPeriodo],
        },
        status: { [Op.ne]: 'Cancelada' } // Exclui contas canceladas
      },
      include: [{
        model: CategoriaDespesa,
        as: 'categoriaDespesa',
        attributes: ['id', 'nome']
      }],
      attributes: [
        'categoriaDespesaId',
        [Sequelize.fn('SUM', Sequelize.col('ContaPagar.valorTotal')), 'totalDespesa'],
        [Sequelize.fn('COUNT', Sequelize.col('ContaPagar.id')), 'quantidadeContas']
      ],
      group: ['categoriaDespesaId', 'categoriaDespesa.id', 'categoriaDespesa.nome'],
      raw: true,
    });

    const totalDespesas = despesas.reduce((sum, item) => sum + parseFloat(item.totalDespesa || 0), 0);

    const despesasFormatadas = despesas.map(d => ({
        categoria: d['categoriaDespesa.nome'] || 'Sem Categoria',
        valor: parseFloat(d.totalDespesa),
        quantidade: parseInt(d.quantidadeContas)
    }));

    // Resultado
    const resultadoLiquido = totalReceitasBrutas - totalDespesas;

    return {
      periodo: { dataInicio, dataFim },
      receitasBrutas: {
        total: totalReceitasBrutas,
        detalhes: receitasFormatadas,
      },
      despesasOperacionais: { // Nome genérico para as despesas
        total: totalDespesas,
        detalhes: despesasFormatadas,
      },
      resultadoLiquido: resultadoLiquido,
    };

  } catch (error) {
    console.error("Erro ao gerar DRE Simplificado:", error.message);
    throw error;
  }
}

module.exports = gerarDreSimplificadoService;
