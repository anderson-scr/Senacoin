const router = require('express').Router();
const controller = require('../controller/transacaoController');
const utils = require('../libs/utils');


// add a new transacao
router.post('/add', utils.authMiddleware, controller.new);
// add a new transacao list
router.post('/populate', utils.authMiddleware, controller.newList);
// list all transacaos
router.get('/all', utils.authMiddleware, controller.listAll);
// list all active transacaos
router.get('/:aluno/all', utils.authMiddleware, controller.listAllByAluno);
// list single transacao
router.get('/:id', utils.authMiddleware, controller.listOne);
// edit a transacao
router.patch('/:id', utils.authMiddleware, controller.edit);
// delete a transacao
router.delete('/:id', utils.authMiddleware, controller.delete);


module.exports = router;