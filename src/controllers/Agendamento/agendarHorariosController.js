// src/controllers/Agendamento/agendarHorariosController.js
const agendarHorariosServices = require('../../services/Agendamento/agendarHorariosServices');

async function agendarHorariosController(req, res) {
  try {
    const {
        pacienteId,
        horariosIds,
        examePrincipalId,
        itensParaAtendimento, 
        observacoes,
        funcionarioIdLogado
    } = req.body;

    if (!pacienteId ||
        !horariosIds || !Array.isArray(horariosIds) || horariosIds.length === 0 ||
        !examePrincipalId ||
        !itensParaAtendimento || !Array.isArray(itensParaAtendimento) || itensParaAtendimento.length === 0) {
        return res.status(400).json({ erro: 'Campos pacienteId, horariosIds (array), examePrincipalId e itensParaAtendimento (array) são obrigatórios.' });
    }

    const agendamentosRealizados = await agendarHorariosServices({
        pacienteId,
        horariosIds,
        examePrincipalId,
        itensParaAtendimento,
        observacoes,
        funcionarioIdLogado
    });
    res.status(201).json(agendamentosRealizados);
  } catch (error) {
    console.error('Erro ao agendar horários:', error.message);
    if (error.message.includes('não encontrado') || error.message.includes('insuficiente') || error.message.includes('obrigatórios') || error.message.includes('inválido')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao processar agendamentos.' });
  }
}

module.exports = agendarHorariosController;