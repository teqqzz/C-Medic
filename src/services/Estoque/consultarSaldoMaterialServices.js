const { Material } = require('../../models');

const consultarSaldoMaterialServices = async (materialId) => {
    const material = await Material.findByPk(materialId, {
        attributes: ['id', 'descricao', 'quantidade', 'valor', 'tipo'] 
    });
    if (!material) {
        throw new Error(`Material com ID ${materialId} não encontrado.`);
    }
    return material; 
};

module.exports = consultarSaldoMaterialServices;