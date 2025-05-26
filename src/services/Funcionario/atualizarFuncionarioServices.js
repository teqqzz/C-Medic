const { Funcionario } = require('../../models');
const { Op } = require('sequelize');

async function atualizarFuncionarioServices(id, dadosAtualizacao) {
  try {
    const funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {
      return null;
    }

    // Validação de CPF e Email únicos (se estiverem sendo alterados)
    if (dadosAtualizacao.cpf && dadosAtualizacao.cpf !== funcionario.cpf) {
      const existenteCpf = await Funcionario.findOne({ where: { cpf: dadosAtualizacao.cpf, id: { [Op.ne]: id } } });
      if (existenteCpf) {
        throw new Error(`CPF ${dadosAtualizacao.cpf} já pertence a outro funcionário.`);
      }
    }
    if (dadosAtualizacao.email && dadosAtualizacao.email !== funcionario.email) {
      const existenteEmail = await Funcionario.findOne({ where: { email: dadosAtualizacao.email, id: { [Op.ne]: id } } });
      if (existenteEmail) {
        throw new Error(`Email ${dadosAtualizacao.email} já pertence a outro funcionário.`);
      }
    }

    // Remove o campo 'id' dos dados de atualização para evitar problemas
    if (dadosAtualizacao.id) {
        delete dadosAtualizacao.id;
    }
    // Remove campos de timestamp para que o Sequelize os gerencie
    if (dadosAtualizacao.criadoEm) {
        delete dadosAtualizacao.criadoEm;
    }
     if (dadosAtualizacao.atualizadoEm) {
        delete dadosAtualizacao.atualizadoEm;
    }


    await funcionario.update(dadosAtualizacao);
    return funcionario;
  } catch (error) {
    console.error(`Erro ao atualizar funcionário ID ${id} no serviço:`, error.message);
    throw error;
  }
}

module.exports = atualizarFuncionarioServices;
