const deletarCargoServices = require('../../services/Cargos/deletarCargoServices');

const deletarCargoController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await deletarCargoServices(id);
        if (!deletado) { // Se o serviço retornar null para "não encontrado"
            return res.status(404).json({ erro: 'Cargo não encontrado para deleção.' });
        }
        res.status(200).json({ mensagem: 'Cargo deletado com sucesso.' });
    } catch (error) {
        if (error.message.includes('não encontrado')) { // Se o serviço lançar erro
            return res.status(404).json({ erro: error.message });
        }
        if (error.message.includes('funcionário(s) associado(s)')) {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro ao deletar cargo:", error);
        res.status(500).json({ erro: 'Erro interno ao deletar cargo.' });
    }
};

module.exports = deletarCargoController;
