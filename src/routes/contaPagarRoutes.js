const express = require('express');
const router = express.Router();

const criarContaPagarController = require('../controllers/ContasPagar/criarContaPagarController');
const listarContasPagarController = require('../controllers/ContasPagar/listarContasPagarController');
const buscarContaPagarPorIdController = require('../controllers/ContasPagar/buscarContaPagarPorIdController');
const atualizarContaPagarController = require('../controllers/ContasPagar/atualizarContaPagarController');
const deletarContaPagarController = require('../controllers/ContasPagar/deletarContaPagarController');

router.post('/', criarContaPagarController);
router.get('/', listarContasPagarController);
router.get('/:id', buscarContaPagarPorIdController);
router.put('/:id', atualizarContaPagarController); 
router.delete('/:id', deletarContaPagarController);

module.exports = router;