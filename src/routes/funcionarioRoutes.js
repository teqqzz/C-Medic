const express = require('express');
const router = express.Router();

const criarFuncionarioController = require('../controllers/Funcionario/criarFuncionarioController');
const listarFuncionariosController = require('../controllers/Funcionario/listarFuncionariosController');
const obterFuncionarioController = require('../controllers/Funcionario/obterFuncionarioController');
const atualizarFuncionarioController = require('../controllers/Funcionario/atualizarFuncionarioController');
const deletarFuncionarioController = require('../controllers/Funcionario/deletarFuncionarioController');

router.post('/', criarFuncionarioController);
router.get('/', listarFuncionariosController);
router.get('/:id', obterFuncionarioController);
router.put('/:id', atualizarFuncionarioController);
router.delete('/:id', deletarFuncionarioController);

module.exports = router;
