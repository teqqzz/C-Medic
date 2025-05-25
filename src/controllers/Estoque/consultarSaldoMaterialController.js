const consultarSaldoMaterialServices = require('../../services/Estoque/consultarSaldoMaterialServices');

const consultarSaldoMaterialController = async (req, res) => {
    try {
        const { materialId } = req.params;
        const materialComSaldo = await consultarSaldoMaterialServices(materialId);
        res.status(200).json(materialComSaldo);
    } catch (error) {
        console.error('Erro ao consultar saldo do material:', error);
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ erro: error.message });
        }
        res.status(500).json({ erro: 'Erro interno ao consultar saldo.' });
    }
};

module.exports = consultarSaldoMaterialController;