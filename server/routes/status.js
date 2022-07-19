const router = require('express').Router();
const controller = require('../controller/statusController');
const utils = require('../libs/utils');


// add a new status
router.post('/add', utils.authMiddleware, controller.new);
// add a new status list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all status
router.get('/all', utils.authMiddleware, controller.listAll);
// edit a status
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a status
router.delete('/:id', utils.authMiddleware, controller.delete);


module.exports = router;