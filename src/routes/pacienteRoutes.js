const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Rota para listar todos os pacientes
router.get('/listarpaciente/', pacienteController.listarPacientes);

// Rota para criar um novo paciente
router.post('/criarpaciente/', pacienteController.criarPaciente);

// Rota para atualizar um paciente existente
router.put('/atualizarpaciente/:id', pacienteController.atualizarPaciente);

// Rota para excluir um paciente
router.delete('/deletarpaciente/:id', pacienteController.deletarPaciente);

module.exports = router;