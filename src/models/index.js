// src/models/index.js
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

// Modelos
const Paciente = require('./pacienteModel');
const Exame = require('./exameModel');
const Material = require('./materialModel');
const Agenda = require('./agendaModel');
const Horario = require('./horarioModel');
const Agendamento = require('./agendamentoModel');
const Funcionario = require('./funcionarioModel');
const Atendimento = require('./atendimentoModel');
const ItemAtendimento = require('./itemAtendimentoModel');
const MovimentacaoEstoque = require('./movimentacaoEstoqueModel');
const Cargo = require('./cargoModel');                 
const ContaReceber = require('./contaReceberModel');  
const Fornecedor = require('./fornecedorModel');     
const LoteMaterial = require('./loteMaterialModel'); 
const CategoriaDespesa = require('./categoriaDespesaModel');
const ContaPagar = require('./contaPagarModel');

// --- ASSOCIAÇÕES ---

// Cargo <-> Funcionario
Cargo.hasMany(Funcionario, { foreignKey: 'cargoId', allowNull: true }); 
Funcionario.belongsTo(Cargo, { foreignKey: 'cargoId', allowNull: true });

// Agendamento
Paciente.hasMany(Agendamento, { foreignKey: 'pacienteId' });
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId' });
Exame.hasMany(Agendamento, { foreignKey: 'exameId' });
Agendamento.belongsTo(Exame, { foreignKey: 'exameId' });
Horario.hasOne(Agendamento, { foreignKey: 'horarioId' });
Agendamento.belongsTo(Horario, { foreignKey: 'horarioId' });
Agenda.hasMany(Horario, { foreignKey: 'agendaId' });
Horario.belongsTo(Agenda, { foreignKey: 'agendaId' });

// Atendimento
Agendamento.hasOne(Atendimento, { as: 'atendimentoRealizado', foreignKey: 'agendamentoId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Atendimento.belongsTo(Agendamento, { as: 'agendamentoOriginal', foreignKey: 'agendamentoId' });
Paciente.hasMany(Atendimento, { foreignKey: 'pacienteId' });
Atendimento.belongsTo(Paciente, { foreignKey: 'pacienteId', allowNull: false });
Funcionario.hasMany(Atendimento, { foreignKey: 'funcionarioId' });
Atendimento.belongsTo(Funcionario, { foreignKey: 'funcionarioId', allowNull: true });

// ItemAtendimento
Atendimento.hasMany(ItemAtendimento, { as: 'itens', foreignKey: 'atendimentoId', onDelete: 'CASCADE' });
ItemAtendimento.belongsTo(Atendimento, { foreignKey: 'atendimentoId' });
Exame.hasMany(ItemAtendimento, { foreignKey: 'exameId', allowNull: true });
ItemAtendimento.belongsTo(Exame, { foreignKey: 'exameId', allowNull: true });
Material.hasMany(ItemAtendimento, { foreignKey: 'materialId', allowNull: true });
ItemAtendimento.belongsTo(Material, { foreignKey: 'materialId', allowNull: true });

// MovimentacaoEstoque
Material.hasMany(MovimentacaoEstoque, { foreignKey: 'materialId' });
MovimentacaoEstoque.belongsTo(Material, { foreignKey: 'materialId', allowNull: false });
Funcionario.hasMany(MovimentacaoEstoque, { foreignKey: 'funcionarioId' });
MovimentacaoEstoque.belongsTo(Funcionario, { foreignKey: 'funcionarioId', allowNull: true });
LoteMaterial.hasMany(MovimentacaoEstoque, { foreignKey: 'loteMaterialId', allowNull: true }); 
MovimentacaoEstoque.belongsTo(LoteMaterial, { foreignKey: 'loteMaterialId', allowNull: true });

// ContaReceber
Atendimento.hasMany(ContaReceber, { foreignKey: 'atendimentoId', allowNull: true });
ContaReceber.belongsTo(Atendimento, { foreignKey: 'atendimentoId', allowNull: true });
Paciente.hasMany(ContaReceber, { foreignKey: 'pacienteId', allowNull: false });
ContaReceber.belongsTo(Paciente, { foreignKey: 'pacienteId' });

// ContaPagar
Fornecedor.hasMany(ContaPagar, { foreignKey: 'fornecedorId', allowNull: true });
ContaPagar.belongsTo(Fornecedor, { foreignKey: 'fornecedorId', allowNull: true });
Funcionario.hasMany(ContaPagar, { foreignKey: 'funcionarioId', allowNull: true }); 
ContaPagar.belongsTo(Funcionario, { foreignKey: 'funcionarioId', allowNull: true });
CategoriaDespesa.hasMany(ContaPagar, { foreignKey: 'categoriaDespesaId', allowNull: false });
ContaPagar.belongsTo(CategoriaDespesa, { foreignKey: 'categoriaDespesaId' });

module.exports = {
  database,
  Paciente,
  Exame,
  Material,
  Agenda,
  Horario,
  Agendamento,
  Funcionario,
  Atendimento,
  ItemAtendimento,
  MovimentacaoEstoque,
  Cargo,
  ContaReceber,
  Fornecedor,     
  LoteMaterial,
  CategoriaDespesa,
  ContaPagar,
};
