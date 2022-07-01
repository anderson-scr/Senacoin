const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/', require('./user'));

module.exports = router;