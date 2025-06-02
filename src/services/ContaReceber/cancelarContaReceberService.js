const { ContaReceber, Atendimento } = require('../../models');
const { database } = require('../../config/database');

async function cancelarContaReceberService(contaReceberId) {
  const t = await database.transaction();
  try {
    const conta = await ContaReceber.findByPk(contaReceberId, {
      include: [Atendimento], 
      transaction: t,
    });

    if (!conta) {
      throw new Error(`Conta a receber com ID ${contaReceberId} não encontrada.`);
    }

    if (conta.status === 'Pago') {
      throw new Error(`Conta a receber ID ${contaReceberId} já está paga e não pode ser cancelada. Considere um estorno/devolução (não implementado).`);
    }
    if (conta.status === 'Cancelado') {
        throw new Error(`Conta a receber ID ${contaReceberId} já está cancelada.`);
    }


    await conta.update({
      status: 'Cancelado',
      dataPagamento: null, 
      valorPago: null,     
    }, { transaction: t });

    if (conta.Atendimento) {
      await conta.Atendimento.update({
        statusPagamento: 'Cancelado', 
      }, { transaction: t });
    }

    await t.commit();
    
    const contaAtualizada = await ContaReceber.findByPk(contaReceberId, {
        include: [Atendimento]
    });
    return contaAtualizada;

  } catch (error) {
    await t.rollback();
    console.error('Erro ao cancelar conta a receber:', error.message);
    throw error;
  }
}

module.exports = cancelarContaReceberService;
