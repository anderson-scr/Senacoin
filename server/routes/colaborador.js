const router = require('express').Router();
const controller = require('../controller/colaboradorController');
const utils = require('../libs/utils');


// Validate an existing colaborador and issue a JWT
router.post('/login', controller.login);
// Register a new colaborador
router.post('/register', controller.new);
// add a new colaborador list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all colaboradores
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active colaboradores
router.get('/active', utils.authMiddleware, controller.listActive);
// list single colaborador
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a colaborador
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a colaborador
router.delete('/:id', utils.authMiddleware, controller.delete);


module.exports = router;