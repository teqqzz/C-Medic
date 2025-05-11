const mongoose = require('../config/database');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const exameSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  codigo: { type: Number, required: true },
  valor: { type: Number, required: true },
  criadoEm: { type: Date, default: Date.now },
  criadoPor: { type: String, required: true }

});

// autoincremento do campo id
exameSchema.plugin(mongooseSequence, { inc_field: 'exameid' });

// Criar o modelo baseado no esquema
const Exame = mongoose.model('Exame', exameSchema);

module.exports = Exame;