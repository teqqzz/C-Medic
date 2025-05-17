const Material = require('../../models/materialModel');

const listarMateriaisServices = async () => {
  return await Material.findAll();
};

module.exports = listarMateriaisServices;
