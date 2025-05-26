const { Fornecedor } = require('../../models');
const { Op } = require('sequelize');

const listarFornecedoresServices = async (filtros = {}) => {
    const whereClause = { ativo: true }; // Por padrão, listar apenas ativos
    if (filtros.nomeFantasia) {
        whereClause.nomeFantasia = { [Op.like]: `%${filtros.nomeFantasia}%` };
    }
    if (filtros.cnpjCpf) {
        whereClause.cnpjCpf = filtros.cnpjCpf;
    }
    if (filtros.cidade) {
        whereClause.cidade = { [Op.like]: `%${filtros.cidade}%` };
    }
    if (filtros.ativo !== undefined) { // Permite buscar inativos se explicitamente solicitado
        whereClause.ativo = filtros.ativo === 'true' || filtros.ativo === true;
    }

    return Fornecedor.findAll({
        where: whereClause,
        order: [['nomeFantasia', 'ASC']]
    });
};

module.exports = listarFornecedoresServices;