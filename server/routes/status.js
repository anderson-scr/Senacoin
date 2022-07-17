const router = require('express').Router();
const controller = require('../controller/statusController');
const utils = require('../libs/utils');


// Register a new status
router.post('/add', utils.authMiddleware, controller.new);
// list all status
router.get('/all', utils.authMiddleware, controller.listAll);
// edit a status
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a status
router.delete('/:id', utils.authMiddleware, controller.delete);

module.exports = router;