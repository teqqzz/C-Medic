const express = require('express');
const router = express.Router();

const criarCargoController = require('../controllers/Cargos/criarCargoController');
const listarCargosController = require('../controllers/Cargos/listarCargosController');
const buscarCargoPorIdController = require('../controllers/Cargos/buscarCargoPorIdController');
const atualizarCargoController = require('../controllers/Cargos/atualizarCargoController');
const deletarCargoController = require('../controllers/Cargos/deletarCargoController');

router.post('/', criarCargoController);
router.get('/', listarCargosController);
router.get('/:id', buscarCargoPorIdController);
router.put('/:id', atualizarCargoController);
router.delete('/:id', deletarCargoController);

module.exports = router;
