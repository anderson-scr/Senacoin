const router = require('express').Router();
const controller = require('../controller/categoriaController');
const utils = require('../libs/utils');


// add a new categoria
router.post('/add', utils.authMiddleware, controller.new);
// add a new categoria list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all categorias
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active categorias
router.get('/active', utils.authMiddleware, controller.listActive);
// list single categoria
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a categoria
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a categoria
router.delete('/:id', utils.authMiddleware, controller.delete);

module.exports = router;