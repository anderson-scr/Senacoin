const router = require('express').Router();
const controller = require('../controller/colaboradorController');
const utils = require('../libs/utils');


// Validate an existing colaborador and issue a JWT
router.post('/login', controller.login);
// Register a new colaborador
router.post('/register', controller.register);
// list all colaboradores
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active colaboradores
router.get('/active', utils.authMiddleware, controller.listActive);
// list single colaborador
router.get('/:id', utils.authMiddleware, controller.listOne);


module.exports = router;