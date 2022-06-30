const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/db', require('./db'));

module.exports = router;