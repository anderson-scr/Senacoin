const router = require('express').Router();

router.use('/api/v1/colaborador', require('./colaborador'));

router.use('/api/v1/item', require('./item'));


module.exports = router;