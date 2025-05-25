const express = require('express');
const router = express.Router();

// Controllers importados
const gerarAgendaController = require('../controllers/Agendamento/gerarAgendaController');
const adicionarEncaixeController = require('../controllers/Agendamento/adicionarEncaixeController');
const agendarHorariosController = require('../controllers/Agendamento/agendarHorariosController');
const listarAgendamentosPacienteController = require('../controllers/Agendamento/listarAgendamentosController');
const confirmarAgendamentoController = require('../controllers/Agendamento/confirmarAgendamentoController');
const deletarAgendaController = require('../controllers/Agendamento/deletarAgendaController');
const deletarHorarioController = require('../controllers/Agendamento/deletarHorarioController');


// Rotas definidas
router.post('/gerar', gerarAgendaController);
router.post('/encaixe', adicionarEncaixeController);
router.post('/agendar', agendarHorariosController);
router.get('/meus-agendamentos/:pacienteId', listarAgendamentosPacienteController);
router.put('/confirmar/:agendamentoId', confirmarAgendamentoController);
router.delete('/agendas/:agendaId', deletarAgendaController);
router.delete('/horarios/:horarioId', deletarHorarioController);

module.exports = router;