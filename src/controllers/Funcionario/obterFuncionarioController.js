const obterFuncionarioService = require('../../services/Funcionario/obterFuncionarioService');

async function obterFuncionarioController(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID do funcionário inválido.' });
    }
    const funcionario = await obterFuncionarioService(parseInt(id, 10));
    if (!funcionario) {
      return res.status(404).json({ mensagem: `Funcionário com ID ${id} não encontrado.` });
    }
    res.status(200).json(funcionario);
  } catch (error) {
    console.error("Erro no controller ao obter funcionário:", error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar detalhes do funcionário.' });
  }
}

module.exports = obterFuncionarioController;
