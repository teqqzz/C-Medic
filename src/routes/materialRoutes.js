const express = require('express');
const router = express.Router();

const listarMateriaisController = require('../controllers/Materiais/listarMateriaisController');
const criarMaterialController = require('../controllers/Materiais/criarMaterialController');
const atualizarMaterialController = require('../controllers/Materiais/atualizarMaterialController');
const deletarMaterialController = require('../controllers/Materiais/deletarMaterialController');
const listarMateriaisProximosVencimentoController = require('../controllers/Materiais/listarMateriaisProximosVencimentoController');
const listarMateriaisComEstoqueBaixoController = require('../controllers/Materiais/listarMateriaisComEstoqueBaixoController');

router.post('/', criarMaterialController);
router.get('/', listarMateriaisController);
router.get('/proximos-vencimento', listarMateriaisProximosVencimentoController);
router.get('/estoque-baixo', listarMateriaisComEstoqueBaixoController);
router.put('/:id', atualizarMaterialController);
router.delete('/:id', deletarMaterialController);

module.exports = router;
