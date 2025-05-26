const { ContaReceber, Atendimento, Paciente, database } = require('../../models');

const gerarContaDeAtendimentoServices = async (atendimentoId, transaction = null) => {
    const t = transaction || await database.transaction();
    try {
        const atendimento = await Atendimento.findByPk(atendimentoId, {
            include: [Paciente],
            transaction: t
        });

        if (!atendimento) {
            throw new Error('Atendimento não encontrado para gerar conta a receber.');
        }
        if (!atendimento.Paciente) {
            throw new Error('Paciente não encontrado para o atendimento.');
        }
        if (atendimento.statusPagamento !== 'Pendente' && atendimento.statusPagamento !== 'Pago Parcialmente') {
            console.warn(`Tentativa de gerar conta para atendimento ${atendimentoId} com status de pagamento ${atendimento.statusPagamento}.`);

        }
         if (atendimento.valorCobrado <= 0) {
            console.warn(`Atendimento ${atendimentoId} com valor cobrado zero ou negativo. Nenhuma conta a receber será gerada.`);
            if (!transaction) await t.commit(); 
            return null;
        }


        let contaExistente = await ContaReceber.findOne({
            where: { atendimentoId: atendimento.id },
            transaction: t
        });

        if (contaExistente) {
            console.log(`Conta a receber já existe para o atendimento ID ${atendimento.id}.`);
            if (!transaction) await t.commit();
            return contaExistente;
        }

        const descricaoConta = `Referente ao atendimento #${atendimento.id} - Paciente: ${atendimento.Paciente.nome}`;
        const valorAReceber = atendimento.valorCobrado - (atendimento.valorPago || 0);

        if (valorAReceber <= 0) {
             console.warn(`Atendimento ${atendimentoId} já está pago ou com valor a receber zero. Nenhuma conta a receber será gerada.`);
             if (!transaction) await t.commit();
             return null;
        }

        const novaConta = await ContaReceber.create({
            atendimentoId: atendimento.id,
            pacienteId: atendimento.pacienteId,
            descricao: descricaoConta,
            valorTotalAReceber: valorAReceber,
   
            status: 'Pendente',
        }, { transaction: t });

        if (!transaction) await t.commit(); 
        return novaConta;

    } catch (error) {
        if (!transaction) await t.rollback(); 
        throw error;
    }
};

module.exports = gerarContaDeAtendimentoServices;