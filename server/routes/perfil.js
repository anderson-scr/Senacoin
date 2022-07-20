const router = require('express').Router();
const controller = require('../controller/perfilController');
const utils = require('../libs/utils');


// add a new perfil
router.post('/new', utils.authUserMiddleware, controller.new);
// add a new perfil list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all perfis
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all active perfis
router.get('/active', utils.authUserMiddleware, controller.listActive);
// list single perfil
router.get('/:id', utils.authUserMiddleware, controller.listOne);
// edit a perfil
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a perfil
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;