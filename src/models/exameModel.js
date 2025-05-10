const mongoose = require('../config/database');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const exameSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  codigo: { type: Number, required: true },

});

// Usar o mongoose-sequence para auto incrementar o campo 'id'
exameSchema.plugin(mongooseSequence, { inc_field: 'id' });

// Criar o modelo baseado no esquema
const Exame = mongoose.model('Exame', exameSchema);

module.exports = Exame;