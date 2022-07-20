const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Colaborador = mongoose.model('Colaborador');
const PRIV_KEY = fs.readFileSync(path.join(__dirname, 'id_rsa_priv.pem'), 'utf8');
const PUB_KEY = fs.readFileSync(path.join(__dirname, 'id_rsa_pub.pem'), 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * 
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
	if(!password)
		return false
		
	var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
	return hash === hashVerify;
}

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 * 
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
	var salt = crypto.randomBytes(32).toString('hex');
	var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
	
	return {
		salt: salt,
		hash: genHash
	};
}


/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
	const _id = user._id;

	const expiresIn = '1d';

	const payload = {
		sub: _id,
		iat: Date.now()
	};

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

	return {
		token: "Bearer " + signedToken,
		expires: expiresIn
	}
}

function authUserMiddleware(req, res, next) {

	if(!req.headers.authorization)
		return res.status(401).json({ success: false, msg: "You are not authenticated to visit this route" });

	const tokenParts = req.headers.authorization.split(' ');
	if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {

		try {
			const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });
			req.jwt = verification;
			next();
		} catch(err) {
			res.status(401).json({ success: false, msg: "You are not authenticated to visit this route" });
		}
	} 
	else
		res.status(401).json({ success: false, msg: "You are not authenticated to visit this route" });
}

function authRoleMiddleware(role) {
	return (req, res, next) => {
		
		// console.log(req);
		if (!("x-user-email" in req.headers))
			return res.status(403).json({ success: false, msg: "You are not authorized to visit this route" });
		
		Colaborador.findOne({ email: req.headers["x-user-email"] })
		.then((colab) => {
			if (!colab)
				return res.status(403).json({ success: false, msg: "You are not authorized to visit this route" });
			if (!colab.permissoes[role])
				return res.status(403).json({ success: false, msg: "You are not authorized to visit this route" });
			
			next()
		})
		.catch((err) => {
			res.status(500).json(err);
		});
	}
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.authUserMiddleware = authUserMiddleware;
module.exports.authRoleMiddleware = authRoleMiddleware;