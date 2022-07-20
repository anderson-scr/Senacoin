const router = require('express').Router();
const controller = require('../controller/unidadeController');
const utils = require('../libs/utils');


// add a new unidade
router.post('/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_unidades"), controller.new);
// add a new unidade list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_unidades"), controller.newList);
// list all unidades
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("cad_unidades"), controller.listAll);
// list all active unidades
router.get('/active', utils.authUserMiddleware, utils.authRoleMiddleware("cad_unidades"), controller.listActive);
// list single unidade
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_unidades"), controller.listOne);
// edit a unidade
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_unidades"), controller.edit);
// delete a unidade
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_unidades"), controller.delete);


module.exports = router;