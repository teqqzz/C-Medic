const Exame = require('../../models/exameModel');

const listarExamesServices = () => {
  return Exame.find();
};

module.exports = listarExamesServices;