const router = require('express').Router();
const controller = require('../controller/usuarioController');
const utils = require('../libs/utils');


// Validate an existing user and issue a JWT
router.post('/login', controller.login);
// Register a new user
router.post('/register', controller.register);
// list all users
router.get('/all', utils.authMiddleware, controller.listAll);
// list single user
router.get('/:id', utils.authMiddleware, controller.listOne);


module.exports = router;