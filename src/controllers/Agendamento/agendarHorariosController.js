const agendarHorariosServices = require('../../services/Agendamento/agendarHorariosServices');

async function agendarHorariosController(req, res) {
  try {
    const { pacienteId, horariosIds, exameId, observacoes } = req.body;
    if (!pacienteId || !horariosIds || !Array.isArray(horariosIds) || horariosIds.length === 0 || !exameId) {
        return res.status(400).json({ erro: 'Campos pacienteId, horariosIds (array não vazio) e exameId são obrigatórios.' });
    }
    const agendamentos = await agendarHorariosServices({ pacienteId, horariosIds, exameId, observacoes });
    res.status(201).json(agendamentos);
  } catch (error) {
    console.error('Erro ao agendar horários:', error.message);
    res.status(400).json({ erro: error.message });
  }
}

module.exports = agendarHorariosController; 