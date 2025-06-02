const express = require('express');
const router = express.Router();

// Importando os controllers individualmente
const listarPacientesController = require('../controllers/Pacientes/listarPacientesController');
const criarPacienteController = require('../controllers/Pacientes/criarPacienteController');
const atualizarPacienteController = require('../controllers/Pacientes/atualizarPacienteController');
const deletarPacienteController = require('../controllers/Pacientes/deletarPacienteController');

// Rota para listar todos os pacientes
router.get('/listarpaciente', listarPacientesController);

// Rota para criar um novo paciente
router.post('/criarpaciente', criarPacienteController);

// Rota para atualizar um paciente existente
router.put('/atualizarpaciente/:id', atualizarPacienteController);

// Rota para excluir um paciente
router.delete('/deletarpaciente/:id', deletarPacienteController);

module.exports = router;