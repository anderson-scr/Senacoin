const router = require('express').Router();
const controller = require('../controller/itemController');
const utils = require('../libs/utils');


// Register a new item
router.post('/new', utils.authMiddleware, controller.new);
// list all items
router.get('/all', utils.authMiddleware, controller.listAll);
// list single item
router.get('/:id', utils.authMiddleware, controller.listOne);

module.exports = router;