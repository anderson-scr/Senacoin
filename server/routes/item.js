const router = require('express').Router();
const controller = require('../controller/itemController');
const utils = require('../libs/utils');


// add a new item
router.post('/:categoria/add', utils.authMiddleware, controller.new);
// add a new item list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all items
router.get('/all', utils.authMiddleware, controller.listAll);
// list all items of a categoria
router.get('/:categoria/all', utils.authMiddleware, controller.listAllByCategory);
// list all active items of a categoria
router.get('/:categoria/active', utils.authMiddleware, controller.listActive);
// list single item
router.get('/:categoria/:id', utils.authMiddleware, controller.listOne);
// edit a item
router.patch('/:categoria/:id', utils.authMiddleware, controller.edit);
// delete a item
router.delete('/:categoria/:id', utils.authMiddleware, controller.delete);


module.exports = router;