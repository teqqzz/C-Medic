const Material = require('../../models/materialModel');

const deletarMaterialServices = async (id) => {
  const material = await Material.findByPk(id);
  if (!material) return null;

  await material.destroy();
  return material;
};

module.exports = deletarMaterialServices;
