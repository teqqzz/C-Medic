const express = require('express');
const { database, createDatabaseIfNotExists } = require('./src/config/database');

const pacienteRoutes = require('./src/routes/pacienteRoutes');
const exameRoutes = require('./src/routes/exameRoutes');
const materialRoutes = require('./src/routes/materialRoutes');
const agendamentoRoutes = require('./src/routes/agendamentoRoutes');
const funcionarioRoutes = require('./src/routes/funcionarioRoutes');
const atendimentoRoutes = require('./src/routes/atendimentoRoutes');
const estoqueRoutes = require('./src/routes/estoqueRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/pacientes', pacienteRoutes);
app.use('/exames', exameRoutes);
app.use('/materiais', materialRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/atendimentos', atendimentoRoutes);
app.use('/estoque', estoqueRoutes);

async function startServer() {
  await createDatabaseIfNotExists();

  try {
    await database.authenticate();
    console.log('Conectado ao MySQL com sucesso!');
    require('./src/models');
    await database.sync({ alter: true, force: false });

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar no MySQL:', error);
  }
}

startServer();