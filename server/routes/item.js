const router = require('express').Router();
const controller = require('../controller/itemController');
const utils = require('../libs/utils');


// add a new item
router.post('/:categoria/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_itens"), controller.new);
// add a new item list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_itens"), controller.newList);
// list all items
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listAll);
// list all items of a categoria
router.get('/:categoria/all', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listAllByCategory);
// list all active items of a categoria
router.get('/:categoria/active', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listActive);
// list single item
router.get('/:categoria/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listOne);
// edit a item
router.patch('/:categoria/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.edit);
// delete a item
router.delete('/:categoria/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_itens"), controller.delete);


module.exports = router;