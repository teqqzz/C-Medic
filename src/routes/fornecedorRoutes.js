const express = require('express');
const router = express.Router();

const criarFornecedorController = require('../controllers/Fornecedores/criarFornecedorController');
const listarFornecedoresController = require('../controllers/Fornecedores/listarFornecedoresController');
const buscarFornecedorPorIdController = require('../controllers/Fornecedores/buscarFornecedorPorIdController');
const atualizarFornecedorController = require('../controllers/Fornecedores/atualizarFornecedorController');
const deletarFornecedorController = require('../controllers/Fornecedores/deletarFornecedorController');

router.post('/', criarFornecedorController);
router.get('/', listarFornecedoresController);
router.get('/:id', buscarFornecedorPorIdController);
router.put('/:id', atualizarFornecedorController);
router.delete('/:id', deletarFornecedorController);

module.exports = router;