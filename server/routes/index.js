const router = require('express').Router();

router.use('/api/v1/aluno', require('./aluno'));

router.use('/api/v1/area', require('./area'));

router.use('/api/v1/colaborador', require('./colaborador'));

router.use('/api/v1/item', require('./item'));

router.use('/api/v1/perfil', require('./perfil'));

router.use('/api/v1/promocao', require('./promocao'));

router.use('/api/v1/qrcode', require('./qrcode'));

router.use('/api/v1/status', require('./status'));

router.use('/api/v1/subcategoria', require('./subcategoria'));

router.use('/api/v1/unidade', require('./unidade'));

router.use((req, res, next) => (res.status(404).json({success: false, msg: "página não encontrada"})));

module.exports = router;