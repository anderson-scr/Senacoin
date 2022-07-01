const mongoose = require('mongoose');
const User = mongoose.model('User');
const utils = require('../libs/util');


exports.login = (req, res, next) => {

    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);  
            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {
                res.status(401).json({ success: false, msg: "you entered the wrong password" });
            }

        })
        .catch((err) => {
            next(err);
        });
}

// Register a new user
exports.register = (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    try 
	{
        newUser.save()
            .then((user) => {
				const jwt = utils.issueJWT(user);
                res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
            });

    }
	catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

}