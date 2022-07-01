//conecta com o db
const pool = require('../libs/connect');
const utils = require('../libs/utils');


exports.login = (req, res, next) => {

    pool.getConnection((err, conn) => {
		if(err)
			throw err;
		console.log(`Conectado ao find com o ID ${conn.threadId}`);

		//utilizando a conexão
		conn.query(`SELECT xxxxxxx
					FROM xxxxxxx 
						JOIN xxxxxxx ON x.x = x.x
						JOIN xxxxxxx ON x.x = x.x
					WHERE xxxxxxx = ${req.body.username} LIMIT 1
                    `, (err, rows) =>{
			//libera a conexão, quando finaliza a ação
			conn.release();			
			if(!err)
			{
				if (!rows)
                    return res.status(401).json({ success: false, msg: "could not find user" });
                
                const isValid = utils.validPassword(req.body.password, rows[0].hash, rows[0].salt);  
                if (isValid)
                {
                    const tokenObject = utils.issueJWT(user);
                    res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
                }
                else 
                    res.status(401).json({ success: false, msg: "you entered the wrong password" });
			}
			else
                next(err);
			
		});
	});
}

// Register a new user
exports.register = (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    pool.getConnection((err, conn) => {
        if(err)
        {
            res.json({ success: false, msg: err });
            throw err;
        }
        console.log(`Conectado ao find com o ID ${conn.threadId}`);
        //utilizando a conexão
        conn.query(`INSERT INTO (xxx, xxx) VALUES (${req.body.username}, ${hash}, ${salt})`, (err, rows) =>{
            //libera a conexão, quando finaliza a ação
            conn.release();			
        });

        const jwt = utils.issueJWT(req.body.username);
        res.json({ success: true, user: req.body.username, token: jwt.token, expiresIn: jwt.expires});
    });
}