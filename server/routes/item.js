const router = require('express').Router();
const pd_controller = require('../controller/produtoController');
const sv_controller = require('../controller/servicoController');
const ev_controller = require('../controller/eventoController');
const utils = require('../libs/utils');


// add a new produto item
router.post('/produto/add', utils.authMiddleware, pd_controller.new);
// add a new servico item
router.post('/servico/add', utils.authMiddleware, sv_controller.new);
// add a new evento item
router.post('/evento/add', utils.authMiddleware, ev_controller.new);

// list all produto items
router.get('/produto/all', utils.authMiddleware, pd_controller.listAll);
// list all servico items
router.get('/servico/all', utils.authMiddleware, sv_controller.listAll);
// list all evento items
router.get('/evento/all', utils.authMiddleware, ev_controller.listAll);

// list all active produto items
router.get('/produto/active', utils.authMiddleware, pd_controller.listActive);
// list all active servico items
router.get('/servico/active', utils.authMiddleware, sv_controller.listActive);
// list all active evento items
router.get('/evento/active', utils.authMiddleware, ev_controller.listActive);

// list single produto
router.get('/produto/:id', utils.authMiddleware, pd_controller.listOne);
// list single servico
router.get('/servico/:id', utils.authMiddleware, sv_controller.listOne);
// list single evento
router.get('/evento/:id', utils.authMiddleware, ev_controller.listOne);

// edit a produto
router.patch('/:id', utils.authMiddleware, pd_controller.edit);
// edit a servico
router.patch('/:id', utils.authMiddleware, sv_controller.edit);
// edit a evento
router.patch('/:id', utils.authMiddleware, ev_controller.edit);

// delete a produto
router.delete('/:id', utils.authMiddleware, pd_controller.delete);
// delete a servico
router.delete('/:id', utils.authMiddleware, sv_controller.delete);
// delete a evento
router.delete('/:id', utils.authMiddleware, ev_controller.delete);


module.exports = router;