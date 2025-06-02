const Exame = require('../../models/exameModel');

const listarExamesServices = async () => {
  return await Exame.findAll();
};

module.exports = listarExamesServices;