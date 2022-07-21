const router = require('express').Router();
const controller = require('../controller/perfilController');
const utils = require('../libs/utils');


// add a new perfil
router.post('/new', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.new);
// add a new perfil list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.newList);
// list all perfis
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.listAll);
// list all active perfis
router.get('/active', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.listActive);
// list single perfil
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.listOne);
// edit a perfil
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.edit);
// delete all perfil
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.deleteAll);
// delete a perfil
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_perfis"), controller.delete);


module.exports = router;