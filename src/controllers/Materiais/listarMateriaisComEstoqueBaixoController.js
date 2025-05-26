const listarMateriaisComEstoqueBaixoServices = require('../../services/Materiais/listarMateriaisComEstoqueBaixoServices');

const listarMateriaisComEstoqueBaixoController = async (req, res) => {
    try {
        const materiais = await listarMateriaisComEstoqueBaixoServices();
        if (materiais.length === 0) {
            return res.status(200).json({ mensagem: 'Nenhum material encontrado com estoque baixo ou abaixo do mínimo definido.', data: [] });
        }
        res.status(200).json(materiais);
    } catch (error) {
        console.error('Erro ao listar materiais com estoque baixo:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar materiais com estoque baixo.' });
    }
};

module.exports = listarMateriaisComEstoqueBaixoController;
