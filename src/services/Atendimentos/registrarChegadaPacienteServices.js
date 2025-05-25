const { Atendimento } = require('../../models');

const registrarChegadaPacienteServices = async (atendimentoId) => {
    const atendimento = await Atendimento.findByPk(atendimentoId);
    if (!atendimento) {
        throw new Error('Atendimento não encontrado.');
    }
    if (atendimento.statusAtendimento !== 'Agendado') {
        throw new Error(`Não é possível registrar chegada para atendimento com status: ${atendimento.statusAtendimento}`);
    }
    return atendimento.update({ 
        statusAtendimento: 'Aguardando',
        dataHoraInicioReal: new Date() 
    });
};

module.exports = registrarChegadaPacienteServices;