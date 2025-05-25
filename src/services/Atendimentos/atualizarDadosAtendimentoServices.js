const { Atendimento } = require('../../models');

const atualizarDadosAtendimentoServices = async (id, dadosParaAtualizar) => {
    const atendimento = await Atendimento.findByPk(id);
    if (!atendimento) {
        throw new Error('Atendimento não encontrado.');
    }


    const camposPermitidos = [
        'statusAtendimento', 'statusPagamento', 
        'dataHoraInicioReal', 'dataHoraFimReal',
        'observacoesClinicas', 'laudoPath', 
        'valorCobrado', 'valorPago', 'funcionarioId' 
    ];
    const dadosValidos = {};
    for (const campo of camposPermitidos) {
        if (dadosParaAtualizar[campo] !== undefined) {
            dadosValidos[campo] = dadosParaAtualizar[campo];
        }
    }

    if (Object.keys(dadosValidos).length === 0) {
        throw new Error('Nenhum dado válido fornecido para atualização.');
    }
    
    return atendimento.update(dadosValidos);
};

module.exports = atualizarDadosAtendimentoServices;