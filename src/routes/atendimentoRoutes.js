const express = require('express');
const router = express.Router();

const buscarAtendimentoPorIdController = require('../controllers/Atendimentos/buscarAtendimentoPorIdController');
const listarAtendimentosController = require('../controllers/Atendimentos/listarAtendimentosController');
const atualizarDadosAtendimentoController = require('../controllers/Atendimentos/atualizarDadosAtendimentoController');
const registrarChegadaPacienteController = require('../controllers/Atendimentos/registrarChegadaPacienteController');



router.get('/', listarAtendimentosController);
router.get('/:id', buscarAtendimentoPorIdController);
router.put('/:id', atualizarDadosAtendimentoController); 
router.patch('/:id/registrar-chegada', registrarChegadaPacienteController); 

module.exports = router;