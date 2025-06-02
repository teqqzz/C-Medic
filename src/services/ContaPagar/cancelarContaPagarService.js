const { ContaPagar } = require('../../models');

async function cancelarContaPagarService(id) {
  try {
    const conta = await ContaPagar.findByPk(id);
    if (!conta) {
      return { status: 404, message: `Conta a pagar com ID ${id} não encontrada.` };
    }

    if (conta.status === 'Paga') {
      return { status: 400, message: `Conta a pagar ID ${id} já está paga e não pode ser cancelada diretamente. Considere um estorno ou ajuste manual.` };
    }
    if (conta.status === 'Cancelada') {
      return { status: 400, message: `Conta a pagar ID ${id} já está cancelada.` };
    }

    await conta.update({
      status: 'Cancelada',
      valorPago: null, // Opcional: zerar valor pago ao cancelar
      dataPagamento: null // Opcional: limpar data de pagamento
    });
    return { status: 200, message: `Conta a pagar ID ${id} cancelada com sucesso.`, conta };

  } catch (error) {
    console.error(`Erro ao cancelar conta a pagar ID ${id} no serviço:`, error.message);
    throw new Error('Falha ao cancelar conta a pagar.');
  }
}

module.exports = cancelarContaPagarService;
