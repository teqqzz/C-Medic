const express = require('express');
const router = express.Router();

const registrarMovimentacaoEstoqueController = require('../controllers/Estoque/registrarMovimentacaoEstoqueController');
const consultarSaldoMaterialController = require('../controllers/Estoque/consultarSaldoMaterialController');
const listarMovimentacoesEstoqueController = require('../controllers/Estoque/listarMovimentacoesEstoqueController');
const relatorioUsoMateriaisController = require('../controllers/Estoque/relatorioUsoMateriaisController');
const ajustarEstoquePorInventarioController = require('../controllers/Estoque/ajustarEstoquePorInventarioController');

router.post('/movimentacoes', registrarMovimentacaoEstoqueController);
router.get('/materiais/:materialId/saldo', consultarSaldoMaterialController);
router.get('/movimentacoes', listarMovimentacoesEstoqueController);
router.get('/relatorios/uso-materiais', relatorioUsoMateriaisController);
router.post('/materiais/:materialId/ajustar-inventario', ajustarEstoquePorInventarioController);

module.exports = router;
