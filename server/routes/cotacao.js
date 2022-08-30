const router = require('express').Router();
const controller = require('../controller/cotacaoController');
const utils = require('../libs/utils');


// add a new cotacao
router.post('/add', utils.authUserMiddleware("ger_cotacao"), controller.new);
// list all past cotacoes
router.get('/all', utils.authUserMiddleware("ger_cotacao"), controller.listAll);
// list current cotacao
router.get('/', utils.authUserMiddleware("ger_cotacao"), controller.listOne);
// edit a cotacao
router.patch('/', utils.authUserMiddleware("ger_cotacao"), controller.edit);


module.exports = router;