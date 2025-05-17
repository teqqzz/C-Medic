const Material = require('../../models/materialModel');

const criarMaterialServices = async (dadosMaterial) => {
  return await Material.create(dadosMaterial);
};

module.exports = criarMaterialServices;
