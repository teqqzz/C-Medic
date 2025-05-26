const ajustarEstoquePorInventarioServices = require('../../services/Estoque/ajustarEstoquePorInventarioServices');

const ajustarEstoquePorInventarioController = async (req, res) => {
    try {
        const { materialId } = req.params;
        const { quantidadeContada, funcionarioId, observacao } = req.body; // funcionarioId pode vir do user logado

        if (quantidadeContada === undefined) {
            return res.status(400).json({ erro: "O campo 'quantidadeContada' é obrigatório." });
        }

        const resultado = await ajustarEstoquePorInventarioServices(
            parseInt(materialId, 10),
            parseInt(quantidadeContada, 10),
            funcionarioId, // Passar o ID do funcionário responsável pelo inventário
            observacao
        );
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao ajustar estoque por inventário:', error);
        if (error.message.includes('obrigatórios') || error.message.includes('não encontrado')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao ajustar estoque.' });
    }
};

module.exports = ajustarEstoquePorInventarioController;