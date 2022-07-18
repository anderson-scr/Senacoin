const router = require('express').Router();
const controller = require('../controller/areaController');
const utils = require('../libs/utils');


// add a new area
router.post('/add', utils.authMiddleware, controller.new);
// add a new area list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all areas
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active areas
router.get('/active', utils.authMiddleware, controller.listActive);
// list single area
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a area
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a area
router.delete('/:id', utils.authMiddleware, controller.delete);

module.exports = router;