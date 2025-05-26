const { Atendimento, Exame, Paciente } = require('../../models');
const { Op, Sequelize } = require('sequelize');
const { startOfDay, endOfDay, parseISO } = require('date-fns');

async function gerarFaturamentoExamesService({ dataInicio, dataFim, exameId }) {
  try {
    if (!dataInicio || !dataFim) {
      throw new Error('Datas de início e fim são obrigatórias.');
    }

    const inicioPeriodo = startOfDay(parseISO(dataInicio));
    const fimPeriodo = endOfDay(parseISO(dataFim));

    const whereAtendimento = {
      dataAtendimento: {
        [Op.between]: [inicioPeriodo, fimPeriodo],
      },
    };

    const whereExame = {};
    if (exameId) {
      whereExame.id = exameId;
    }

    const faturamento = await Atendimento.findAll({
      where: whereAtendimento,
      include: [{
        model: Exame,
        attributes: ['id', 'descricao', 'tipo', 'valor'], // Pega o valor base do exame também
        where: whereExame, // Filtra pelo exameId se fornecido
        required: true // Garante que apenas atendimentos com exames correspondentes sejam trazidos
      }],
      attributes: [
        // Agrupamento é feito pelo 'Exame.id'
        [Sequelize.col('Exame.id'), 'exameId'], // Para garantir que o group by funcione bem com alias
        [Sequelize.fn('SUM', Sequelize.col('Atendimento.valorExame')), 'totalFaturadoExame'], // Soma do valor do exame registrado no atendimento
        [Sequelize.fn('SUM', Sequelize.col('Atendimento.valorTotal')), 'totalFaturadoAtendimento'], // Soma do valor total do atendimento (inclui material)
        [Sequelize.fn('COUNT', Sequelize.col('Atendimento.id')), 'quantidadeAtendimentos'],
        [Sequelize.fn('AVG', Sequelize.col('Atendimento.valorTotal')), 'ticketMedioAtendimento']
      ],
      group: [
          'Exame.id', // Agrupa pela chave primária do exame
          'Exame.descricao',
          'Exame.tipo',
          'Exame.valor' // Inclui valor base do exame no group by se estiver nos atributos do Exame
      ],
      order: [[Sequelize.fn('SUM', Sequelize.col('Atendimento.valorTotal')), 'DESC']], // Ordena por maior faturamento total
      raw: true, // Para facilitar o acesso aos dados agrupados com alias de include
      nest: true, // Para aninhar o resultado do Exame
    });
    
    const resultadoFormatado = faturamento.map(item => ({
        exameId: item.exameId, 
        exameDescricao: item.Exame.descricao,
        exameTipo: item.Exame.tipo,
        valorBaseExame: parseFloat(item.Exame.valor || 0),
        totalFaturadoPeloExameNoAtendimento: parseFloat(item.totalFaturadoExame || 0), // Valor específico do exame no atendimento
        totalFaturadoComEsteExame: parseFloat(item.totalFaturadoAtendimento || 0), // Valor total do atendimento que continha este exame
        quantidadeAtendimentos: parseInt(item.quantidadeAtendimentos),
        ticketMedioPorAtendimentoComEsteExame: parseFloat(item.ticketMedioAtendimento || 0)
    }));


    return {
      periodo: { dataInicio, dataFim },
      filtroExameId: exameId || 'Todos',
      faturamentoPorExame: resultadoFormatado,
    };

  } catch (error) {
    console.error("Erro ao gerar relatório de faturamento por exame:", error.message);
    throw error;
  }
}

module.exports = gerarFaturamentoExamesService;
