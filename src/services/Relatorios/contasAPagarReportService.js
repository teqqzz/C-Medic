const { ContaPagar, Fornecedor, CategoriaDespesa } = require('../../models');
const { Op } = require('sequelize');
const { parseISO, differenceInDays, format, startOfDay } = require('date-fns');

// A função calcularFaixaVencimento pode ser reutilizada ou copiada aqui
// Se for reutilizar, pode movê-la para um arquivo de utils.
function calcularFaixaVencimentoCP(dataVencimento, dataReferencia) {
    const diasAtraso = differenceInDays(dataReferencia, dataVencimento); // dataReferencia - dataVencimento

    if (diasAtraso < 0) return { faixa: 'A Vencer', dias: Math.abs(diasAtraso) }; // Vence no futuro
    if (diasAtraso === 0) return { faixa: 'Vence Hoje', dias: 0 };
    if (diasAtraso >= 1 && diasAtraso <= 30) return { faixa: 'Vencida 1-30 dias', dias: diasAtraso };
    if (diasAtraso >= 31 && diasAtraso <= 60) return { faixa: 'Vencida 31-60 dias', dias: diasAtraso };
    if (diasAtraso >= 61 && diasAtraso <= 90) return { faixa: 'Vencida 61-90 dias', dias: diasAtraso };
    return { faixa: 'Vencida > 90 dias', dias: diasAtraso };
}


async function gerarRelatorioContasAPagarService({ dataReferenciaStr, fornecedorId, categoriaDespesaId, status }) {
  try {
    if (!dataReferenciaStr) {
      throw new Error('Data de referência é obrigatória.');
    }
    const dataReferencia = startOfDay(parseISO(dataReferenciaStr));

    const whereClause = {};
    if (fornecedorId) {
      whereClause.fornecedorId = fornecedorId;
    }
    if (categoriaDespesaId) {
      whereClause.categoriaDespesaId = categoriaDespesaId;
    }

    if (status) {
      // Usar status do modelo ContaPagar: 'Pendente', 'Paga', 'Vencida', 'Cancelada', 'Agendada'
      if (['Pendente', 'Paga', 'Vencida', 'Cancelada', 'Agendada'].includes(status)) {
          whereClause.status = status;
      } else if (status === 'EmAberto') {
          whereClause.status = { [Op.or]: ['Pendente', 'Vencida', 'Agendada'] }; 
      } else {
          console.warn(`Status de filtro '${status}' inválido. Buscando todas as não canceladas/pagas se nenhum status específico for válido.`);
          whereClause.status = { [Op.notIn]: ['Cancelada', 'Paga'] }; 
      }
    } else {
         whereClause.status = { [Op.notIn]: ['Cancelada', 'Paga'] }; 
    }


    const contas = await ContaPagar.findAll({
      where: whereClause,
      include: [
        { model: Fornecedor, as: 'fornecedor', attributes: ['id', 'nomeFantasia'] },
        { model: CategoriaDespesa, as: 'categoriaDespesa', attributes: ['id', 'nome'] }
      ],
      order: [['dataVencimento', 'ASC'], ['fornecedorId', 'ASC']],
    });

    let totalGeral = 0;
    let totalPago = 0;
    let totalPendente = 0; // Inclui Vencida e Agendada
    let totalVencido = 0;
    let totalAVencer = 0;

    const resumoPorFaixa = {
        'A Vencer': { quantidade: 0, valor: 0 },
        'Vence Hoje': { quantidade: 0, valor: 0 },
        'Vencida 1-30 dias': { quantidade: 0, valor: 0 },
        'Vencida 31-60 dias': { quantidade: 0, valor: 0 },
        'Vencida 61-90 dias': { quantidade: 0, valor: 0 },
        'Vencida > 90 dias': { quantidade: 0, valor: 0 },
        'Agendada': { quantidade: 0, valor: 0 } // Faixa para status 'Agendada'
    };

    const detalhesContas = contas.map(conta => {
      totalGeral += conta.valorTotal; // Usar valorTotal para Contas a Pagar
      if (conta.status === 'Paga') totalPago += conta.valorPago || conta.valorTotal;
      
      let analiseVencimento = { faixa: conta.status, dias: null };
      
      if (conta.status === 'Pendente' || conta.status === 'Vencida' || conta.status === 'Agendada') {
        totalPendente += conta.valorTotal;

        if (conta.status === 'Agendada') {
            resumoPorFaixa['Agendada'].quantidade++;
            resumoPorFaixa['Agendada'].valor += conta.valorTotal;
            analiseVencimento = { faixa: 'Agendada', dias: differenceInDays(parseISO(conta.dataVencimento), dataReferencia) * -1 };
        } else {
            analiseVencimento = calcularFaixaVencimentoCP(parseISO(conta.dataVencimento), dataReferencia);
            if (resumoPorFaixa[analiseVencimento.faixa]) {
                resumoPorFaixa[analiseVencimento.faixa].quantidade++;
                resumoPorFaixa[analiseVencimento.faixa].valor += conta.valorTotal;
            }

            if (analiseVencimento.faixa.startsWith('Vencida') || analiseVencimento.faixa === 'Vence Hoje') {
                totalVencido += conta.valorTotal;
            } else if (analiseVencimento.faixa === 'A Vencer') {
                totalAVencer += conta.valorTotal;
            }
        }
      }

      return {
        idConta: conta.id,
        descricao: conta.descricao,
        fornecedorId: conta.fornecedorId,
        fornecedorNome: conta.fornecedor?.nomeFantasia || 'N/A',
        categoriaDespesaId: conta.categoriaDespesaId,
        categoriaDespesaNome: conta.categoriaDespesa?.nome || 'N/A',
        dataEmissao: conta.dataEmissao,
        dataVencimento: conta.dataVencimento,
        dataPagamento: conta.dataPagamento,
        valorTotal: conta.valorTotal,
        valorPago: conta.valorPago,
        statusAtual: conta.status,
        faixaVencimento: analiseVencimento.faixa,
        diasReferencia: analiseVencimento.dias,
        numeroDocumento: conta.numeroDocumento
      };
    });

    return {
      dataReferenciaRelatorio: format(dataReferencia, 'yyyy-MM-dd'),
      filtrosAplicados: { fornecedorId, categoriaDespesaId, status },
      resumoFinanceiro: {
          totalGeralPeriodoFiltrado: totalGeral,
          totalPagoPeriodoFiltrado: totalPago,
          totalPendenteGeral: totalPendente,
          totalVencido: totalVencido,
          totalAVencer: totalAVencer,
          totalAgendado: resumoPorFaixa['Agendada'].valor,
      },
      resumoPorFaixaVencimento: resumoPorFaixa,
      detalhesContas: detalhesContas,
    };

  } catch (error) {
    console.error("Erro ao gerar relatório de contas a pagar:", error.message);
    throw error;
  }
}

module.exports = gerarRelatorioContasAPagarService;
