const router = require('express').Router();

router.use('/api/v1/usuario', require('./usuario'));

router.use('/api/v1/item', require('./item'));


module.exports = router;