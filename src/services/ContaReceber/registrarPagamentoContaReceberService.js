const { ContaReceber, Atendimento } = require('../../models');
const { database } = require('../../config/database'); 
const { format, isValid, parseISO } = require('date-fns');

async function registrarPagamentoContaReceberService({ contaReceberId, dataPagamento, valorPago }) {
  const t = await database.transaction();
  try {
    const conta = await ContaReceber.findByPk(contaReceberId, {
      include: [Atendimento], 
      transaction: t,
    });

    if (!conta) {
      throw new Error(`Conta a receber com ID ${contaReceberId} não encontrada.`);
    }

    if (conta.status === 'Pago' || conta.status === 'Cancelado') {
      throw new Error(`Conta a receber ID ${contaReceberId} já está ${conta.status.toLowerCase()} e não pode ser alterada para pagamento.`);
    }

    let dataPagamentoFormatada;
    if (dataPagamento) {
        const parsedDate = parseISO(dataPagamento);
        if (!isValid(parsedDate)) {
            throw new Error('Data de pagamento inválida. Use o formato YYYY-MM-DD.');
        }
        dataPagamentoFormatada = format(parsedDate, 'yyyy-MM-dd');
    } else {
        // Se não fornecer dataPagamento, usa a data atual
        dataPagamentoFormatada = format(new Date(), 'yyyy-MM-dd');
    }

    const valorPagoNumerico = parseFloat(valorPago);
    if (isNaN(valorPagoNumerico) || valorPagoNumerico <= 0) {
      throw new Error('Valor pago inválido ou não fornecido.');
    }


    await conta.update({
      status: 'Pago',
      dataPagamento: dataPagamentoFormatada,
      valorPago: valorPagoNumerico, 
    }, { transaction: t });

    if (conta.Atendimento) {
      await conta.Atendimento.update({
        statusPagamento: 'Pago',
      }, { transaction: t });
    }

    await t.commit();
    
    // Retorna a conta atualizada com o atendimento
    const contaAtualizada = await ContaReceber.findByPk(contaReceberId, {
        include: [Atendimento]
    });
    return contaAtualizada;

  } catch (error) {
    await t.rollback();
    console.error('Erro ao registrar pagamento da conta:', error.message);
    throw error;
  }
}

module.exports = registrarPagamentoContaReceberService;
