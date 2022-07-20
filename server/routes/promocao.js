const router = require('express').Router();
const controller = require('../controller/promocaoController');
const utils = require('../libs/utils');


// add a new promocao
router.post('/add', utils.authUserMiddleware, controller.new);
// add a new promocao list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all promocoes
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all active promocoes
router.get('/active', utils.authUserMiddleware, controller.listActive);
// list single promocao
router.get('/:id', utils.authUserMiddleware, controller.listOne);
// edit a promocao
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a promocao
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;