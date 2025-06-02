const atualizarExameServices = require('../../services/Exames/atualizarExameServices');

const atualizarExameController = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, tipo, codigo, valor, criadoPor } = req.body;

    const exameAtualizado = await atualizarExameServices(id, {
      descricao, tipo, codigo, valor, criadoPor
    });

    if (!exameAtualizado) {
      return res.status(404).json({ mensagem: 'Exame não encontrado' });
    }

    res.status(200).json(exameAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar exame', erro: error.message });
  }
};

module.exports = atualizarExameController;
