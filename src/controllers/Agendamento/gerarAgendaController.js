const gerarAgendaServices = require('../../services/Agendamento/gerarAgendaServices');

async function gerarAgendaController(req, res) {
  try {
    const resultado = await gerarAgendaServices(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao gerar agenda:', error);
    res.status(500).json({ erro: 'Erro interno ao gerar agenda' });
  }
}

module.exports = gerarAgendaController;