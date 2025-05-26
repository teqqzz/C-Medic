const express = require('express');
const router = express.Router();


const listarContasReceberController = require('../controllers/ContaReceber/listarContasReceberController');
const obterContaReceberController = require('../controllers/ContaReceber/obterContaReceberController');
const registrarPagamentoContaReceberController = require('../controllers/ContaReceber/registrarPagamentoContaReceberController');
const cancelarContaReceberController = require('../controllers/ContaReceber/cancelarContaReceberController');
const atualizarVencimentoContaReceberController = require('../controllers/ContaReceber/atualizarVencimentoContaReceberController');


router.get('/', listarContasReceberController);
router.get('/:id', obterContaReceberController);
router.patch('/:id/registrar-pagamento', registrarPagamentoContaReceberController);
router.patch('/:id/cancelar', cancelarContaReceberController);
router.patch('/:id/atualizar-vencimento', atualizarVencimentoContaReceberController);


module.exports = router;