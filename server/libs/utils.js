const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Colaborador = mongoose.model('Colaborador');
const Aluno = mongoose.model('Aluno');
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

	const expiresIn = '1d';
	const payload = {
		sub: user.email,
	};

	const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

	return {
		token: "Bearer " + signedToken,
		expires: expiresIn
	}
}

function authUserMiddleware(role) {

	role ??= false;
	return (req, res, next) => {
    console.log("///////////////////////////////////////////////")
    console.log(req.headers.authorization)
    console.log("///////////////////////////////////////////////")
    if(!req.headers.authorization)
			return res.status(401).json({ success: false, msg: "Voce não esta autenticado a acessar essa rota1" });
		
		let flag = true;
		const tokenParts = req.headers.authorization.split(' ');
		if (tokenParts[0] === 'Bearer' && /\S+\.\S+\.\S+/.test(tokenParts[1])) {
			jwt.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] }, async (err, decoded) => {
				if (!err)
				{
					await Colaborador.findOne({ email: decoded.sub })
					.then(async (colab) => {
						if (!colab)
						{
							await Aluno.findOne({ email: decoded.sub })
							.then((aluno) => {
								if (role && req.params.id != aluno._id)
								{
									flag = false;
									res.status(403).json({ success: false, msg: "Voce não esta autorizado a acessar essa rota2" });
								}
							})
							.catch((_aluno) => {
								flag = false;
								res.status(500).json({success: false, msg: `${err}`});
							})
						}
						else
						{
							if (!colab.ativo)
							{
								flag = false;
								res.status(401).json({ success: false, msg: "Usuário não encontrado" });
							}
							
							if (role && !colab.permissoes[role])
							{
								flag = false;
								res.status(403).json({ success: false, msg: "Voce não esta autorizado a acessar essa rota3" });
							}
						}
						if (flag)
						{
							req.jwt = decoded;
							next();
						}
					})
					.catch((err) => {
						res.status(500).json({success: false, msg: `${err}`});
					});
				}
				else
					res.status(401).json({ success: false, msg: "Voce não esta autenticado a acessar essa rota4" });
			});
		}
		else
			res.status(401).json({ success: false, msg: "Voce não esta autenticado a acessar essa rota5" });
	}
}


module.exports = {validPassword, genPassword, issueJWT, authUserMiddleware};