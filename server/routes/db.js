const router = require('express').Router();
const controller = require('../controller/dbController');


router.get('/', controller.teste)

module.exports = router;