const router = require('express').Router();
const controller = require('../controller/dashboardController');
const utils = require('../libs/utils');


// get all servicos, eventos, qrcodes e promocao
router.get('/all', utils.authUserMiddleware("relatorios"), controller.getAll);


module.exports = router;