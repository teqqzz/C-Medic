const criarFornecedorServices = require('../../services/Fornecedor/criarFornecedorServices');

async function criarFornecedorController(req, res) {
  try {
    const { nomeFantasia, telefonePrincipal } = req.body; 
    if (!nomeFantasia || !telefonePrincipal) {
      return res.status(400).json({ erro: 'Campos nomeFantasia e telefonePrincipal são obrigatórios.' });
    }

    const funcionarioIdLogado = req.usuarioLogado ? req.usuarioLogado.id : null;

    const novoFornecedor = await criarFornecedorServices(req.body, funcionarioIdLogado);
    res.status(201).json(novoFornecedor);
  } catch (error) {
    console.error("Erro no controller ao criar fornecedor:", error.message);
    if (error.message.includes('já cadastrado') || error.message.includes('já existe')) {
        return res.status(409).json({ erro: error.message }); 
    }
    if (error.name === 'SequelizeValidationError') { 
        return res.status(400).json({ erro: error.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ erro: 'Erro interno ao criar fornecedor.' });
  }
}

module.exports = criarFornecedorController;
