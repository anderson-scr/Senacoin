const router = require('express').Router();
const controller = require('../controller/areaController');
const utils = require('../libs/utils');


// add a new area
router.post('/add', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.new);
// add a new area list
router.post('/populate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.newList);
// list all areas
router.get('/all', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.listAll);
// list all active areas
router.get('/active', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.listActive);
// list single area
router.get('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.listOne);
// edit a area
router.patch('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.edit);
// delete all areas
router.delete('/truncate', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.deleteAll);
// delete a area
router.delete('/:id', utils.authUserMiddleware, utils.authRoleMiddleware("cad_areas"), controller.delete);


module.exports = router;