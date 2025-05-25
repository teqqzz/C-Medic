const deletarHorarioServices = require('../../services/Agendamento/deletarHorarioServices');

const deletarHorarioController = async (req, res) => {
    try {
        const { horarioId } = req.params;
        const resultado = await deletarHorarioServices(parseInt(horarioId, 10));
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao deletar horário:', error.message);
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ erro: error.message });
        }
        if (error.message.includes('está agendado')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao deletar horário.' });
    }
};

module.exports = deletarHorarioController;