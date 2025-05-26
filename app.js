// Importações principais
const express = require('express');
const cors = require('cors'); // Adicionado para Cross-Origin Resource Sharing

const { database, createDatabaseIfNotExists } = require('./src/config/database'); 

require('./src/models'); 

// Importação dos arquivos de rotas
const agendamentoRoutes = require('./src/routes/agendamentoRoutes');
const pacienteRoutes = require('./src/routes/pacienteRoutes');
const exameRoutes = require('./src/routes/exameRoutes');
const materialRoutes = require('./src/routes/materialRoutes');
const funcionarioRoutes = require('./src/routes/funcionarioRoutes');
const fornecedorRoutes = require('./src/routes/fornecedorRoutes');
const categoriaDespesaRoutes = require('./src/routes/categoriaDespesaRoutes'); 
const contaPagarRoutes = require('./src/routes/contaPagarRoutes');
const atendimentoRoutes = require('./src/routes/atendimentoRoutes');
const contaReceberRoutes = require('./src/routes/contaReceberRoutes');
const relatoriosRoutes = require('./src/routes/relatoriosRoutes');

// Inicialização do aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Rota de teste básica
app.get('/', (req, res) => {
  res.send('API da C-Medic Funcionando Corretamente!');
});

// Montagem das Rotas Modulares
app.use('/agendamentos', agendamentoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/exames', exameRoutes);
app.use('/materiais', materialRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/fornecedores', fornecedorRoutes); 
app.use('/categorias-despesa', categoriaDespesaRoutes); 
app.use('/contas-pagar', contaPagarRoutes);
app.use('/atendimentos', atendimentoRoutes);
app.use('/contas-receber', contaReceberRoutes);
app.use('/relatorios', relatoriosRoutes);



app.use((req, res, next) => {
  res.status(404).json({ erro: 'Ops! A rota que você tentou acessar não existe.' });
});


app.use((error, req, res, next) => {
  console.error("ERRO INESPERADO NA APLICAÇÃO:", error); 
  const status = error.status || 500;
  const mensagem = error.message || 'Ocorreu um erro interno inesperado no servidor.';
  

  res.status(status).json({ erro: mensagem });
});


// Função para iniciar o servidor e sincronizar o banco de dados
async function startServer() {
  try {
    // 1. Garante que o banco de dados exista (se a função estiver configurada para isso)
    if (createDatabaseIfNotExists) { // Verifica se a função foi importada
        console.log('Verificando/Criando banco de dados cmedic (se necessário)...');
        await createDatabaseIfNotExists();
        console.log('Banco de dados cmedic pronto.');
    }

    // 2. Autentica a conexão com o banco de dados
    await database.authenticate();
    console.log('Conexão com o MySQL estabelecida com sucesso!');

    // 3. Sincroniza os modelos com o banco de dados
    await database.sync({ alter: true, force: false }); 
    console.log('Modelos sincronizados com o banco de dados.');

    // 4. Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor ou conectar ao banco de dados:', error);
    process.exit(1); 
  }
}

// Inicia o servidor
startServer();
