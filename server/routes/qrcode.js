const router = require('express').Router();
const controller = require('../controller/qrcodeController');
const utils = require('../libs/utils');


// ad a new qr code
router.post('/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_qrcodes"), controller.new);
// add a new qr code list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_qrcodes"), controller.newList);
// list all qr codes
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("ger_qrcodes"), controller.listAll);
// list all active qr codes
router.get('/active', utils.authUserMiddleware, utils.authRoleMiddleware("ger_qrcodes"), controller.listActive);
// list single qr code
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_qrcodes"), controller.listOne);
// edit a qr code
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_qrcodes"), controller.edit);
// delete a qr code
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_qrcodes"), controller.delete);


module.exports = router;