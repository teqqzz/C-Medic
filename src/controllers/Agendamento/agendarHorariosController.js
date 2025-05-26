// Ajuste o caminho conforme sua estrutura.
// Este é o serviço que acabamos de definir, com a lógica de carrinho.
const agendarHorariosServices = require('../../services/Agendamento/agendarHorariosServices'); 

async function agendarHorariosController(req, res) {
  try {
    const { pacienteId, agendamentosPropostos } = req.body;

    if (!pacienteId || !agendamentosPropostos || !Array.isArray(agendamentosPropostos) || agendamentosPropostos.length === 0) {
      return res.status(400).json({ erro: 'Campos pacienteId e agendamentosPropostos (array não vazio de propostas) são obrigatórios.' });
    }

    for (const proposta of agendamentosPropostos) {
        if (proposta.horarioId === undefined || proposta.exameId === undefined) { 
            return res.status(400).json({ erro: `Cada item em 'agendamentosPropostos' deve conter 'horarioId' e 'exameId'. Proposta inválida: ${JSON.stringify(proposta)}` });
        }
        if (isNaN(parseInt(proposta.horarioId)) || isNaN(parseInt(proposta.exameId))) {
            return res.status(400).json({ erro: `'horarioId' e 'exameId' devem ser números. Proposta inválida: ${JSON.stringify(proposta)}` });
        }
    }

    const agendamentosConfirmados = await agendarHorariosServices({ pacienteId, agendamentosPropostos });
    res.status(201).json({ mensagem: "Agendamentos do carrinho confirmados com sucesso!", agendamentos: agendamentosConfirmados });

  } catch (error) {
    console.error('Erro no controller ao agendar horários (carrinho):', error.message);
    if (error.message.includes('não encontrado') || 
        error.message.includes('não está disponível') || 
        error.message.includes('já possui um agendamento') ||
        error.message.includes('deve conter horarioId e exameId') ||
        error.message.includes('lista de agendamentos propostos é obrigatória')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro interno ao processar o agendamento do carrinho.' });
  }
}

module.exports = agendarHorariosController;
