const { ContaReceber, Paciente, Atendimento } = require('../../models');
const { Op } = require('sequelize');
const { parseISO, differenceInDays, format, startOfDay, endOfDay } = require('date-fns');

function calcularFaixaVencimento(dataVencimento, dataReferencia) {
    const diasAtraso = differenceInDays(dataReferencia, dataVencimento);

    if (diasAtraso < 0) return { faixa: 'A Vencer', dias: Math.abs(diasAtraso) };
    if (diasAtraso === 0) return { faixa: 'Vence Hoje', dias: 0 };
    if (diasAtraso >= 1 && diasAtraso <= 30) return { faixa: 'Vencido 1-30 dias', dias: diasAtraso };
    if (diasAtraso >= 31 && diasAtraso <= 60) return { faixa: 'Vencido 31-60 dias', dias: diasAtraso };
    if (diasAtraso >= 61 && diasAtraso <= 90) return { faixa: 'Vencido 61-90 dias', dias: diasAtraso };
    return { faixa: 'Vencido > 90 dias', dias: diasAtraso };
}

async function gerarRelatorioContasAReceberService({ dataReferenciaStr, pacienteId, status }) {
  try {
    if (!dataReferenciaStr) {
      throw new Error('Data de referência é obrigatória.');
    }
    const dataReferencia = startOfDay(parseISO(dataReferenciaStr));

    const whereClause = {};
    if (pacienteId) {
      whereClause.pacienteId = pacienteId;
    }
    if (status) {
        if (['Pendente', 'Pago', 'Vencido', 'Cancelado'].includes(status)) {
            whereClause.status = status;
        } else if (status === 'EmAberto') { 
            whereClause.status = { [Op.or]: ['Pendente', 'Vencido'] };
        } else {
            console.warn(`Status de filtro '${status}' inválido. Buscando todos os status não cancelados se nenhum status específico for válido.`);
            whereClause.status = { [Op.ne]: 'Cancelado' }; 
        }
    } else {
         whereClause.status = { [Op.ne]: 'Cancelado' }; 
    }


    const contas = await ContaReceber.findAll({
      where: whereClause,
      include: [
        { model: Paciente, attributes: ['id', 'nome', 'cpf'] },
        { model: Atendimento, attributes: ['id', 'dataAtendimento'] }
      ],
      order: [['dataVencimento', 'ASC'], ['pacienteId', 'ASC']],
    });

    let totalGeral = 0;
    let totalPago = 0;
    let totalPendente = 0;
    let totalVencido = 0;
    let totalAVencer = 0;

    const resumoPorFaixa = {
        'A Vencer': { quantidade: 0, valor: 0 },
        'Vence Hoje': { quantidade: 0, valor: 0 },
        'Vencido 1-30 dias': { quantidade: 0, valor: 0 },
        'Vencido 31-60 dias': { quantidade: 0, valor: 0 },
        'Vencido 61-90 dias': { quantidade: 0, valor: 0 },
        'Vencido > 90 dias': { quantidade: 0, valor: 0 },
    };

    const detalhesContas = contas.map(conta => {
      totalGeral += conta.valor;
      if (conta.status === 'Pago') totalPago += conta.valorPago || conta.valor;
      
      let analiseVencimento = { faixa: conta.status, dias: null }; 
      if (conta.status === 'Pendente' || conta.status === 'Vencido') {
        totalPendente += conta.valor;
        analiseVencimento = calcularFaixaVencimento(parseISO(conta.dataVencimento), dataReferencia);
        
        if (resumoPorFaixa[analiseVencimento.faixa]) {
            resumoPorFaixa[analiseVencimento.faixa].quantidade++;
            resumoPorFaixa[analiseVencimento.faixa].valor += conta.valor;
        }

        if (analiseVencimento.faixa.startsWith('Vencido') || analiseVencimento.faixa === 'Vence Hoje') {
            totalVencido += conta.valor;
        } else if (analiseVencimento.faixa === 'A Vencer') {
            totalAVencer += conta.valor;
        }
      }


      return {
        idConta: conta.id,
        descricao: conta.descricao,
        pacienteId: conta.pacienteId,
        pacienteNome: conta.Paciente?.nome || 'N/A',
        pacienteCpf: conta.Paciente?.cpf || 'N/A',
        dataEmissao: conta.dataEmissao,
        dataVencimento: conta.dataVencimento,
        dataPagamento: conta.dataPagamento,
        valor: conta.valor,
        valorPago: conta.valorPago,
        statusAtual: conta.status,
        faixaVencimento: analiseVencimento.faixa,
        diasReferencia: analiseVencimento.dias, 
        dataAtendimentoRelacionado: conta.Atendimento?.dataAtendimento
      };
    });

    return {
      dataReferenciaRelatorio: format(dataReferencia, 'yyyy-MM-dd'),
      filtrosAplicados: { pacienteId, status },
      resumoFinanceiro: {
          totalGeralPeriodoFiltrado: totalGeral, // Total das contas que passaram pelo filtro de status/paciente
          totalPagoPeriodoFiltrado: totalPago,   // Total pago das contas que passaram pelo filtro
          totalPendenteGeral: totalPendente,     // Total pendente (Pendente + Vencido) das contas filtradas
          totalVencido: totalVencido,            // Total apenas das vencidas (não inclui 'Pendente' a vencer)
          totalAVencer: totalAVencer,            // Total das 'Pendente' que ainda vão vencer
      },
      resumoPorFaixaVencimento: resumoPorFaixa,
      detalhesContas: detalhesContas,
    };

  } catch (error) {
    console.error("Erro ao gerar relatório de contas a receber:", error.message);
    throw error;
  }
}

module.exports = gerarRelatorioContasAReceberService;
