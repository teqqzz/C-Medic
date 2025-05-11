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

// Atualizar um exame existente
const atualizarExame = (exameid, dadosAtualizados) => {
  return Exame.findOneAndUpdate(
    { exameid },
    dadosAtualizados,
    { new: true }
  );
};

// Deletar um exame
const deletarExame = (exameid) => {
  return Exame.findOneAndDelete({ exameid });
};

module.exports = { listarExames, criarExame, atualizarExame, deletarExame };