const adicionarEncaixeServices = require('../../services/Agendamento/adicionarEncaixeServices');

async function adicionarEncaixeController(req, res) {
  const { data, hora } = req.body;

  try {
    const resultado = await adicionarEncaixeServices(data, hora);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao adicionar encaixe:', error);
    res.status(500).json({ erro: 'Erro ao adicionar encaixe' });
  }
}

module.exports = adicionarEncaixeController;
