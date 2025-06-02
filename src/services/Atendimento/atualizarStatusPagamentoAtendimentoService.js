const { Atendimento, ContaReceber } = require('../../models'); // Adjust path
const { database } = require('../../config/database'); // Adjust path
const { format } = require('date-fns');

async function atualizarStatusPagamentoAtendimentoService(atendimentoId, novoStatusPagamento, valorPagoInformado) {
  const t = await database.transaction();
  try {
    const atendimento = await Atendimento.findByPk(atendimentoId, {
      include: [{ model: ContaReceber, required: true }], 
      transaction: t,
    });

    if (!atendimento) {
      throw new Error(`Atendimento com ID ${atendimentoId} não encontrado.`);
    }

    if (!['Pendente', 'Pago', 'Cancelado'].includes(novoStatusPagamento)) {
      throw new Error("Status de pagamento inválido. Use 'Pendente', 'Pago' ou 'Cancelado'.");
    }

    // Update Atendimento
    await atendimento.update({ statusPagamento: novoStatusPagamento }, { transaction: t });

    // Update ContaReceber
    const conta = atendimento.ContaReceber;
    let novoStatusConta = conta.status;
    let dataPagamentoConta = conta.dataPagamento;
    let valorPagoConta = conta.valorPago;

    if (novoStatusPagamento === 'Pago') {
      novoStatusConta = 'Pago';
      dataPagamentoConta = format(new Date(), 'yyyy-MM-dd'); 
      valorPagoConta = (valorPagoInformado !== undefined && !isNaN(parseFloat(valorPagoInformado))) 
                       ? parseFloat(valorPagoInformado) 
                       : conta.valor;
    } else if (novoStatusPagamento === 'Cancelado') {
      novoStatusConta = 'Cancelado';
      dataPagamentoConta = null; 
      valorPagoConta = null; 
    } else {
      novoStatusConta = 'Pendente'; 
      dataPagamentoConta = null;
      valorPagoConta = null;
    }

    await conta.update({
      status: novoStatusConta,
      dataPagamento: dataPagamentoConta,
      valorPago: valorPagoConta,
    }, { transaction: t });

    await t.commit();
    return {
      atendimento: await Atendimento.findByPk(atendimentoId, { include: [ContaReceber]}), 
    };
  } catch (error) {
    await t.rollback();
    console.error('Erro ao atualizar status de pagamento do atendimento:', error.message);
    throw error;
  }
}

module.exports = atualizarStatusPagamentoAtendimentoService;
