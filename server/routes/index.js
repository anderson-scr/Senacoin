const router = require('express').Router();

router.use('/api/v1/colaborador', require('./colaborador'));

router.use('/api/v1/item', require('./item'));

router.use('/api/v1/unidade', require('./unidade'));

router.use('/api/v1/perfil', require('./perfil'));

router.use('/api/v1/area', require('./area'));

router.use('/api/v1/categoria', require('./categoria'));

router.use('/api/v1/promocao', require('./promocao'));


module.exports = router;