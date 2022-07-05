const router = require('express').Router();
const controller = require('../controller/usuarioController');
const utils = require('../libs/utils');

router.get('/home', utils.authMiddleware, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
router.post('/login', controller.login)

// Register a new user
router.post('/register', controller.register)


module.exports = router;