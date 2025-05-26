const { ContaPagar, Fornecedor, Funcionario, CategoriaDespesa } = require('../../models');

const buscarContaPagarPorIdServices = async (id) => {
    const conta = await ContaPagar.findByPk(id, {
        include: [
            { model: Fornecedor, attributes: ['id', 'nomeFantasia', 'cnpjCpf'], required: false },
            { model: Funcionario, attributes: ['id', 'nomeCompleto'], required: false },
            { model: CategoriaDespesa, attributes: ['id', 'nome'], required: true }
        ]
    });
    return conta;
};

module.exports = buscarContaPagarPorIdServices;