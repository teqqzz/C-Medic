
const { Agendamento, Horario, Agenda, Exame, Paciente, Atendimento, ItemAtendimento, Material, database } = require('../../models');
const { Op } = require('sequelize');

async function agendarHorariosServices({
    pacienteId,
    horariosIds,
    examePrincipalId,
    itensParaAtendimento,
    observacoes,
    funcionarioIdLogado
}) {
    if (!pacienteId || !horariosIds || !Array.isArray(horariosIds) || horariosIds.length === 0 || !examePrincipalId || !itensParaAtendimento || !Array.isArray(itensParaAtendimento) || itensParaAtendimento.length === 0) {
        throw new Error('Campos pacienteId, horariosIds, examePrincipalId e itensParaAtendimento (array não vazio) são obrigatórios.');
    }

    const t = await database.transaction();
    try {
        const paciente = await Paciente.findByPk(pacienteId, { transaction: t });
        if (!paciente) throw new Error(`Paciente com ID ${pacienteId} não encontrado.`);

        const examePrincipal = await Exame.findByPk(examePrincipalId, { transaction: t });
        if (!examePrincipal) throw new Error(`Exame principal com ID ${examePrincipalId} não encontrado.`);

        const resultadosFinais = [];
        let valorTotalAtendimentoCalculado = 0;

        const itensValidadosComPreco = [];
        for (const itemInput of itensParaAtendimento) {
            if (!itemInput.tipo || !itemInput.id || !itemInput.quantidade || Number(itemInput.quantidade) <= 0) {
                throw new Error('Cada item para atendimento deve ter tipo, id e quantidade positiva.');
            }
            let itemDB;
            let precoUnitario;
            let descricaoItem;
            if (itemInput.tipo.toLowerCase() === 'exame') {
                itemDB = await Exame.findByPk(itemInput.id, { transaction: t });
                if (!itemDB) throw new Error(`Exame item com ID ${itemInput.id} não encontrado.`);
                precoUnitario = itemDB.valor;
                descricaoItem = itemDB.descricao;
            } else if (itemInput.tipo.toLowerCase() === 'material') {
                itemDB = await Material.findByPk(itemInput.id, { transaction: t });
                if (!itemDB) throw new Error(`Material item com ID ${itemInput.id} não encontrado.`);
                // NÃO VERIFICAR ESTOQUE AQUI, APENAS PEGAR O PREÇO. A VERIFICAÇÃO SERÁ NA FINALIZAÇÃO DO ATENDIMENTO.
                precoUnitario = itemDB.valor;
                descricaoItem = itemDB.descricao;
            } else {
                throw new Error(`Tipo de item inválido: ${itemInput.tipo}. Use 'exame' ou 'material'.`);
            }
            valorTotalAtendimentoCalculado += precoUnitario * Number(itemInput.quantidade);
            itensValidadosComPreco.push({
                tipo: itemInput.tipo.toLowerCase(),
                idOriginal: itemInput.id,
                quantidade: Number(itemInput.quantidade),
                valorUnitarioRegistrado: precoUnitario,
                descricaoItem: descricaoItem
            });
        }

        for (const horarioId of horariosIds) {
            const horario = await Horario.findByPk(horarioId, { include: [Agenda], transaction: t });

            if (!horario) throw new Error(`Horário com ID ${horarioId} não encontrado.`);
            if (horario.status !== 'Aberto') {
                throw new Error(`Horário ${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()} não está disponível (Status: ${horario.status}).`);
            }
            const agendamentoExistenteParaPacienteNoHorario = await Agendamento.findOne({
                where: { pacienteId: pacienteId, horarioId: horarioId },
                include: [{ model: Horario, where: { status: { [Op.ne]: 'Cancelado' } } }],
                transaction: t
            });
            if (agendamentoExistenteParaPacienteNoHorario) {
                 throw new Error(`Paciente já possui um agendamento não cancelado neste horário (${horario.hora} do dia ${new Date(horario.Agenda.data).toLocaleDateString()}).`);
            }

            const novoAgendamento = await Agendamento.create({
                pacienteId,
                horarioId,
                exameId: examePrincipalId,
                observacoes
            }, { transaction: t });

            await horario.update({ status: 'Marcado' }, { transaction: t });

            const novoAtendimento = await Atendimento.create({
                agendamentoId: novoAgendamento.id,
                pacienteId: paciente.id,
                funcionarioId: funcionarioIdLogado || null,
                valorCobrado: valorTotalAtendimentoCalculado,
                statusAtendimento: 'Agendado',
                statusPagamento: 'Pendente',
            }, { transaction: t });

            const itensAtendimentoCriados = [];
            for (const itemValidado of itensValidadosComPreco) {
                const itemCriado = await ItemAtendimento.create({
                    atendimentoId: novoAtendimento.id,
                    exameId: itemValidado.tipo === 'exame' ? itemValidado.idOriginal : null,
                    materialId: itemValidado.tipo === 'material' ? itemValidado.idOriginal : null,
                    quantidade: itemValidado.quantidade,
                    valorUnitarioRegistrado: itemValidado.valorUnitarioRegistrado,
                    descricaoItem: itemValidado.descricaoItem,
                }, { transaction: t });
                itensAtendimentoCriados.push(itemCriado);
            }

            resultadosFinais.push({
                agendamento: novoAgendamento.toJSON(),
                atendimento: { ...novoAtendimento.toJSON(), itens: itensAtendimentoCriados.map(i => i.toJSON()) },
                detalhesVisuais: {
                    pacienteNome: paciente.nome,
                    examePrincipalDescricao: examePrincipal.descricao,
                    data: horario.Agenda.data,
                    hora: horario.hora,
                    statusHorarioFinal: 'Marcado',
                }
            });
        }

        await t.commit();
        return resultadosFinais;

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

module.exports = agendarHorariosServices;
