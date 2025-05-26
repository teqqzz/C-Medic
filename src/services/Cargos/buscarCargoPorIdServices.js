const { Cargo } = require('../../models');

const buscarCargoPorIdServices = async (id) => {
    const cargo = await Cargo.findByPk(id);
    return cargo;
};

module.exports = buscarCargoPorIdServices;