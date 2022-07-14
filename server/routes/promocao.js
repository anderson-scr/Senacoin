const router = require('express').Router();
const controller = require('../controller/promocaoController');
const utils = require('../libs/utils');


// Register a new promocao
router.post('/add', utils.authMiddleware, controller.new);
// list all promocoes
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active promocoes
router.get('/active', utils.authMiddleware, controller.listActive);
// list single promocao
router.get('/:id', utils.authMiddleware, controller.listOne);


module.exports = router;