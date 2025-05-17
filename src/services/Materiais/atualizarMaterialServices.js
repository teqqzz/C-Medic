const Material = require('../../models/materialModel');

const atualizarMaterialServices = async (id, dadosAtualizados) => {
  const material = await Material.findByPk(id);
  if (!material) return null;

  await material.update(dadosAtualizados);
  return material;
};

module.exports = atualizarMaterialServices;
