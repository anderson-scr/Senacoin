const router = require('express').Router();
const controller = require('../controller/qrcodeController');
const utils = require('../libs/utils');


// ad a new qr code
router.post('/add', utils.authMiddleware, controller.new);
// add a new qr code list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all qr codes
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active qr codes
router.get('/active', utils.authMiddleware, controller.listActive);
// list single qr code
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a qr code
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a qr code
router.delete('/:id', utils.authMiddleware, controller.delete);


module.exports = router;