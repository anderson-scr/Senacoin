const router = require('express').Router();
const controller = require('../controller/unidadeController');
const utils = require('../libs/utils');


// Register a new unidade
router.post('/add', utils.authMiddleware, controller.new);
// list all unidades
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active unidades
router.get('/active', utils.authMiddleware, controller.listActive);
// list single unidade
router.get('/:id', utils.authMiddleware, controller.listOne);

module.exports = router;