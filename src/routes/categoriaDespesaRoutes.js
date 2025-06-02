const express = require('express');
const router = express.Router();

const criarCategoriaDespesaController = require('../controllers/CategoriaDespesa/criarCategoriaDespesaController');
const listarCategoriasDespesaController = require('../controllers/CategoriaDespesa/listarCategoriasDespesaController');
const obterCategoriaDespesaController = require('../controllers/CategoriaDespesa/obterCategoriaDespesaController');
const atualizarCategoriaDespesaController = require('../controllers/CategoriaDespesa/atualizarCategoriaDespesaController');
const deletarCategoriaDespesaController = require('../controllers/CategoriaDespesa/deletarCategoriaDespesaController');

router.post('/', criarCategoriaDespesaController);
router.get('/', listarCategoriasDespesaController);
router.get('/:id', obterCategoriaDespesaController);
router.put('/:id', atualizarCategoriaDespesaController);
router.delete('/:id', deletarCategoriaDespesaController);

module.exports = router;
