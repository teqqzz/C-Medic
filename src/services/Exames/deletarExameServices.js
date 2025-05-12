const Exame = require('../../models/exameModel');


const deletarExameServices = (exameid) => {
  return Exame.findOneAndDelete({ exameid });
};

module.exports = deletarExameServices;