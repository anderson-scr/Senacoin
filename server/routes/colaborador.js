const router = require('express').Router();
const controller = require('../controller/colaboradorController');
const utils = require('../libs/utils');


// Validate an existing colaborador and issue a JWT
router.post('/login', controller.login);
// Register a new colaborador
router.post('/register', utils.authUserMiddleware("cad_usuarios"), controller.new);
// add a new colaborador list
router.post('/populate', utils.authUserMiddleware("cad_usuarios"), controller.newList);
// list all colaboradores
router.get('/all/:offset?', utils.authUserMiddleware("ger_usuarios"), controller.listAll);
// list all active colaboradores
router.get('/active/:offset?', utils.authUserMiddleware(), controller.listActive);
// list single colaborador
router.get('/:id', utils.authUserMiddleware("ger_usuarios"), controller.listOne);
// edit a colaborador
router.patch('/:id', utils.authUserMiddleware("ger_usuarios"), controller.edit);
// delete all colaborador
router.delete('/truncate', utils.authUserMiddleware("cad_usuarios"), controller.deleteAll);
// delete a colaborador
router.delete('/:id', utils.authUserMiddleware("cad_usuarios"), controller.delete);


module.exports = router;