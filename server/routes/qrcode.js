const router = require('express').Router();
const controller = require('../controller/qrcodeController');
const utils = require('../libs/utils');


// ad a new qr code
router.post('/add', utils.authUserMiddleware("cad_qrcodes"), controller.new);
// add a new qr code list
router.post('/populate', utils.authUserMiddleware("cad_qrcodes"), controller.newList);
//redeem a qrcode
router.get('/redeem/:id', utils.authUserMiddleware(), controller.use);
// list all qr codes
router.get('/all/:offset?', utils.authUserMiddleware("ger_qrcodes"), controller.listAll);
// list all active qr codes
router.get('/active/:offset?', utils.authUserMiddleware(), controller.listActive);
// list all active qr codes
router.get('/expire-soon', utils.authUserMiddleware(), controller.expireSoon);
// list single qr code
router.get('/:id', utils.authUserMiddleware("ger_qrcodes"), controller.listOne);
// edit a qr code
router.patch('/:id', utils.authUserMiddleware("ger_qrcodes"), controller.edit);
// delete all qr code
router.delete('/truncate', utils.authUserMiddleware("cad_qrcodes"), controller.deleteAll);
// delete a qr code
router.delete('/:id', utils.authUserMiddleware("cad_qrcodes"), controller.delete);


module.exports = router;