const router = require('express').Router();
const controller = require('../controller/statusController');
const utils = require('../libs/utils');


// add a new status
router.post('/add', utils.authUserMiddleware, controller.new);
// add a new status list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all status
router.get('/all', utils.authUserMiddleware, controller.listAll);
// edit a status
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a status
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;