const router = require('express').Router();
const controller = require('../controller/qrcodeController');
const utils = require('../libs/utils');


// Register a new qr code
router.post('/add', utils.authMiddleware, controller.new);
// list all qr codes
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active qr codes
router.get('/active', utils.authMiddleware, controller.listActive);
// list single qr code
router.get('/:id', utils.authMiddleware, controller.listOne);


module.exports = router;