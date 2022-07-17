const router = require('express').Router();
const controller = require('../controller/unidadeController');
const utils = require('../libs/utils');


// add a new unidade
router.post('/add', utils.authMiddleware, controller.new);
// add a new unidade list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all unidades
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active unidades
router.get('/active', utils.authMiddleware, controller.listActive);
// list single unidade
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a unidade
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a unidade
router.delete('/:id', utils.authMiddleware, controller.delete);


module.exports = router;