const router = require('express').Router();
const controller = require('../controller/alunoController');
const utils = require('../libs/utils');


// Validate an existing aluno and issue a JWT
router.post('/login', controller.login);
// Register a new aluno
router.post('/register', controller.new);
// add a new aluno list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all alunos
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active alunos
router.get('/active', utils.authMiddleware, controller.listActive);
// list single aluno
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a aluno
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a aluno
router.delete('/:id', utils.authMiddleware, controller.delete);


module.exports = router;