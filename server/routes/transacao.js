const router = require('express').Router();
const controller = require('../controller/transacaoController');
const utils = require('../libs/utils');


// add a new transacao
router.post('/add', utils.authUserMiddleware, controller.new);
// add a new transacao list
router.post('/populate', utils.authUserMiddleware, controller.newList);
// list all transacaos
router.get('/all', utils.authUserMiddleware, controller.listAll);
// list all active transacaos
router.get('/:aluno/all', utils.authUserMiddleware, controller.listAllByAluno);
// list single transacao
router.get('/:id', utils.authUserMiddleware, controller.listOne);
// edit a transacao
router.patch('/:id', utils.authUserMiddleware, controller.edit);
// delete a transacao
router.delete('/:id', utils.authUserMiddleware, controller.delete);


module.exports = router;