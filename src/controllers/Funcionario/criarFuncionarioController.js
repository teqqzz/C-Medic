const criarFuncionarioServices = require('../../services/Funcionario/criarFuncionarioServices');

async function criarFuncionarioController(req, res) {
  try {
    const camposObrigatorios = ['nomeCompleto', 'dataNascimento', 'cpf', 'email', 'cargo', 'dataAdmissao', 'telefoneCelular'];
    for (const campo of camposObrigatorios) {
      if (!req.body[campo]) {
        return res.status(400).json({ erro: `O campo '${campo}' é obrigatório.` });
      }
    }

    const novoFuncionario = await criarFuncionarioServices(req.body);
    res.status(201).json(novoFuncionario);
  } catch (error) {
    console.error("Erro no controller ao criar funcionário:", error.message);
    if (error.message.includes('já cadastrado') || error.message.includes('já pertence')) {
        return res.status(409).json({ erro: error.message }); // 409 Conflict
    }
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: error.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ erro: 'Erro interno ao criar funcionário.' });
  }
}

module.exports = criarFuncionarioController;
