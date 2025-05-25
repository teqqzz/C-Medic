const { MovimentacaoEstoque, Material, database } = require('../../models');

const registrarMovimentacaoEstoqueServices = async (dadosMovimentacao) => {
    const { materialId, tipoMovimentacao, quantidade, funcionarioId, observacao } = dadosMovimentacao;

    if (!materialId || !tipoMovimentacao || quantidade === undefined) {
        throw new Error('Campos materialId, tipoMovimentacao e quantidade são obrigatórios.');
    }
    if (Number(quantidade) <= 0) {
        throw new Error('A quantidade da movimentação deve ser um número positivo.');
    }

    const t = await database.transaction();
    try {
        const material = await Material.findByPk(materialId, { transaction: t });
        if (!material) {
            throw new Error(`Material com ID ${materialId} não encontrado.`);
        }

        let novaQuantidadeEmEstoque = material.quantidade;

        if (['Entrada Compra', 'Ajuste Inventário Positivo', 'Devolução Cliente'].includes(tipoMovimentacao)) {
            novaQuantidadeEmEstoque += Number(quantidade);
        } else if (['Saída por Uso', 'Saída por Venda', 'Ajuste Inventário Negativo', 'Perda/Vencimento', 'Devolução Fornecedor'].includes(tipoMovimentacao)) {
            if (material.quantidade < Number(quantidade)) {
                throw new Error(`Estoque insuficiente para o material '${material.descricao}'. Saldo atual: ${material.quantidade}, Saída solicitada: ${quantidade}.`);
            }
            novaQuantidadeEmEstoque -= Number(quantidade);
        } else {
            throw new Error('Tipo de movimentação de estoque inválido.');
        }

        await material.update({ quantidade: novaQuantidadeEmEstoque }, { transaction: t });

        const movimentacaoRegistrada = await MovimentacaoEstoque.create({
            materialId,
            tipoMovimentacao,
            quantidade: Number(quantidade),
            funcionarioId: funcionarioId || null, 
            observacao
        }, { transaction: t });

        await t.commit();
        return { movimentacao: movimentacaoRegistrada, saldoAtualizado: novaQuantidadeEmEstoque };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = registrarMovimentacaoEstoqueServices;