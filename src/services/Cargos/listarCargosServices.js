const { Cargo } = require('../../models');
const { Op } = require('sequelize');

const listarCargosServices = async (filtros = {}) => {
    const whereClause = {};
    if (filtros.nomeCargo) {
        whereClause.nomeCargo = { [Op.like]: `%${filtros.nomeCargo}%` };
    }
    // Adicionar mais filtros se necessário
    return Cargo.findAll({
        where: whereClause,
        order: [['nomeCargo', 'ASC']]
    });
};

module.exports = listarCargosServices;
