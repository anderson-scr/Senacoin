const router = require('express').Router();
const controller = require('../controller/statusController');
const utils = require('../libs/utils');


// add a new status
router.post('/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_status"), controller.new);
// add a new status list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_status"), controller.newList);
// list all status
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("cad_status"), controller.listAll);
// edit a status
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_status"), controller.edit);
// delete a status
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_status"), controller.delete);
// delete all status
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_status"), controller.deleteAll);


module.exports = router;