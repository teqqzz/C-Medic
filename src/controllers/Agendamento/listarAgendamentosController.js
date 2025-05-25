const listarAgendamentosServices = require('../../services/Agendamento/listarAgendamentosServices');

async function listarAgendamentosController(req, res) {
    try {
        const { pacienteId } = req.params;
        const agendamentos = await listarAgendamentosServices(pacienteId);
        if (agendamentos.length === 0) {
            return res.status(200).json({ mensagem: 'Nenhum agendamento encontrado para este paciente.' , data: []});
        }
        res.status(200).json(agendamentos);
    } catch (error) {
        console.error('Erro ao listar agendamentos do paciente:', error.message);
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao listar agendamentos.' });
    }
}

module.exports = listarAgendamentosController;