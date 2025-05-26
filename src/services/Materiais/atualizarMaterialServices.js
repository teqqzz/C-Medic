const { Material, Fornecedor } = require('../../models'); 
const { Op } = require('sequelize');

async function atualizarMaterialServices(id, dadosAtualizados) {
  try {
    const material = await Material.findByPk(id);
    if (!material) {
      return null; 
    }

    if (dadosAtualizados.codigo && dadosAtualizados.codigo !== material.codigo) {
      const materialExistente = await Material.findOne({ where: { codigo: dadosAtualizados.codigo, id: { [Op.ne]: id } } });
      if (materialExistente) {
        throw new Error(`Código de material '${dadosAtualizados.codigo}' já existe.`);
      }
    }

    if (dadosAtualizados.fornecedorId !== undefined && dadosAtualizados.fornecedorId !== material.fornecedorId) {
        if (dadosAtualizados.fornecedorId === null) { 
        } else {
            const fornecedor = await Fornecedor.findByPk(dadosAtualizados.fornecedorId);
            if (!fornecedor) {
                throw new Error(`Fornecedor com ID ${dadosAtualizados.fornecedorId} não encontrado.`);
            }
        }
    }
    
    delete dadosAtualizados.id;
    delete dadosAtualizados.criadoPor;
    delete dadosAtualizados.funcionarioCriadorId;
    delete dadosAtualizados.criadoEm;

    await material.update(dadosAtualizados);
    return material; 
  } catch (error) {
    console.error(`Erro ao atualizar material ID ${id} no serviço:`, error.message);
     if (error.message.startsWith('Código de material') || error.message.startsWith('Fornecedor com ID')) {
        throw error; 
    }
    throw new Error('Falha interna ao atualizar material.');
  }
}

module.exports = atualizarMaterialServices;
