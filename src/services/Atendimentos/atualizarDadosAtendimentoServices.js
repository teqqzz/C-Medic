const { Atendimento, ItemAtendimento, Material, Exame, Paciente, Funcionario, Agendamento, database } = require('../../models');
const registrarMovimentacaoEstoqueServices = require('../Estoque/registrarMovimentacaoEstoqueServices');
const gerarContaDeAtendimentoServices = require('../ContasReceber/gerarContaDeAtendimentoServices'); // NOVO

const atualizarDadosAtendimentoServices = async (id, dadosParaAtualizar) => {
    const t = await database.transaction();
    try {
        const atendimento = await Atendimento.findByPk(id, {
            include: [
                { model: ItemAtendimento, as: 'itens', include: [Material, Exame] },
                Paciente, // Para gerarContaDeAtendimentoServices
            ],
            transaction: t
        });

        if (!atendimento) throw new Error('Atendimento não encontrado.');

        const statusAnterior = atendimento.statusAtendimento;
        const novoStatusAtendimento = dadosParaAtualizar.statusAtendimento;
        const novoStatusPagamento = dadosParaAtualizar.statusPagamento;
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
        if (Object.keys(dadosValidos).length > 0) {
            await atendimento.update(dadosValidos, { transaction: t });
        } else if (novoStatusAtendimento && novoStatusAtendimento === statusAnterior) {
          
        } else if (!novoStatusAtendimento && Object.keys(dadosParaAtualizar).length > 0) {
            
        }
         else {
            throw new Error('Nenhum dado válido fornecido para atualização e nenhum status alterado.');
        }


        // Lógica de BAIXA DE ESTOQUE se o atendimento foi para "Realizado"
        if (novoStatusAtendimento === 'Realizado' && statusAnterior !== 'Realizado') {
            if (atendimento.itens && atendimento.itens.length > 0) {
                for (const item of atendimento.itens) {
                    if (item.materialId && item.Material) {
                        await registrarMovimentacaoEstoqueServices({
                            materialId: item.materialId,
                            tipoMovimentacao: 'Saída por Uso',
                            quantidade: item.quantidade,
                            funcionarioId: dadosParaAtualizar.funcionarioId || atendimento.funcionarioId || null,
                            observacao: `Uso no Atendimento ID: ${atendimento.id}, Item: ${item.Material.descricao}`
                        }, t); 
                    }
                }
            }
        }


        if (novoStatusAtendimento === 'Realizado' && 
            (atendimento.statusPagamento === 'Pendente' || (novoStatusPagamento && novoStatusPagamento === 'Pendente'))) {
            await gerarContaDeAtendimentoServices(atendimento.id, t); 
        }

        await t.commit();
        return atendimento.reload({
             include: [{ model: ItemAtendimento, as: 'itens', include: [Material, Exame] }, Paciente, Funcionario, Agendamento]
        });

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = atualizarDadosAtendimentoServices;