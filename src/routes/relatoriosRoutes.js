const express = require('express');
const router = express.Router();


const fluxoCaixaController = require('../controllers/Relatorios/fluxoCaixaController');
const contasAReceberReportController = require('../controllers/Relatorios/contasAReceberReportController');
const contasAPagarReportController = require('../controllers/Relatorios/contasAPagarReportController');
const dreReportController = require('../controllers/Relatorios/dreReportController');
const faturamentoExamesReportController = require('../controllers/Relatorios/faturamentoExamesReportController');
const despesasCategoriaReportController = require('../controllers/Relatorios/despesasCategoriaReportController');


router.get('/fluxo-caixa', fluxoCaixaController);
router.get('/contas-a-receber', contasAReceberReportController);
router.get('/contas-a-pagar', contasAPagarReportController);
router.get('/dre', dreReportController);
router.get('/faturamento-exames', faturamentoExamesReportController);
router.get('/despesas-categoria', despesasCategoriaReportController);


module.exports = router;
