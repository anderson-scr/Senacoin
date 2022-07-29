const router = require('express').Router();
const controller = require('../controller/categoriaController');
const utils = require('../libs/utils');

// list all categorias
router.get('/all', utils.authUserMiddleware(), controller.listAll);


module.exports = router;