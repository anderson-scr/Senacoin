const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, next) => {
    
    Usuario.findOne({ username: req.body.username })
    .then((usuario) => {
        
        if (!usuario)
        return res.status(401).json({ success: false, msg: "usuário não encontrado" });
        
        const isValid = utils.validPassword(req.body.password, usuario.hash, usuario.salt);  
        if (isValid)
        {
            const tokenObject = utils.issueJWT(usuario);
            res.status(200).json({ success: true, usuario: user, token: tokenObject.token, expiresIn: tokenObject.expires });
        }
        else 
            res.status(401).json({ success: false, msg: "you entered the wrong password" });
    })
    .catch((err) => {
        next(err);
    });
}

// Register a new user
exports.register = (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);
    
    const novoUsuario = new Usuario({
        cpf: req.body.cpf,
        matricula: req.body.matricula,
        nome: req.body.nome,
        apelido: req.body.apelido,
        email: req.body.email,
        telefone: req.body.telefone,
        data_nasc: req.body.data_nasc,
        id_status: req.body.id_status,
        id_perfil: req.body.id_perfil,
        id_unidade: req.body.id_unidade,
        hash: saltHash.hash,
        salt: saltHash.salt
    });
    
    try 
	{
        novoUsuario.save()
        .then((usuario) => {
            const jwt = utils.issueJWT(usuario);
            console.log(usuario)
            res.json({ success: true, token: jwt.token, expiresIn: jwt.expires});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
    
}

exports.list = (req, res, next) => {
    Usuario.find({})
    .then((usuarios) => {
        
        if (usuarios.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum usuário encontrado" });  
        else
            {
                usuarios.forEach(usuario => {
                    usuario.populate("id_unidade")
                });
                res.status(200).json(usuarios);
            }
    })
    .catch((err) => {
        next(err);
    });
}
