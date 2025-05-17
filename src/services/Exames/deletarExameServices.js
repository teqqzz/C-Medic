const Exame = require('../../models/exameModel');

const deletarExameServices = async (id) => {
  return await Exame.destroy({
    where: { id }
  });
};

module.exports = deletarExameServices;