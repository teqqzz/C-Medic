const deletarAgendaServices = require('../../services/Agendamento/deletarAgendaServices');

const deletarAgendaController = async (req, res) => {
    try {
        const { agendaId } = req.params;
        const resultado = await deletarAgendaServices(parseInt(agendaId, 10));
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao deletar agenda:', error.message);
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ erro: error.message });
        }
        if (error.message.includes('horários agendados')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao deletar agenda.' });
    }
};

module.exports = deletarAgendaController;