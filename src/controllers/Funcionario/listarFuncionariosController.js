const listarFuncionariosServices = require('../../services/Funcionario/listarFuncionariosServices');

async function listarFuncionariosController(req, res) {
  try {
    const { nome, cpf, cargo, status } = req.query;
    const funcionarios = await listarFuncionariosServices({ nome, cpf, cargo, status });
    if (funcionarios.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum funcionário encontrado com os filtros aplicados.", data: [] });
    }
    res.status(200).json(funcionarios);
  } catch (error) {
    console.error("Erro no controller ao listar funcionários:", error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar funcionários.' });
  }
}

module.exports = listarFuncionariosController;
