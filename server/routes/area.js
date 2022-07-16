const router = require('express').Router();
const controller = require('../controller/areaController');
const utils = require('../libs/utils');


// Register a new area
router.post('/add', utils.authMiddleware, controller.new);
// list all areas
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active areas
router.get('/active', utils.authMiddleware, controller.listActive);

router.get('/:id', utils.authMiddleware, controller.listOne);

module.exports = router;