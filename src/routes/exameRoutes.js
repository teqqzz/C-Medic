const express = require('express');
const router = express.Router();
const exameController = require('../controllers/exameController');

// Rota para listar todos os exames
router.get('/', exameController.listarExames);

// Rota para criar um novo exame
router.post('/', exameController.criarExame);

// Rota para atualizar um exame existente
router.put('/:id', exameController.atualizarExame);

// Rota para excluir um exame
router.delete('/:id', exameController.deletarExame);

module.exports = router;