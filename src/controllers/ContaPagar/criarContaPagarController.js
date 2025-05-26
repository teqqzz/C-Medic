const criarContaPagarServices = require('../../services/ContaPagar/criarContaPagarServices');

async function criarContaPagarController(req, res) {
  try {
    const { descricao, fornecedorId, categoriaDespesaId, valorTotal, dataVencimento } = req.body;
    // Validação básica de campos obrigatórios
    if (!descricao || !fornecedorId || !categoriaDespesaId || valorTotal === undefined || !dataVencimento) {
      return res.status(400).json({ erro: 'Campos descricao, fornecedorId, categoriaDespesaId, valorTotal e dataVencimento são obrigatórios.' });
    }
    if (isNaN(parseFloat(valorTotal)) || parseFloat(valorTotal) <= 0) {
        return res.status(400).json({ erro: 'Valor total deve ser um número positivo.' });
    }

    const funcionarioIdLogado = req.usuarioLogado ? req.usuarioLogado.id : null;

    const novaConta = await criarContaPagarServices(req.body, funcionarioIdLogado);
    res.status(201).json(novaConta);
  } catch (error) {
    console.error("Erro no controller ao criar conta a pagar:", error.message);
    if (error.message.includes('não encontrado') || error.message.includes('obrigatório') || error.message.includes('formato') || error.message.includes('inválida')) {
        return res.status(400).json({ erro: error.message });
    }
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: error.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ erro: 'Erro interno ao criar conta a pagar.' });
  }
}

module.exports = criarContaPagarController;
