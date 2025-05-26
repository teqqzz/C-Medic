// src/services/ContasReceber/criarContaReceberServices.js
const { ContaReceber, Paciente, Atendimento } = require('../../models');

const criarContaReceberServices = async (dadosConta) => {
    const {
        pacienteId,
        atendimentoId, 
        descricao,
        valorTotalAReceber,
        dataVencimento,
        status, 
        observacoes
    } = dadosConta;


    if (!pacienteId) {
        throw new Error("O ID do Paciente (pacienteId) é obrigatório.");
    }
    if (!descricao || descricao.trim() === "") {
        throw new Error("A Descrição da conta é obrigatória.");
    }
    if (valorTotalAReceber === undefined || isNaN(parseFloat(valorTotalAReceber)) || parseFloat(valorTotalAReceber) <= 0) {
        throw new Error("O Valor Total a Receber é obrigatório e deve ser um número positivo.");
    }

    // Validar existência do Paciente
    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
        throw new Error(`Paciente com ID ${pacienteId} não encontrado.`);
    }

    // Validar existência do Atendimento, se fornecido
    if (atendimentoId) {
        const atendimento = await Atendimento.findByPk(atendimentoId);
        if (!atendimento) {
            throw new Error(`Atendimento com ID ${atendimentoId} não encontrado.`);
        }

    }

  
    const dadosParaCriar = {
        pacienteId,
        atendimentoId: atendimentoId || null,
        descricao,
        valorTotalAReceber: parseFloat(valorTotalAReceber),
        dataVencimento: dataVencimento || null, 
        status: status || 'Pendente', 
        observacoes: observacoes || null,
        valorRecebido: 0, 
    };

    const novaConta = await ContaReceber.create(dadosParaCriar);

    return novaConta;
};

module.exports = criarContaReceberServices;
