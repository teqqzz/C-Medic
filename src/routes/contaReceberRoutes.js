const express = require('express');
const router = express.Router();

const criarContaReceberController = require('../controllers/ContasReceber/criarContaReceberController'); 
const listarContasReceberController = require('../controllers/ContasReceber/listarContasReceberController');
const buscarContaReceberPorIdController = require('../controllers/ContasReceber/buscarContaReceberPorIdController');
const registrarPagamentoContaReceberController = require('../controllers/ContasReceber/registrarPagamentoContaReceberController');
const atualizarContaReceberController = require('../controllers/ContasReceber/atualizarContaReceberController'); 
const deletarContaReceberController = require('../controllers/ContasReceber/deletarContaReceberController');


router.post('/', criarContaReceberController);
router.get('/', listarContasReceberController);
router.get('/:id', buscarContaReceberPorIdController);
router.patch('/:id/registrar-pagamento', registrarPagamentoContaReceberController);
router.put('/:id', atualizarContaReceberController);
router.delete('/:id', deletarContaReceberController);

module.exports = router;
