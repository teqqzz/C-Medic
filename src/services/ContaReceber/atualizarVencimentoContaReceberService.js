const { ContaReceber } = require('../../models'); 
const { format, parseISO, isValid } = require('date-fns');

async function atualizarVencimentoContaReceberService({ contaReceberId, novaDataVencimento }) {
  try {
    const conta = await ContaReceber.findByPk(contaReceberId);

    if (!conta) {
      throw new Error(`Conta a receber com ID ${contaReceberId} não encontrada.`);
    }

    if (conta.status === 'Pago' || conta.status === 'Cancelado') {
      throw new Error(`Conta a receber ID ${contaReceberId} está ${conta.status.toLowerCase()} e não pode ter seu vencimento alterado.`);
    }

    if (!novaDataVencimento) {
        throw new Error('Nova data de vencimento não fornecida.');
    }

    const parsedDate = parseISO(novaDataVencimento);
    if (!isValid(parsedDate)) {
        throw new Error('Nova data de vencimento inválida. Use o formato YYYY-MM-DD.');
    }
    const dataVencimentoFormatada = format(parsedDate, 'yyyy-MM-dd');


    await conta.update({
      dataVencimento: dataVencimentoFormatada,
    });
    
    return conta;

  } catch (error) {
    console.error('Erro ao atualizar vencimento da conta:', error.message);
    throw error; 
  }
}

module.exports = atualizarVencimentoContaReceberService;
