const router = require('express').Router();
const controller = require('../controller/areaController');
const utils = require('../libs/utils');


// add a new area
router.post('/add', utils.authUserMiddleware, controller.new);
// add a new area list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all areas
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all active areas
router.get('/active', utils.authUserMiddleware, controller.listActive);
// list single area
router.get('/:id', utils.authUserMiddleware, controller.listOne);
// edit a area
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a area
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;