const express = require('express');
const router = express.Router();

const criarContaPagarController = require('../controllers/ContaPagar/criarContaPagarController');
const listarContasPagarController = require('../controllers/ContaPagar/listarContasPagarController');
const obterContaPagarController = require('../controllers/ContaPagar/obterContaPagarController');
const atualizarContaPagarController = require('../controllers/ContaPagar/atualizarContaPagarController');
const cancelarContaPagarController = require('../controllers/ContaPagar/cancelarContaPagarController');

router.post('/', criarContaPagarController);
router.get('/', listarContasPagarController);
router.get('/:id', obterContaPagarController);
router.put('/:id', atualizarContaPagarController); // Usado para atualizações gerais, incluindo pagamento
router.patch('/:id/cancelar', cancelarContaPagarController); // Rota específica para cancelamento

module.exports = router;
