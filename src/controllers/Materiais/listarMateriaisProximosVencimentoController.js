const listarMateriaisProximosVencimentoServices = require('../../services/Materiais/listarMateriaisProximosVencimentoServices');

const listarMateriaisProximosVencimentoController = async (req, res) => {
    try {
        const meses = req.query.meses ? parseInt(req.query.meses) : 3;

        const materiais = await listarMateriaisProximosVencimentoServices(meses);
        if (materiais.length === 0) {
            return res.status(200).json({ mensagem: `Nenhum material encontrado próximo do vencimento nos próximos ${meses} meses com estoque.`, data: [] });
        }
        res.status(200).json(materiais);
    } catch (error) {
        console.error('Erro ao listar materiais próximos do vencimento:', error);
        if (error.message.includes('Meses de antecedência')) {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao buscar materiais próximos do vencimento.' });
    }
};

module.exports = listarMateriaisProximosVencimentoController;