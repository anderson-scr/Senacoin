const router = require('express').Router();
const controller = require('../controller/itemController');
const utils = require('../libs/utils');

// teste
router.get('/', utils.authMiddleware, controller.teste);

module.exports = router;