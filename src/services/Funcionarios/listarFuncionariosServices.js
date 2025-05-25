const { Funcionario } = require('../../models');
const { Op } = require('sequelize'); 

const listarFuncionariosServices = async (filtros = {}) => {
    const whereClause = {};
    if (filtros.nome) {
        whereClause.nomeCompleto = { [Op.like]: `%${filtros.nome}%` };
    }
    if (filtros.cpf) {
        whereClause.cpf = filtros.cpf;
    }
    if (filtros.ativo !== undefined) { 
        whereClause.ativo = filtros.ativo === 'true' || filtros.ativo === true;
    }
   
    return Funcionario.findAll({ 
        where: whereClause, 
        order: [['nomeCompleto', 'ASC']] 
    });
};

module.exports = listarFuncionariosServices;