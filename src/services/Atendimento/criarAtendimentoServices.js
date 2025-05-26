const {
  Agendamento,
  Paciente,
  Exame,
  Material,
  Atendimento,
  ContaReceber,
  Horario,
  Agenda,
  Funcionario 
} = require('../../models');
const { database } = require('../../config/database');
const { addDays, format } = require('date-fns');

async function criarAtendimentoServices({ agendamentoId, materialId, descricaoAtendimento }, funcionarioIdCriador) {
  const t = await database.transaction();
  try {
    const agendamento = await Agendamento.findByPk(agendamentoId, {
      include: [
        { model: Paciente, required: true },
        { model: Exame, required: true },
        {
          model: Horario,
          required: true,
          include: [{ model: Agenda, required: true }],
        },
      ],
      transaction: t,
    });

    if (!agendamento) {
      throw new Error(`Agendamento com ID ${agendamentoId} não encontrado.`);
    }
    if (agendamento.Horario.status !== 'Marcado') {
      throw new Error(`Agendamento com ID ${agendamentoId} não está com status 'Marcado'. Status atual: ${agendamento.Horario.status}.`);
    }
    const atendimentoExistente = await Atendimento.findOne({ where: { agendamentoId }, transaction: t });
    if (atendimentoExistente) {
      throw new Error(`Já existe um atendimento registrado para o agendamento ID ${agendamentoId}.`);
    }

    let nomeCriador = "Sistema";
    let idFuncionarioParaSalvar = null;
    if (funcionarioIdCriador) {
      const funcionario = await Funcionario.findByPk(funcionarioIdCriador, { transaction: t });
      if (funcionario) {
        nomeCriador = funcionario.nomeCompleto;
        idFuncionarioParaSalvar = funcionarioIdCriador;
      } else {
        console.warn(`Funcionário criador com ID ${funcionarioIdCriador} não encontrado para o atendimento. Atribuindo 'Sistema'.`);
      }
    }

    let materialObj = null;
    let valorMaterial = 0;
    if (materialId) {
      materialObj = await Material.findByPk(materialId, { transaction: t });
      if (!materialObj) {
        throw new Error(`Material com ID ${materialId} não encontrado.`);
      }
      valorMaterial = materialObj.valor;
    }

    const dataAtendimento = agendamento.Horario.Agenda.data;
    const valorExame = agendamento.Exame.valor;
    const valorTotal = valorExame + valorMaterial;

    const dadosNovoAtendimento = {
      agendamentoId: agendamento.id,
      pacienteId: agendamento.pacienteId,
      exameId: agendamento.exameId,
      materialId: materialObj ? materialObj.id : null,
      dataAtendimento,
      descricaoAtendimento,
      valorExame,
      valorMaterial,
      valorTotal,
      statusPagamento: 'Pendente',
      criadoPor: nomeCriador,
      funcionarioCriadorId: idFuncionarioParaSalvar,
    };

    const novoAtendimento = await Atendimento.create(dadosNovoAtendimento, { transaction: t });

    const dataVencimentoConta = format(addDays(new Date(dataAtendimento), 30), 'yyyy-MM-dd');
    const descricaoConta = `Atendimento #${novoAtendimento.id} - Paciente: ${agendamento.Paciente.nome} - Exame: ${agendamento.Exame.descricao}${materialObj ? ', Material: ' + materialObj.descricao : ''}`;

    const novaContaReceber = await ContaReceber.create({
      atendimentoId: novoAtendimento.id,
      pacienteId: agendamento.pacienteId,
      descricao: descricaoConta,
      valor: valorTotal,
      dataEmissao: dataAtendimento,
      dataVencimento: dataVencimentoConta,
      status: 'Pendente',
    }, { transaction: t });

    await agendamento.Horario.update({ status: 'Realizado' }, { transaction: t });

    await t.commit();
    const atendimentoCompleto = await Atendimento.findByPk(novoAtendimento.id, {
        include: [
            { model: Paciente },
            { model: Exame },
            { model: Material, required: false }, 
            { model: Funcionario, as: 'funcionarioCriador', attributes: ['id', 'nomeCompleto'] }
        ]
    });


    return {
      atendimento: atendimentoCompleto,
      contaReceber: novaContaReceber.toJSON(),
    };
  } catch (error) {
    await t.rollback();
    console.error('Erro ao criar atendimento no serviço:', error.message);
    if (error.name === 'SequelizeValidationError') {
        throw new Error(`Erro de validação ao criar atendimento: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
}

module.exports = criarAtendimentoServices;
