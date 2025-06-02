const express = require('express');
const router = express.Router();


const criarAtendimentoController = require('../controllers/Atendimento/criarAtendimentoController');
const listarAtendimentosController = require('../controllers/Atendimento/listarAtendimentosController');
const obterAtendimentoController = require('../controllers/Atendimento/obterAtendimentoController');
const atualizarStatusPagamentoAtendimentoController = require('../controllers/Atendimento/atualizarStatusPagamentoAtendimentoController');

router.post('/', criarAtendimentoController);
router.get('/', listarAtendimentosController);
router.get('/:id', obterAtendimentoController);
router.put('/:id/pagamento', atualizarStatusPagamentoAtendimentoController);

module.exports = router;