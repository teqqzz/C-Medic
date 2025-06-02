const atualizarFuncionarioServices = require('../../services/Funcionario/atualizarFuncionarioServices');

async function atualizarFuncionarioController(req, res) {
  try {
    const { id } = req.params;
     if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ erro: 'ID do funcionário inválido.' });
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: 'Nenhum dado fornecido para atualização.' });
    }

    const funcionarioAtualizado = await atualizarFuncionarioServices(parseInt(id, 10), req.body);

    if (!funcionarioAtualizado) {
      return res.status(404).json({ mensagem: `Funcionário com ID ${id} não encontrado.` });
    }
    res.status(200).json(funcionarioAtualizado);
  } catch (error) {
    console.error("Erro no controller ao atualizar funcionário:", error.message);
    if (error.message.includes('já pertence') || error.message.includes('inválido')) {
        return res.status(409).json({ erro: error.message }); // 409 Conflict
    }
     if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: error.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ erro: 'Erro interno ao atualizar funcionário.' });
  }
}

module.exports = atualizarFuncionarioController;
