const express = require('express');
const mongoose = require('./config/database');
const pacienteRoutes = require('./routes/pacienteRoutes'); // Importando as rotas do paciente

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Habilita o uso de JSON no body das requisições

// Rotas
app.use('/pacientes', pacienteRoutes); // Rota para pacientes

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});