const router = require('express').Router();
const controller = require('../controller/qrcodeController');
const utils = require('../libs/utils');


// ad a new qr code
router.post('/add', utils.authUserMiddleware, controller.new);
// add a new qr code list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all qr codes
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all active qr codes
router.get('/active', utils.authUserMiddleware, controller.listActive);
// list single qr code
router.get('/:id', utils.authUserMiddleware, controller.listOne);
// edit a qr code
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a qr code
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;