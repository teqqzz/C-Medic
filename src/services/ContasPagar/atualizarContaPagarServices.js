const { ContaPagar, Fornecedor, Funcionario, CategoriaDespesa, database } = require('../../models');

const atualizarContaPagarServices = async (id, dadosAtualizados) => {
    const { valorPago, dataPagamento, ...outrosDados } = dadosAtualizados;

    const t = await database.transaction();
    try {
        const conta = await ContaPagar.findByPk(id, { transaction: t });
        if (!conta) {
            throw new Error(`Conta a Pagar com ID ${id} não encontrada.`);
        }


        const camposEditaveis = ['descricao', 'valor', 'dataVencimento', 'status', 'fornecedorId', 'funcionarioId', 'categoriaDespesaId', 'observacoes'];
        const dadosParaUpdateGeral = {};
        let houveAlteracaoGeral = false;

        for (const campo of camposEditaveis) {
            if (outrosDados[campo] !== undefined) { // Permite enviar null para limpar campos opcionais
                // Validar FKs se forem alteradas
                if (campo === 'fornecedorId' && outrosDados.fornecedorId) {
                    const fornecedor = await Fornecedor.findByPk(outrosDados.fornecedorId, { transaction: t });
                    if (!fornecedor) throw new Error(`Fornecedor com ID ${outrosDados.fornecedorId} não encontrado.`);
                }
                if (campo === 'funcionarioId' && outrosDados.funcionarioId) {
                    const funcionario = await Funcionario.findByPk(outrosDados.funcionarioId, { transaction: t });
                    if (!funcionario) throw new Error(`Funcionário com ID ${outrosDados.funcionarioId} não encontrado.`);
                }
                if (campo === 'categoriaDespesaId' && outrosDados.categoriaDespesaId) {
                    const categoria = await CategoriaDespesa.findByPk(outrosDados.categoriaDespesaId, { transaction: t });
                    if (!categoria) throw new Error(`Categoria de Despesa com ID ${outrosDados.categoriaDespesaId} não encontrada.`);
                }
                if (campo === 'valor' && Number(outrosDados.valor) <= 0) {
                    throw new Error("O valor da conta a pagar deve ser positivo.");
                }
                if (campo === 'valor' && Number(outrosDados.valor) < (conta.valorPago || 0) ) {
                    throw new Error("O novo valor da conta não pode ser menor que o valor já pago.");
                }

                dadosParaUpdateGeral[campo] = outrosDados[campo];
                houveAlteracaoGeral = true;
            }
        }

        if (houveAlteracaoGeral) {
            await conta.update(dadosParaUpdateGeral, { transaction: t });
        }

        // Registrar pagamento se valorPago for fornecido
        if (valorPago !== undefined) {
            if (Number(valorPago) <= 0) {
                throw new Error("O valor do pagamento deve ser positivo.");
            }
            if (conta.status === 'Paga Totalmente' || conta.status === 'Cancelada') {
                throw new Error(`Conta já está ${conta.status} e não pode receber novos pagamentos.`);
            }

            const novoValorPagoAcumulado = (conta.valorPago || 0) + Number(valorPago);
            let novoStatusConta = conta.status; // Mantém o status atual se não for pago totalmente

            if (novoValorPagoAcumulado >= conta.valor) {
                novoStatusConta = 'Paga Totalmente';
            } else if (novoValorPagoAcumulado > 0) { // Só muda para parcial se realmente pagou algo
                novoStatusConta = 'Paga Parcialmente';
            }
            // Se novoValorPagoAcumulado for 0 e status era Pendente, continua Pendente

            await conta.update({
                valorPago: novoValorPagoAcumulado,
                status: novoStatusConta,
                dataPagamento: dataPagamento || new Date() // Usa data atual se não fornecida para o pagamento
            }, { transaction: t });
        }

        await t.commit();
        return conta.reload({ 
            include: [
                { model: Fornecedor, required: false }, 
                { model: Funcionario, required: false }, 
                CategoriaDespesa
            ]
        });

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = atualizarContaPagarServices;
