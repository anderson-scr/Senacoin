const router = require('express').Router();
const controller = require('../controller/promocaoController');
const utils = require('../libs/utils');


// add a new promocao
router.post('/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_promocoes"), controller.new);
// add a new promocao list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_promocoes"), controller.newList);
// list all promocoes
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("ger_promocoes"), controller.listAll);
// list all active promocoes
router.get('/active', utils.authUserMiddleware, utils.authRoleMiddleware("ger_promocoes"), controller.listActive);
// list single promocao
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_promocoes"), controller.listOne);
// edit a promocao
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_promocoes"), controller.edit);
// delete all promocao
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_promocoes"), controller.deleteAll);
// delete a promocao
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_promocoes"), controller.delete);


module.exports = router;