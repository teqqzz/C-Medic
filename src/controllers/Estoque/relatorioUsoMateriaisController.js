const relatorioUsoMateriaisServices = require('../../services/Estoque/relatorioUsoMateriaisServices');

const relatorioUsoMateriaisController = async (req, res) => {
    try {
        // Filtros podem vir de req.query: dataInicio, dataFim, materialId, tipoMaterial, etc.
        const relatorio = await relatorioUsoMateriaisServices(req.query);
        if (relatorio.length === 0) {
            return res.status(200).json({ mensagem: 'Nenhum dado de uso de material encontrado para os filtros aplicados.', data: [] });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        console.error('Erro ao gerar relatório de uso de materiais:', error);
        res.status(500).json({ erro: 'Erro interno ao gerar relatório de uso de materiais.' });
    }
};

module.exports = relatorioUsoMateriaisController;