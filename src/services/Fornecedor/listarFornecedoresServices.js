const { Fornecedor } = require('../../models');
const { Op } = require('sequelize');

async function listarFornecedoresServices({ nome, cnpjCpf, ativo }) {
  try {
    const whereClause = {};
    if (nome) {
      whereClause[Op.or] = [
        { nomeFantasia: { [Op.like]: `%${nome}%` } },
        { razaoSocial: { [Op.like]: `%${nome}%` } }
      ];
    }
    if (cnpjCpf) {
      whereClause[Op.or] = [
        { cnpj: cnpjCpf },
        { cpf: cnpjCpf }
      ];
    }
    if (ativo !== undefined) {
      whereClause.ativo = ativo === 'true' || ativo === true;
    }

    const fornecedores = await Fornecedor.findAll({
      where: whereClause,
      order: [['nomeFantasia', 'ASC']],
    });
    return fornecedores;
  } catch (error) {
    console.error("Erro ao listar fornecedores no serviço:", error.message);
    throw new Error('Falha ao buscar lista de fornecedores.');
  }
}

module.exports = listarFornecedoresServices;
