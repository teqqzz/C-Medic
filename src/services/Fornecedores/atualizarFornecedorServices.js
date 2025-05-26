
const { Fornecedor } = require('../../models');

const atualizarFornecedorServices = async (id, dadosAtualizados) => {
    const fornecedor = await Fornecedor.findByPk(id);
    if (!fornecedor) {
        return null; 
    }

    delete dadosAtualizados.id;
    if (dadosAtualizados.cnpjCpf && dadosAtualizados.cnpjCpf !== fornecedor.cnpjCpf) {
        const fornecedorExistenteComCnpj = await Fornecedor.findOne({ where: { cnpjCpf: dadosAtualizados.cnpjCpf } });
        if (fornecedorExistenteComCnpj) {
            throw new Error('Já existe outro fornecedor cadastrado com este CNPJ/CPF.');
        }
    }
    
    if (dadosAtualizados.nomeFantasia !== undefined && dadosAtualizados.nomeFantasia.trim() === '') {
        throw new Error("Nome Fantasia não pode ser vazio.");
    }


    await fornecedor.update(dadosAtualizados);
    return fornecedor; 
};

module.exports = atualizarFornecedorServices;
