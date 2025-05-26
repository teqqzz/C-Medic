const express = require('express');
const router = express.Router();

// Importando os controllers
const listarMateriaisController = require('../controllers/Materiais/listarMateriaisController');
const criarMaterialController = require('../controllers/Materiais/criarMaterialController');
const atualizarMaterialController = require('../controllers/Materiais/atualizarMaterialController');
const deletarMaterialController = require('../controllers/Materiais/deletarMaterialController');
const obterMaterialController = require('../controllers/Materiais/obterMaterialController'); // Novo controller

// Rota para listar todos os materiais (ou com filtros)
router.get('/listarmaterial', listarMateriaisController);

// Rota para obter um material específico pelo ID
router.get('/listarmaterial/:id', obterMaterialController); // Nova rota

// Rota para criar um novo material
router.post('/criarmaterial', criarMaterialController);

// Rota para atualizar um material existente
router.put('/atualizarmaterial/:id', atualizarMaterialController);

// Rota para excluir um material
router.delete('/deletarmaterial/:id', deletarMaterialController);

module.exports = router;
