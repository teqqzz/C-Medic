const { Fornecedor } = require('../../models');

const criarFornecedorServices = async (dadosFornecedor) => {
    if (!dadosFornecedor.nomeFantasia || !dadosFornecedor.cnpjCpf) {
        throw new Error("Nome Fantasia e CNPJ/CPF são obrigatórios para o fornecedor.");
    }
    // Adicionar mais validações (ex: formato CNPJ/CPF)
    return Fornecedor.create(dadosFornecedor);
};

module.exports = criarFornecedorServices;
