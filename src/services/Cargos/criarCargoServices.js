const { Cargo } = require('../../models');

const criarCargoServices = async (dadosCargo) => {
    if (!dadosCargo.nomeCargo) {
        throw new Error("O nome do cargo é obrigatório.");
    }
    return Cargo.create(dadosCargo);
};

module.exports = criarCargoServices;
