const mongoose = require('../config/database');
const mongooseSequence = require('mongoose-sequence')(mongoose);

// Definir o esquema do paciente
const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  datanascimento: { type: Number, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  endereco: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  criadoPor: { type: String, required: true }
});

// Usar o mongoose-sequence para auto incrementar o campo 'id'
pacienteSchema.plugin(mongooseSequence, { inc_field: 'pacienteid' });

// Criar o modelo baseado no esquema
const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;