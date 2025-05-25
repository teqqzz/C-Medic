const express = require('express');
const router = express.Router();

const registrarMovimentacaoEstoqueController = require('../controllers/Estoque/registrarMovimentacaoEstoqueController');
const consultarSaldoMaterialController = require('../controllers/Estoque/consultarSaldoMaterialController');
const listarMovimentacoesEstoqueController = require('../controllers/Estoque/listarMovimentacoesEstoqueController');

router.post('/movimentacoes', registrarMovimentacaoEstoqueController);
router.get('/materiais/:materialId/saldo', consultarSaldoMaterialController);
router.get('/movimentacoes', listarMovimentacoesEstoqueController);

module.exports = router;