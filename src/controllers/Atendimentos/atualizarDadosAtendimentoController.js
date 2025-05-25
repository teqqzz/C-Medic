const atualizarDadosAtendimentoServices = require('../../services/Atendimentos/atualizarDadosAtendimentoServices');

const atualizarDadosAtendimentoController = async (req, res) => {
    try {
        const { id } = req.params;
        // Validar req.body aqui se necessário (ex: Joi)
        const atendimentoAtualizado = await atualizarDadosAtendimentoServices(id, req.body);
        res.status(200).json(atendimentoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar dados do atendimento:', error);
        if (error.message.includes('não encontrado') || error.message.includes('Nenhum dado válido')) {
            return res.status(404).json({ erro: error.message });
        }
        res.status(400).json({ erro: error.message }); // Outros erros podem ser 400
    }
};

module.exports = atualizarDadosAtendimentoController;