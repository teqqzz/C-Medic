const { ContaReceber, ContaPagar, Paciente, Fornecedor } = require('../../models'); // Ajuste o caminho para seus models
const { Op } = require('sequelize');
const { startOfDay, endOfDay, parseISO } = require('date-fns');

async function gerarRelatorioFluxoCaixaService({ dataInicio, dataFim }) {
  try {
    if (!dataInicio || !dataFim) {
      throw new Error('Datas de início e fim são obrigatórias para o relatório de fluxo de caixa.');
    }

    const inicioPeriodo = startOfDay(parseISO(dataInicio));
    const fimPeriodo = endOfDay(parseISO(dataFim));

    // Entradas: Contas a Receber Pagas no período
    const entradas = await ContaReceber.findAll({
      where: {
        status: 'Pago',
        dataPagamento: {
          [Op.between]: [inicioPeriodo, fimPeriodo],
        },
      },
      include: [
        { model: Paciente, attributes: ['id', 'nome'] }
      ],
      attributes: ['id', 'descricao', 'valorPago', 'dataPagamento', 'pacienteId'],
      order: [['dataPagamento', 'ASC']],
    });

    const totalEntradas = entradas.reduce((sum, entrada) => sum + (entrada.valorPago || 0), 0);

    // Saídas: Contas a Pagar Pagas no período
    const saidas = await ContaPagar.findAll({
      where: {
        status: 'Paga', // Usando 'Paga' conforme definido no modelo ContaPagar
        dataPagamento: {
          [Op.between]: [inicioPeriodo, fimPeriodo],
        },
      },
      include: [
        { model: Fornecedor, as: 'fornecedor', attributes: ['id', 'nomeFantasia'] }
      ],
      attributes: ['id', 'descricao', 'valorPago', 'dataPagamento', 'fornecedorId'],
      order: [['dataPagamento', 'ASC']],
    });

    const totalSaidas = saidas.reduce((sum, saida) => sum + (saida.valorPago || 0), 0);

    const saldo = totalEntradas - totalSaidas;

    return {
      periodo: {
        dataInicio: dataInicio,
        dataFim: dataFim,
      },
      resumo: {
        totalEntradas,
        totalSaidas,
        saldo,
      },
      detalhesEntradas: entradas.map(e => ({
        idConta: e.id,
        dataPagamento: e.dataPagamento,
        descricao: e.descricao,
        valor: e.valorPago,
        paciente: e.Paciente ? `${e.Paciente.id} - ${e.Paciente.nome}` : 'N/A',
      })),
      detalhesSaidas: saidas.map(s => ({
        idConta: s.id,
        dataPagamento: s.dataPagamento,
        descricao: s.descricao,
        valor: s.valorPago,
        fornecedor: s.fornecedor ? `${s.fornecedor.id} - ${s.fornecedor.nomeFantasia}` : 'N/A',
      })),
    };
  } catch (error) {
    console.error("Erro ao gerar relatório de fluxo de caixa:", error.message);
    throw error;
  }
}

module.exports = gerarRelatorioFluxoCaixaService;
