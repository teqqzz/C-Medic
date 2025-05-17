const Exame = require('../../models/exameModel');

const atualizarExameServices = async (id, dadosAtualizados) => {
  const [linhasAfetadas] = await Exame.update(dadosAtualizados, {
    where: { id }
  });

  if (linhasAfetadas === 0) return null;

  return await Exame.findByPk(id);
};

module.exports = atualizarExameServices;