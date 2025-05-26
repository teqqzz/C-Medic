const { Fornecedor } = require('../../models');

const buscarFornecedorPorIdServices = async (id) => {
    const fornecedor = await Fornecedor.findByPk(id);
    return fornecedor; 
};

module.exports = buscarFornecedorPorIdServices;
