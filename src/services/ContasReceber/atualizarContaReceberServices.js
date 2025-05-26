const { ContaReceber } = require('../../models');

const atualizarContaReceberServices = async (id, dadosAtualizados) => {
    const conta = await ContaReceber.findByPk(id);
    if (!conta) {
        return null; 
    }


    const camposPermitidos = [
        'descricao',
        'valorTotalAReceber', 
        'dataVencimento',
        'status', 
        'observacoes'
    ];
    const dadosParaUpdate = {};
    for (const campo of camposPermitidos) {
        if (dadosAtualizados[campo] !== undefined) {
            dadosParaUpdate[campo] = dadosAtualizados[campo];
        }
    }

    if (Object.keys(dadosParaUpdate).length === 0) {
        throw new Error("Nenhum dado válido fornecido para atualização da conta a receber.");
    }

    // Validações específicas
    if (dadosParaUpdate.valorTotalAReceber !== undefined && Number(dadosParaUpdate.valorTotalAReceber) < (conta.valorRecebido || 0)) {
        throw new Error("O novo valor total a receber não pode ser menor que o valor já recebido.");
    }
    if (dadosParaUpdate.status === 'Recebida Totalmente' && (conta.valorRecebido || 0) < (dadosParaUpdate.valorTotalAReceber || conta.valorTotalAReceber)) {
        throw new Error("Não é possível marcar como 'Recebida Totalmente' se o valor recebido é menor que o valor total.");
    }
    if (dadosParaUpdate.status === 'Recebida Parcialmente' && (conta.valorRecebido || 0) === 0) {
        throw new Error("Não é possível marcar como 'Recebida Parcialmente' se nenhum valor foi recebido.");
    }


    await conta.update(dadosParaUpdate);
    return conta.reload(); 
};

module.exports = atualizarContaReceberServices;