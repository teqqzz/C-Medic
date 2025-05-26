const { Material, MovimentacaoEstoque, database } = require('../../models');
const registrarMovimentacaoEstoqueServices = require('./registrarMovimentacaoEstoqueServices');

const ajustarEstoquePorInventarioServices = async (materialId, quantidadeContadaFisicamente, funcionarioIdResponsavel, observacaoInventario = '') => {
    if (materialId === undefined || quantidadeContadaFisicamente === undefined || Number(quantidadeContadaFisicamente) < 0) {
        throw new Error('ID do material e quantidade contada (não negativa) são obrigatórios.');
    }

    const t = await database.transaction(); // Usar transação se registrarMovimentacaoEstoqueServices não gerenciar a sua própria

    try {
        const material = await Material.findByPk(materialId, { transaction: t });
        if (!material) {
            throw new Error(`Material com ID ${materialId} não encontrado.`);
        }

        const quantidadeSistema = material.quantidade;
        const diferenca = Number(quantidadeContadaFisicamente) - quantidadeSistema;

        if (diferenca === 0) {
            if (!transaction) await t.commit(); // Commit se a transação foi criada aqui
            return {
                mensagem: `Inventário para o material '${material.descricao}' está correto. Nenhuma alteração realizada.`,
                materialId: material.id,
                quantidadeAnterior: quantidadeSistema,
                quantidadeNova: quantidadeContadaFisicamente,
                diferenca: 0
            };
        }

        const tipoMovimentacaoAjuste = diferenca > 0 ? 'Ajuste Inventário Positivo' : 'Ajuste Inventário Negativo';
        const quantidadeAjuste = Math.abs(diferenca);

        // O serviço registrarMovimentacaoEstoqueServices já atualiza material.quantidade
        // e cria o registro em MovimentacaoEstoque.
        // Passamos a transação 't' para ele.
        const resultadoMovimentacao = await registrarMovimentacaoEstoqueServices({
            materialId: material.id,
            tipoMovimentacao: tipoMovimentacaoAjuste,
            quantidade: quantidadeAjuste,
            funcionarioId: funcionarioIdResponsavel,
            observacao: observacaoInventario || `Ajuste de inventário físico. Contagem: ${quantidadeContadaFisicamente}, Sistema: ${quantidadeSistema}.`
        }, t); 



        if (!transaction) await t.commit(); // Commit se a transação foi criada aqui

        return {
            mensagem: `Estoque do material '${material.descricao}' ajustado com sucesso.`,
            materialId: material.id,
            quantidadeAnterior: quantidadeSistema,
            quantidadeNova: resultadoMovimentacao.saldoAtualizado, 
            diferenca: diferenca,
            movimentacaoId: resultadoMovimentacao.movimentacao.id
        };

    } catch (error) {
        if (!transaction) await t.rollback(); 
        throw error;
    }
};

module.exports = ajustarEstoquePorInventarioServices;