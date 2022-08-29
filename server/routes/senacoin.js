const router = require('express').Router();
const controller = require('../controller/senacoinController');
const utils = require('../libs/utils');

//redeem senacoins for discount
router.post('/redeem', utils.authUserMiddleware("senacoins"), controller.use);

module.exports = router;