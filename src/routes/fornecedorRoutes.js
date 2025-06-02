const express = require('express');
const router = express.Router();

// Importando os controllers de Fornecedor
const criarFornecedorController = require('../controllers/Fornecedor/criarFornecedorController');
const listarFornecedoresController = require('../controllers/Fornecedor/listarFornecedoresController');
const obterFornecedorController = require('../controllers/Fornecedor/obterFornecedorController');
const atualizarFornecedorController = require('../controllers/Fornecedor/atualizarFornecedorController');
const deletarFornecedorController = require('../controllers/Fornecedor/deletarFornecedorController');

// Rota para criar um novo fornecedor
router.post('/', criarFornecedorController);
router.get('/', listarFornecedoresController);
router.get('/:id', obterFornecedorController);
router.put('/:id', atualizarFornecedorController);
router.delete('/:id', deletarFornecedorController);

module.exports = router;
