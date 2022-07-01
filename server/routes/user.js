const router = require('express').Router();
const controller = require('../controller/userController');
const passport = require('passport');
const utils = require('../libs/util');

router.get('/home', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
router.post('/login', controller.login)

// Register a new user
router.post('/register', controller.register)


module.exports = router;