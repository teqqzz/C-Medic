const mongoose = require("../config/database");
const mongooseSequence = require("mongoose-sequence")(mongoose);

consta materialSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    codigo: { type: Number, required: true },
    valor: { type: Number, required: true },
    criadoEm: { type: Date, default: Date.now },
    criadoPor: { type: String, required: true },
})
// autoincremento do campo id
materialSchema.plugin(mongooseSequence, { inc_field: "materialid" });
// Criar o modelo baseado no esquema
const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
