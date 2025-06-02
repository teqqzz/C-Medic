// Imports dos Modelos
const Paciente = require('./pacienteModel');
const Exame = require('./exameModel');
const Material = require('./materialModel');
const Agenda = require('./agendaModel');
const Horario = require('./horarioModel');
const Agendamento = require('./agendamentoModel');
const Atendimento = require('./atendimentoModel');
const ContaReceber = require('./contaReceberModel');
const Funcionario = require('./funcionarioModel');
const Fornecedor = require('./fornecedorModel');
const CategoriaDespesa = require('./categoriaDespesaModel');
const ContaPagar = require('./contaPagarModel');

// --- Relacionamentos de Agendamento ---
Paciente.hasMany(Agendamento, { foreignKey: 'pacienteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Exame.hasMany(Agendamento, { foreignKey: 'exameId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamento.belongsTo(Exame, { foreignKey: 'exameId' });

Horario.hasOne(Agendamento, { foreignKey: 'horarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamento.belongsTo(Horario, { foreignKey: 'horarioId' });

// --- Relacionamento de Horário ---
Agenda.hasMany(Horario, { foreignKey: 'agendaId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Horario.belongsTo(Agenda, { foreignKey: 'agendaId' });

// --- Relacionamentos de Atendimento ---
Agendamento.hasOne(Atendimento, { foreignKey: 'agendamentoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Atendimento.belongsTo(Agendamento, { foreignKey: 'agendamentoId' });

Paciente.hasMany(Atendimento, { foreignKey: 'pacienteId', onDelete: 'NO ACTION', onUpdate: 'CASCADE' }); // Paciente não deve ser deletado se tiver atendimentos
Atendimento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Exame.hasMany(Atendimento, { foreignKey: 'exameId', onDelete: 'NO ACTION', onUpdate: 'CASCADE' }); // Exame não deve ser deletado se usado em atendimentos
Atendimento.belongsTo(Exame, { foreignKey: 'exameId' });

Material.hasMany(Atendimento, { foreignKey: 'materialId', onDelete: 'SET NULL', onUpdate: 'CASCADE' }); // Se material for deletado, atendimento não perde o registro
Atendimento.belongsTo(Material, { foreignKey: 'materialId' });

// --- Relacionamentos de ContaReceber ---
Atendimento.hasOne(ContaReceber, { foreignKey: 'atendimentoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Se atendimento for deletado, conta a receber também
ContaReceber.belongsTo(Atendimento, { foreignKey: 'atendimentoId' });

Paciente.hasMany(ContaReceber, { foreignKey: 'pacienteId', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
ContaReceber.belongsTo(Paciente, { foreignKey: 'pacienteId' });

// --- Relacionamentos de "Criado Por Funcionário" ---
Funcionario.hasMany(Exame, { foreignKey: 'funcionarioCriadorId', as: 'examesCriados' });
Exame.belongsTo(Funcionario, { foreignKey: 'funcionarioCriadorId', as: 'funcionarioCriador' });

Funcionario.hasMany(Material, { foreignKey: 'funcionarioCriadorId', as: 'materiaisCriadosPorFuncionario' });
Material.belongsTo(Funcionario, { foreignKey: 'funcionarioCriadorId', as: 'funcionarioQueCriou' });

Funcionario.hasMany(Paciente, { foreignKey: 'funcionarioCriadorId', as: 'pacientesCriados' });
Paciente.belongsTo(Funcionario, { foreignKey: 'funcionarioCriadorId', as: 'funcionarioCriador' });

Funcionario.hasMany(Atendimento, { foreignKey: 'funcionarioCriadorId', as: 'atendimentosCriados' });
Atendimento.belongsTo(Funcionario, { foreignKey: 'funcionarioCriadorId', as: 'funcionarioCriador' });

Funcionario.hasMany(Fornecedor, { foreignKey: 'funcionarioCriadorId', as: 'fornecedoresCriados' });
Fornecedor.belongsTo(Funcionario, { foreignKey: 'funcionarioCriadorId', as: 'funcionarioCriadorFornecedor' });

Funcionario.hasMany(CategoriaDespesa, { foreignKey: 'funcionarioCriadorId', as: 'categoriasDespesaCriadas' });
CategoriaDespesa.belongsTo(Funcionario, { foreignKey: 'funcionarioCriadorId', as: 'funcionarioCriadorCategoria' });

Funcionario.hasMany(ContaPagar, { foreignKey: 'funcionarioCriadorId', as: 'contasPagarCriadas' });
ContaPagar.belongsTo(Funcionario, { foreignKey: 'funcionarioCriadorId', as: 'funcionarioCriadorContaPagar' });

// --- Relacionamentos de Material com Fornecedor ---
Fornecedor.hasMany(Material, { foreignKey: 'fornecedorId', as: 'materiaisFornecidos', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Material.belongsTo(Fornecedor, { foreignKey: 'fornecedorId', as: 'fornecedorPrincipal' });

// --- Relacionamentos de ContaPagar ---
Fornecedor.hasMany(ContaPagar, { foreignKey: 'fornecedorId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' }); // Não deletar fornecedor se tiver contas a pagar
ContaPagar.belongsTo(Fornecedor, { foreignKey: 'fornecedorId', as: 'fornecedor' });

CategoriaDespesa.hasMany(ContaPagar, { foreignKey: 'categoriaDespesaId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' }); // Não deletar categoria se tiver contas
ContaPagar.belongsTo(CategoriaDespesa, { foreignKey: 'categoriaDespesaId', as: 'categoriaDespesa' });


// Exportando todos os modelos
module.exports = {
  Paciente,
  Exame,
  Material,
  Agenda,
  Horario,
  Agendamento,
  Atendimento,
  ContaReceber,
  Funcionario,
  Fornecedor,
  CategoriaDespesa,
  ContaPagar,
};
