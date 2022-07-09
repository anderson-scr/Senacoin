const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, next) => {
    
    Usuario.findOne({ email: req.body.email })
    .then((usuario) => {
        
        if (!usuario)
        return res.status(401).json({ success: false, msg: "usuário não encontrado" });
        
        const isValid = utils.validPassword(req.body.password, usuario.hash, usuario.salt);  
        if (isValid)
        {
            const tokenObject = utils.issueJWT(usuario);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            console.log(usuario)
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
            res.status(201).json({ success: true, token: jwt.token, expiresIn: jwt.expires});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
    
}

exports.listAll = (req, res, next) => {
    Usuario.find({})
    .select("nome email telefone id_unidade id_status")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status' , select: 'nome -_id'})
    .then((usuarios) => {
        
        if (usuarios.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum usuário encontrado" });  
        else
            {
                res.status(200).json(usuarios);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
    Usuario.findOne({ _id: req.params.id})
    .select('-hash -salt')
    .populate({path : 'id_unidade', populate: [{path: 'endereco', select: '-_id'}, {path: 'id_status', select: '-_id'}], select: 'nome endereco responsavel id_status -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status' , select: 'nome -_id'})
    .then((usuarios) => {
        
        if (usuarios.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum usuário encontrado" });  
        else
            {
                res.status(200).json(usuarios);
            }
    })
    .catch((err) => {
        next(err);
    });
}