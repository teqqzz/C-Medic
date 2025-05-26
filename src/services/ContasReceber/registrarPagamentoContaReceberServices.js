const { ContaReceber, Atendimento, database } = require('../../models');

const registrarPagamentoContaReceberServices = async (contaReceberId, dadosPagamento) => {
    const { valorPago, dataRecebimento, observacaoPagamento, formaPagamento } = dadosPagamento;

    if (valorPago === undefined || Number(valorPago) <= 0) {
        throw new Error("O valor pago deve ser um número positivo.");
    }

    const t = await database.transaction();
    try {
        const conta = await ContaReceber.findByPk(contaReceberId, {
            include: [Atendimento], 
            transaction: t
        });

        if (!conta) {
            throw new Error(`Conta a Receber com ID ${contaReceberId} não encontrada.`);
        }
        if (conta.status === 'Recebida Totalmente' || conta.status === 'Cancelada') {
            throw new Error(`Conta a Receber já está ${conta.status} e não pode receber novos pagamentos.`);
        }

        const novoValorRecebido = (conta.valorRecebido || 0) + Number(valorPago);
        let novoStatusConta = conta.status;
        let novoStatusPagamentoAtendimento = conta.Atendimento ? conta.Atendimento.statusPagamento : null;

        if (novoValorRecebido >= conta.valorTotalAReceber) {
            novoStatusConta = 'Recebida Totalmente';
            novoStatusPagamentoAtendimento = 'Pago';
        } else {
            novoStatusConta = 'Recebida Parcialmente';
            novoStatusPagamentoAtendimento = 'Pago Parcialmente';
        }

        await conta.update({
            valorRecebido: novoValorRecebido,
            status: novoStatusConta,
            dataRecebimento: dataRecebimento || new Date(), 
            observacoes: conta.observacoes ? `${conta.observacoes}\nPagamento: ${observacaoPagamento || formaPagamento || 'N/A'}` : `Pagamento: ${observacaoPagamento || formaPagamento || 'N/A'}`
        }, { transaction: t });

        // Atualizar o status de pagamento do Atendimento associado, se houver
        if (conta.Atendimento && novoStatusPagamentoAtendimento) {
            await conta.Atendimento.update({
                statusPagamento: novoStatusPagamentoAtendimento,
                valorPago: novoValorRecebido 
            }, { transaction: t });
        }

        await t.commit();
        return conta.reload({ include: [Atendimento, Paciente] });

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = registrarPagamentoContaReceberServices;
