const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const PUB_KEY = fs.readFileSync(path.join(__basedir, 'libs', 'id_rsa_pub.pem'), 'utf8');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: PUB_KEY,
	algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, done) => {
	User.findOne({_id: payload.sub})
		.then((user) => {
			//logica para verifiar se é adm vem aqui!
			
			if(user)
				return done(null, user)
			else
				return done(null, false)
		})
		.catch((err) => done(err, null))
});

module.exports = (passport) => {
	passport.use(strategy)

}