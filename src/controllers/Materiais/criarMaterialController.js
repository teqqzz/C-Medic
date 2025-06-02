const criarMaterialServices = require('../../services/Materiais/criarMaterialServices');

const criarMaterialController = async (req, res) => {
  try {
    const { descricao, tipo, codigo, valor, quantidade, vencimento, unidadeMedida, pontoPedido, fornecedorId } = req.body;

    if (!descricao || !tipo || !codigo || valor === undefined || quantidade === undefined) {
        return res.status(400).json({ erro: 'Campos descricao, tipo, codigo, valor e quantidade são obrigatórios.'});
    }

    const funcionarioIdLogado = req.usuarioLogado ? req.usuarioLogado.id : null;

    const dadosMaterial = {
        descricao,
        tipo,
        codigo, 
        valor: parseFloat(valor),
        quantidade: parseInt(quantidade),
        vencimento: vencimento || null, 
        unidadeMedida: unidadeMedida || null,
        pontoPedido: pontoPedido ? parseInt(pontoPedido) : null,
        fornecedorId: fornecedorId ? parseInt(fornecedorId) : null
    };

    const materialSalvo = await criarMaterialServices(dadosMaterial, funcionarioIdLogado);
    res.status(201).json(materialSalvo);
  } catch (error) {
    console.error('Erro no controller ao criar material:', error.message);
    if (error.message.startsWith('Código de material') || error.message.startsWith('Fornecedor com ID')) {
        return res.status(400).json({ erro: error.message });
    }
    res.status(500).json({ mensagem: 'Erro interno ao criar material', erro: error.message });
  }
};

module.exports = criarMaterialController;
