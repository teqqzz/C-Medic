const criarExameServices = require('../../services/Exames/criarExameServices');

const criarExameController = async (req, res) => {
  try {
    const { descricao, tipo, codigo, valor } = req.body;

    if (!descricao || !tipo || codigo === undefined || valor === undefined) {
      return res.status(400).json({ erro: 'Campos descricao, tipo, codigo e valor são obrigatórios.' });
    }
    if (isNaN(parseFloat(valor)) || isNaN(parseInt(codigo))) {
        return res.status(400).json({ erro: 'Campos codigo e valor devem ser números válidos.' });
    }


    const funcionarioIdLogado = req.usuarioLogado ? req.usuarioLogado.id : null;

    const dadosExame = { descricao, tipo, codigo: parseInt(codigo), valor: parseFloat(valor) };

    const exameSalvo = await criarExameServices(dadosExame, funcionarioIdLogado);
    res.status(201).json(exameSalvo);
  } catch (error) {
    console.error('Erro no controller ao criar exame:', error.message);
    if (error.message.startsWith('Erro de validação')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ mensagem: 'Erro interno ao criar exame', erro: error.message });
  }
};

module.exports = criarExameController;
