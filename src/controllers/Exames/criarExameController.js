const criarExameServices = require('../../services/Exames/criarExameServices');

const criarExameController = async (req, res) => {
  try {
    const { descricao, tipo , codigo, valor, criadoPor } = req.body;
    const exameSalvo = await criarExameServices({ descricao, tipo, codigo, valor, criadoPor });
    res.status(201).json(exameSalvo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar exame', erro: error.message });
  }
};

module.exports = criarExameController;
