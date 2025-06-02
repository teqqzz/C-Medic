const deletarFuncionarioServices = require('../../services/Funcionario/deletarFuncionarioServices');

async function deletarFuncionarioController(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID do funcionário inválido.' });
    }
    const resultado = await deletarFuncionarioServices(parseInt(id, 10));
    if (resultado === 0) {
      return res.status(404).json({ mensagem: `Funcionário com ID ${id} não encontrado.` });
    }
    res.status(200).json({ mensagem: `Funcionário com ID ${id} deletado com sucesso.` });
  } catch (error) {
    console.error("Erro no controller ao deletar funcionário:", error.message);
    if (error.message.includes('Não é possível deletar')) {
        return res.status(409).json({ erro: error.message }); 
    }
    res.status(500).json({ erro: 'Erro interno ao deletar funcionário.' });
  }
}

module.exports = deletarFuncionarioController;
