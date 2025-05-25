const confirmarAgendamentoServices = require('../../services/Agendamento/confirmarAgendamentoServices');

async function confirmarAgendamentoController(req, res) {
    try {
        const { agendamentoId } = req.params;
        const { status } = req.body; 

        if (!status) {
            return res.status(400).json({ erro: "O campo 'status' é obrigatório no corpo da requisição." });
        }
        
        const resultado = await confirmarAgendamentoServices(parseInt(agendamentoId, 10), status);
        res.status(200).json({ mensagem: 'Status do agendamento atualizado com sucesso.', ...resultado });
    } catch (error) {
        console.error('Erro ao confirmar/atualizar status do agendamento:', error.message);
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ erro: error.message });
        }
        if (error.message.includes('inválido') || error.message.includes('ocupado')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao atualizar status do agendamento.' });
    }
}

module.exports = confirmarAgendamentoController;