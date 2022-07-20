const router = require('express').Router();
const controller = require('../controller/subcategoriaController');
const utils = require('../libs/utils');


// add a new categoria
router.post('/add', utils.authUserMiddleware, controller.new);
// add a new categoria list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all categorias
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all active categorias
router.get('/active', utils.authUserMiddleware, controller.listActive);
// list single categoria
router.get('/:id', utils.authUserMiddleware, controller.listOne);
// edit a categoria
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a categoria
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;