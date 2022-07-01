const router = require('express').Router();
const controller = require('../controller/apiController');

router.get('/', controller.teste)

module.exports = router;