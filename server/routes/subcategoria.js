const router = require('express').Router();
const controller = require('../controller/subcategoriaController');
const utils = require('../libs/utils');


// add a new subcategoria
router.post('/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.new);
// add a new subcategoria list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.newList);
// list all subcategorias
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.listAll);
// list all active subcategorias
router.get('/active', utils.authUserMiddleware, controller.listActive);
// list single subcategoria
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.listOne);
// edit a subcategoria
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.edit);
// delete all subcategoria
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategoria"), controller.deleteAll);
// delete a subcategoria
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.delete);


module.exports = router;