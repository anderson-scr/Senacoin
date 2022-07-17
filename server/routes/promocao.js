const router = require('express').Router();
const controller = require('../controller/promocaoController');
const utils = require('../libs/utils');


// add a new promocao
router.post('/add', utils.authMiddleware, controller.new);
// add a new promocao list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all promocoes
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active promocoes
router.get('/active', utils.authMiddleware, controller.listActive);
// list single promocao
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a promocao
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a promocao
router.delete('/:id', utils.authMiddleware, controller.delete);



module.exports = router;