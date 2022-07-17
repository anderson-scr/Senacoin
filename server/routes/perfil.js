const router = require('express').Router();
const controller = require('../controller/perfilController');
const utils = require('../libs/utils');


// Register a new perfil
router.post('/new', utils.authMiddleware, controller.new);
// list all perfis
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active perfis
router.get('/active', utils.authMiddleware, controller.listActive);
// list single perfil
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a perfil
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a perfil
router.delete('/:id', utils.authMiddleware, controller.delete);


module.exports = router;