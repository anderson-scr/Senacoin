const router = require('express').Router();
const controller = require('../controller/subcategoriaController');
const utils = require('../libs/utils');


// add a new categoria
router.post('/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.new);
// add a new categoria list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.newList);
// list all categorias
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.listAll);
// list all active categorias
router.get('/active', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.listActive);
// list single categoria
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.listOne);
// edit a categoria
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.edit);
// delete all categoria
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategoria"), controller.deleteAll);
// delete a categoria
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_subcategorias"), controller.delete);


module.exports = router;