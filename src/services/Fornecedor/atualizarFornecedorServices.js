const { Fornecedor } = require('../../models');
const { Op } = require('sequelize');

async function atualizarFornecedorServices(id, dadosAtualizacao) {
  try {
    const fornecedor = await Fornecedor.findByPk(id);
    if (!fornecedor) {
      return null;
    }

    if (dadosAtualizacao.cnpj && dadosAtualizacao.cnpj !== fornecedor.cnpj) {
      const existenteCnpj = await Fornecedor.findOne({ where: { cnpj: dadosAtualizacao.cnpj, id: { [Op.ne]: id } } });
      if (existenteCnpj) {
        throw new Error(`CNPJ ${dadosAtualizacao.cnpj} já pertence a outro fornecedor.`);
      }
      dadosAtualizacao.cpf = null; 
    }
    if (dadosAtualizacao.cpf && dadosAtualizacao.cpf !== fornecedor.cpf) {
      const existenteCpf = await Fornecedor.findOne({ where: { cpf: dadosAtualizacao.cpf, id: { [Op.ne]: id } } });
      if (existenteCpf) {
        throw new Error(`CPF ${dadosAtualizacao.cpf} já pertence a outro fornecedor.`);
      }
      dadosAtualizacao.cnpj = null; 
    }
    
    delete dadosAtualizacao.id;
    delete dadosAtualizacao.criadoPor;
    delete dadosAtualizacao.funcionarioCriadorId;
    delete dadosAtualizacao.criadoEm;

    await fornecedor.update(dadosAtualizacao);
    return fornecedor;
  } catch (error) {
    console.error(`Erro ao atualizar fornecedor ID ${id} no serviço:`, error.message);
    if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error(`Erro de unicidade: ${error.errors.map(e => `${e.path} '${e.value}' já existe`).join(', ')}`);
    }
    throw error;
  }
}

module.exports = atualizarFornecedorServices;
