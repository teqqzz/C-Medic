const atualizarExameServices = require('../../services/Exames/atualizarExameServices');

const atualizarExameController = async (req, res) => {
  try {
    const { exameid } = req.params;
    const { descricao, codigo, valor, criadoPor } = req.body;

    // Atualiza o exame pelo ID
    const exameAtualizado = await atualizarExameServices(
      exameid,
      { descricao, codigo, valor, criadoPor }
    );

    if (!exameAtualizado) {
      return res.status(404).json({ mensagem: 'Exame não encontrado' });
    }

    res.status(200).json(exameAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar exame', erro: error.message });
  }
};

module.exports = atualizarExameController;