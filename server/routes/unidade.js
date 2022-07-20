const router = require('express').Router();
const controller = require('../controller/unidadeController');
const utils = require('../libs/utils');


// add a new unidade
router.post('/add', utils.authUserMiddleware, controller.new);
// add a new unidade list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all unidades
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all active unidades
router.get('/active', utils.authUserMiddleware, controller.listActive);
// list single unidade
router.get('/:id', utils.authUserMiddleware, controller.listOne);
// edit a unidade
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a unidade
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;