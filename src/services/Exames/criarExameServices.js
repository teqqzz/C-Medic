const Exame = require('../../models/exameModel');

const criarExameServices = (exameData) => {
  const novoExame = new Exame(exameData);
  return novoExame.save(); 
};

module.exports = criarExameServices;