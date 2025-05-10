const express = require('express');
const router = express.Router();
const pacienteController = require('../src/controllers/pacienteController');

// Rota para listar todos os pacientes
router.get('/', pacienteController.listarPacientes);

// Rota para criar um novo paciente
router.post('/', pacienteController.criarPaciente);

// Rota para atualizar um paciente existente
router.put('/:id', pacienteController.atualizarPaciente);

// Rota para excluir um paciente
router.delete('/:id', pacienteController.deletarPaciente);

module.exports = router;