const { ContaPagar, Fornecedor, Funcionario, CategoriaDespesa } = require('../../models');

const criarContaPagarServices = async (dadosConta) => {
    const { descricao, valor, dataVencimento, fornecedorId, funcionarioId, categoriaDespesaId, status, observacoes } = dadosConta;

    if (!descricao || valor === undefined || !dataVencimento || !categoriaDespesaId) {
        throw new Error("Descrição, valor, data de vencimento e ID da categoria da despesa são obrigatórios.");
    }
    if (Number(valor) <= 0) {
        throw new Error("O valor da conta a pagar deve ser positivo.");
    }

    // Validar se IDs de FK existem, se fornecidos
    if (fornecedorId) {
        const fornecedor = await Fornecedor.findByPk(fornecedorId);
        if (!fornecedor) throw new Error(`Fornecedor com ID ${fornecedorId} não encontrado.`);
    }
    if (funcionarioId) {
        const funcionario = await Funcionario.findByPk(funcionarioId);
        if (!funcionario) throw new Error(`Funcionário com ID ${funcionarioId} não encontrado.`);
    }
    const categoria = await CategoriaDespesa.findByPk(categoriaDespesaId);
    if (!categoria) throw new Error(`Categoria de Despesa com ID ${categoriaDespesaId} não encontrada.`);

    return ContaPagar.create({
        descricao,
        valor: Number(valor),
        dataVencimento,
        fornecedorId: fornecedorId || null,
        funcionarioId: funcionarioId || null,
        categoriaDespesaId,
        status: status || 'Pendente', 
        observacoes: observacoes || null,

    });
};

module.exports = criarContaPagarServices;
