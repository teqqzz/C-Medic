const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const Paciente = require('./pacienteModel');
const Exame = require('./exameModel');
const Material = require('./materialModel');
const Agenda = require('./agendaModel');
const Horario = require('./horarioModel');
const Agendamento = require('./agendamentoModel');
const ItemCarrinho = require('./itemCarrinhoModel');
const Funcionario = require('./funcionarioModel');
const Atendimento = require('./atendimentoModel');
const MovimentacaoEstoque = require('./movimentacaoEstoqueModel');


// Relacionamentos: Agendamento
Paciente.hasMany(Agendamento, { foreignKey: 'pacienteId' });
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Exame.hasMany(Agendamento, { foreignKey: 'exameId' });
Agendamento.belongsTo(Exame, { foreignKey: 'exameId' });

Horario.hasOne(Agendamento, { foreignKey: 'horarioId' });
Agendamento.belongsTo(Horario, { foreignKey: 'horarioId' });

// Relacionamento: Horário
Agenda.hasMany(Horario, { foreignKey: 'agendaId' });
Horario.belongsTo(Agenda, { foreignKey: 'agendaId' });



// Relacionamento: Funcionário
Agendamento.hasOne(Atendimento, { foreignKey: 'agendamentoId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Atendimento.belongsTo(Agendamento, { foreignKey: 'agendamentoId' });

Funcionario.hasMany(Atendimento, { foreignKey: 'funcionarioId' }); 
Atendimento.belongsTo(Funcionario, { foreignKey: 'funcionarioId', allowNull: true }); 

Paciente.hasMany(Atendimento, { foreignKey: 'pacienteId' }); 
Atendimento.belongsTo(Paciente, { foreignKey: 'pacienteId', allowNull: false });

Exame.hasMany(Atendimento, { foreignKey: 'exameId' });
Atendimento.belongsTo(Exame, { foreignKey: 'exameId', allowNull: false });

// Relacionamento: Movimentação de Estoque
Material.hasMany(MovimentacaoEstoque, { foreignKey: 'materialId' });
MovimentacaoEstoque.belongsTo(Material, { foreignKey: 'materialId', allowNull: false });

Funcionario.hasMany(MovimentacaoEstoque, { foreignKey: 'funcionarioId' }); 
MovimentacaoEstoque.belongsTo(Funcionario, { foreignKey: 'funcionarioId', allowNull: true });


// Exportando os models
module.exports = {
  database,
  Paciente,
  Exame,
  Material,
  Agenda,
  Horario,
  Agendamento,
  ItemCarrinho,
  Funcionario,     
  Atendimento,     
  MovimentacaoEstoque 
};