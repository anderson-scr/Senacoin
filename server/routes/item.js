const router = require('express').Router();
const controller = require('../controller/itemController');
const utils = require('../libs/utils');


// add a new produto item
router.post('/produto/new', utils.authMiddleware, controller.new);
// add a new servico item
router.post('/servico/new', utils.authMiddleware, controller.new);
// add a new evento item
router.post('/evento/new', utils.authMiddleware, controller.new);

// list all produto items
router.get('/produto/all', utils.authMiddleware, controller.listAll);
// list all servico items
router.get('/servico/all', utils.authMiddleware, controller.listAll);
// list all evento items
router.get('/evento/all', utils.authMiddleware, controller.listAll);


// list single produto
router.get('/produto/:id', utils.authMiddleware, controller.listOne);
// list single servico
router.get('/servico/:id', utils.authMiddleware, controller.listOne);
// list single evento
router.get('/evento/:id', utils.authMiddleware, controller.listOne);

module.exports = router;