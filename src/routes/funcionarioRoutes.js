const express = require('express');
const router = express.Router();
const criarFuncionarioController = require('../controllers/Funcionario/criarFuncionarioController');
const listarFuncionariosController = require('../controllers/Funcionario/listarFuncionariosController');
const buscarFuncionarioPorIdController = require('../controllers/Funcionario/buscarFuncionarioPorIdController');
const atualizarFuncionarioController = require('../controllers/Funcionario/atualizarFuncionarioController');
const deletarFuncionarioController = require('../controllers/Funcionario/deletarFuncionarioController');

router.post('/', criarFuncionarioController);
router.get('/', listarFuncionariosController);
router.get('/:id', buscarFuncionarioPorIdController);
router.put('/:id', atualizarFuncionarioController);
router.delete('/:id', deletarFuncionarioController);


module.exports = router;