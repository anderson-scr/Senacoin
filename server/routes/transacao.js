const router = require('express').Router();
const controller = require('../controller/transacaoController');
const utils = require('../libs/utils');


// list all transacaos
router.get('/all', utils.authUserMiddleware("relatorios"), controller.listAll);
// list all transacaos por aluno
router.get('/:aluno/:id', utils.authUserMiddleware("relatorios"), controller.listAllByAluno);
// list single transacao
router.get('/:id', utils.authUserMiddleware("relatorios"), controller.listOne);
// delete a transacao
router.delete('/:id', utils.authUserMiddleware("senacoins"), controller.delete);


module.exports = router;