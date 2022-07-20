const router = require('express').Router();
const controller = require('../controller/itemController');
const utils = require('../libs/utils');


// add a new item
router.post('/:categoria/add', utils.authUserMiddleware, controller.new);
// add a new item list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all items
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all items of a categoria
router.get('/:categoria/all', utils.authUserMiddleware, controller.listAllByCategory);
// list all active items of a categoria
router.get('/:categoria/active', utils.authUserMiddleware, controller.listActive);
// list single item
router.get('/:categoria/:id', utils.authUserMiddleware, controller.listOne);
// edit a item
router.patch('/:categoria/:id', utils.authUserMiddleware, controller.edit);
// delete a item
router.delete('/:categoria/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;