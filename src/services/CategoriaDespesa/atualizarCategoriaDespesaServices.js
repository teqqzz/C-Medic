const { CategoriaDespesa } = require('../../models');
const { Op } = require('sequelize');

async function atualizarCategoriaDespesaServices(id, dadosAtualizacao) {
  try {
    const categoria = await CategoriaDespesa.findByPk(id);
    if (!categoria) {
      return null;
    }

    // Validação de nome único se estiver sendo alterado
    if (dadosAtualizacao.nome && dadosAtualizacao.nome !== categoria.nome) {
      const categoriaExistente = await CategoriaDespesa.findOne({
        where: { nome: dadosAtualizacao.nome, id: { [Op.ne]: id } }
      });
      if (categoriaExistente) {
        throw new Error(`Categoria de despesa com nome '${dadosAtualizacao.nome}' já existe.`);
      }
    }

    // Remover campos que não devem ser atualizados diretamente
    delete dadosAtualizacao.id;
    delete dadosAtualizacao.criadoPor;
    delete dadosAtualizacao.funcionarioCriadorId;
    delete dadosAtualizacao.criadoEm;

    await categoria.update(dadosAtualizacao);
    return categoria;
  } catch (error) {
    console.error(`Erro ao atualizar categoria de despesa ID ${id} no serviço:`, error.message);
    if (error.name === 'SequelizeUniqueConstraintError' || error.message.includes('já existe')) {
        throw new Error(error.message);
    }
    throw new Error('Falha interna ao atualizar categoria de despesa.');
  }
}

module.exports = atualizarCategoriaDespesaServices;
