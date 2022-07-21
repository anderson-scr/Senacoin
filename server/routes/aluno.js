const router = require('express').Router();
const controller = require('../controller/alunoController');
const utils = require('../libs/utils');


// Validate an existing aluno and issue a JWT
router.post('/login', controller.login);
// Register a new aluno
router.post('/register', controller.new);
// add a new aluno list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_usuarios"), controller.newList);
// list all alunos
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("ger_usuarios"), controller.listAll);
// list all active alunos
router.get('/active', utils.authUserMiddleware, utils.authRoleMiddleware("ger_usuarios"), controller.listActive);
// list single aluno
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_usuarios"), controller.listOne);
// edit a aluno
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_usuarios"), controller.edit);
// delete all alunos
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_usuarios"), controller.deleteAll);
// delete a aluno
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_usuarios"), controller.delete);


module.exports = router;