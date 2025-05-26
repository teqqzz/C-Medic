const registrarPagamentoContaReceberServices = require('../../services/ContasReceber/registrarPagamentoContaReceberServices');

const registrarPagamentoContaReceberController = async (req, res) => {
    try {
        const { id } = req.params; // ID da Conta a Receber
        const { valorPago, dataRecebimento, observacaoPagamento, formaPagamento } = req.body;

        if (valorPago === undefined) {
            return res.status(400).json({ erro: "O campo 'valorPago' é obrigatório." });
        }

        const contaAtualizada = await registrarPagamentoContaReceberServices(id, {
            valorPago,
            dataRecebimento,
            observacaoPagamento,
            formaPagamento // O serviço pode usar isso na observação ou em um campo futuro
        });
        res.status(200).json({ mensagem: "Pagamento registrado com sucesso.", conta: contaAtualizada });
    } catch (error) {
        console.error("Erro ao registrar pagamento da conta a receber:", error);
        if (error.message.includes('não encontrada') || error.message.includes('obrigatório') || error.message.includes('não pode receber novos pagamentos')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao registrar pagamento.' });
    }
};

module.exports = registrarPagamentoContaReceberController;