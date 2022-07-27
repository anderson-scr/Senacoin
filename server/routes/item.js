const router = require('express').Router();
const controller = require('../controller/itemController');
const utils = require('../libs/utils');


// add a new item
router.post('/:categoria/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_itens"), controller.new);
// add a new item list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_itens"), controller.newList);
// list all items
router.get('/all/:offset?', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listAll);
// list all active items
router.get('/active/:offset?', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listActive);
// list all items of a categoria
router.get('/:categoria/all/:offset?', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listAllByCategory);
// list all active items of a categoria
router.get('/:categoria/active/:offset?', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listActiveByCategory);
// list single item
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.listOne);
// edit a item
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("ger_itens"), controller.edit);
// delete all item
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_itens"), controller.deleteAll);
// delete a item
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_itens"), controller.delete);


module.exports = router;