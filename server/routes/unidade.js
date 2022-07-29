const router = require('express').Router();
const controller = require('../controller/unidadeController');
const utils = require('../libs/utils');


// add a new unidade
router.post('/add', utils.authUserMiddleware("cad_unidades"), controller.new);
// add a new unidade list
router.post('/populate', utils.authUserMiddleware("cad_unidades"), controller.newList);
// list all unidades
router.get('/all', utils.authUserMiddleware("cad_unidades"), controller.listAll);
// list all active unidades
router.get('/active', utils.authUserMiddleware(), controller.listActive);
// list single unidade
router.get('/:id', utils.authUserMiddleware("cad_unidades"), controller.listOne);
// edit a unidade
router.patch('/:id', utils.authUserMiddleware("cad_unidades"), controller.edit);
// delete all unidades
router.delete('/truncate', utils.authUserMiddleware("cad_unidades"), controller.deleteAll);
// delete a unidade
router.delete('/:id', utils.authUserMiddleware("cad_unidades"), controller.delete);


module.exports = router;