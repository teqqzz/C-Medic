const Exame = require('../models/exameModel');

// Função para listar todos os Exame
const listarExames = () => {
  return Exame.find();
};

// Função para adicionar um novo Exame
const criarExame = (exameData) => {
  const exame = new Exame(exameData);
  return exame.save();
};

module.exports = { listarExames, criarExame };