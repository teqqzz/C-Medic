const deletarExameServices = require('../../services/Exames/deletarExameServices');

const deletarExameController = async (req, res) => {
  try {
    const { id } = req.params;

    const exameDeletado = await deletarExameServices(id);

    if (!exameDeletado) {
      return res.status(404).json({ mensagem: 'Exame não encontrado' });
    }

    res.status(200).json({ mensagem: 'Exame deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar exame', erro: error.message });
  }
};

module.exports = deletarExameController;
