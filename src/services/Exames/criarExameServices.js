const Exame = require('../../models/exameModel');

const criarExameServices = async (exameData) => {
  return await Exame.create(exameData);
};

module.exports = criarExameServices;