const Exame = require('../../models/exameModel');

// Serviço para atualizar exame pelo exameid
const atualizarExameServices = (exameid, dadosAtualizados) => {
  return Exame.findOneAndUpdate(
    { exameid },                
    dadosAtualizados,           
    { new: true }               
  );
};

module.exports = atualizarExameServices;