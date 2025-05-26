const criarPacienteServices = require('../../services/Pacientes/criarPacienteServices');

const criarPacienteController = async (req, res) => {
  try {
    const { nome, datanascimento, email, cpf, endereco } = req.body;

    
    if (!nome || !datanascimento) { 
        return res.status(400).json({ erro: 'Campos nome e datanascimento são obrigatórios.'});
    }

    const funcionarioIdLogado = req.usuarioLogado ? req.usuarioLogado.id : null;

    const dadosPaciente = { nome, datanascimento, email, cpf, endereco };

    const novoPaciente = await criarPacienteServices(dadosPaciente, funcionarioIdLogado);
    res.status(201).json(novoPaciente);
  } catch (error) {
    console.error('Erro no controller ao criar paciente:', error.message);
    if (error.message.includes('já cadastrado')) {
        return res.status(409).json({ erro: error.message }); 
    }
    if (error.message.startsWith('Erro de validação')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ mensagem: 'Erro interno ao criar paciente', erro: error.message });
  }
};

module.exports = criarPacienteController;
