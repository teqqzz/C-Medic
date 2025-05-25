const registrarChegadaPacienteServices = require('../../services/Atendimentos/registrarChegadaPacienteServices');

const registrarChegadaPacienteController = async (req, res) => {
    try {
        const { id } = req.params; // ID do Atendimento
        const atendimento = await registrarChegadaPacienteServices(id);
        res.status(200).json({ mensagem: "Chegada do paciente registrada com sucesso.", atendimento });
    } catch (error) {
        console.error('Erro ao registrar chegada do paciente:', error);
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ erro: error.message });
        }
        res.status(400).json({ erro: error.message });
    }
};

module.exports = registrarChegadaPacienteController;