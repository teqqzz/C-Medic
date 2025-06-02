const { Funcionario } = require('../../models');
const { Op } = require('sequelize');

async function listarFuncionariosServices({ nome, cpf, cargo, status }) {
  try {
    const whereClause = {};
    if (nome) {
      whereClause.nomeCompleto = { [Op.like]: `%${nome}%` };
    }
    if (cpf) {
      whereClause.cpf = cpf;
    }
    if (cargo) {
      whereClause.cargo = { [Op.like]: `%${cargo}%` };
    }
    if (status) {
      whereClause.status = status;
    }

    const funcionarios = await Funcionario.findAll({
      where: whereClause,
      order: [['nomeCompleto', 'ASC']],
    });
    return funcionarios;
  } catch (error) {
    console.error("Erro ao listar funcionários no serviço:", error.message);
    throw new Error('Falha ao buscar lista de funcionários.');
  }
}

module.exports = listarFuncionariosServices;
