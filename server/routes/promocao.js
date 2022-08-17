const router = require('express').Router();
const controller = require('../controller/promocaoController');
const utils = require('../libs/utils');


// add a new promocao
router.post('/add', utils.authUserMiddleware("cad_promocoes"), controller.new);
// add a new image
router.post('/:categoria/addImg', controller.newImg);
// add a new promocao list
router.post('/populate', utils.authUserMiddleware("cad_promocoes"), controller.newList);
// list all promocoes
router.get('/all', utils.authUserMiddleware("ger_promocoes"), controller.listAll);
// list all active promocoes
router.get('/active', utils.authUserMiddleware(), controller.listActive);
// list single promocao
router.get('/:id', utils.authUserMiddleware("ger_promocoes"), controller.listOne);
// edit a promocao
router.patch('/:id', utils.authUserMiddleware("ger_promocoes"), controller.edit);
// delete all promocao
router.delete('/truncate', utils.authUserMiddleware("cad_promocoes"), controller.deleteAll);
// delete a promocao
router.delete('/:id', utils.authUserMiddleware("cad_promocoes"), controller.delete);


module.exports = router;