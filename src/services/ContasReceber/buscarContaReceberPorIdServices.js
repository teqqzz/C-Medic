const { ContaReceber, Paciente, Atendimento, ItemAtendimento, Exame, Material } = require('../../models');

const buscarContaReceberPorIdServices = async (id) => {
    const conta = await ContaReceber.findByPk(id, {
        include: [
            { model: Paciente, attributes: ['id', 'nome', 'cpf', 'email'] },
            {
                model: Atendimento,
                attributes: ['id', 'dataHoraInicioReal', 'statusAtendimento', 'valorCobrado'],
                include: [{
                    model: ItemAtendimento,
                    as: 'itens',
                    attributes: ['quantidade', 'valorUnitarioRegistrado', 'descricaoItem'],
                    include: [
                        { model: Exame, attributes: ['descricao'] },
                        { model: Material, attributes: ['descricao'] }
                    ]
                }]
            }
        ]
    });
    return conta;
};

module.exports = buscarContaReceberPorIdServices;