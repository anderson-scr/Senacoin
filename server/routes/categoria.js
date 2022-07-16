const router = require('express').Router();
const controller = require('../controller/categoriaController');
const utils = require('../libs/utils');


// Register a new categoria
router.post('/add', utils.authMiddleware, controller.new);
// list all categorias
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active categorias
router.get('/active', utils.authMiddleware, controller.listActive);
// list single categoria
router.get('/:id', utils.authMiddleware, controller.listOne);

module.exports = router;