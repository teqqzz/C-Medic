const express = require('express');
const router = express.Router();
const listarExamesController = require('../controllers/Exames/listarExamesController');
const criarExameController = require('../controllers/Exames/criarExameController');
const atualizarExameController = require('../controllers/Exames/atualizarExameController');
const deletarExameController = require('../controllers/Exames/deletarExameController');

// Rota para listar todos os exames
router.get('/listarexame/', listarExamesController);

// Rota para criar um novo exame
router.post('/criarexame', criarExameController);

// Rota para atualizar um exame existente
router.put('/atualizarexame/:id', atualizarExameController);

// Rota para excluir um exame
router.delete('/deletarexame/:id', deletarExameController);

module.exports = router;