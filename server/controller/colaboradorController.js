const mongoose = require('mongoose');
const Colaborador = mongoose.model('Colaborador');
const AuditoriaColaborador = mongoose.model('AuditoriaColaborador');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, next) => {

    Colaborador.findOne({ email: req.body.email })
    .then((colab) => {
        
        if (!colab)
            return res.status(401).json({ success: false, msg: "colaborador não encontrado." });
        
        const isValid = utils.validPassword(req.body.senha, colab.hash, colab.salt);  
        if (isValid)
        {
            const tokenObject = utils.issueJWT(colab);
            res.status(200).json({ success: true, email: colab.email, token: tokenObject.token, expiresIn: tokenObject.expires});
        }
        else 
            res.status(401).json({ success: false, msg: "colaborador/senha inválidos!" });
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

// Register a new user
exports.new = async (req, res, next) => {
    
    const saltHash = utils.genPassword(req.body.senha);
    delete req.body.senha;
    
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";
    
    console.log('comeca colaborador');
    await Colaborador.create({...req.body, hash: saltHash.hash, salt: saltHash.salt})
    .then(async (colab) => {
        console.log('entrei colab');
        console.log('comeca auditoria');
        await AuditoriaColaborador.create({colaborador: req.jwt.sub, ...req.body})
        .then((audcolab) =>{
            console.log('entrei aud');
            console.log(audcolab);
            res.status(201).json({ success: true, ...colab["_doc"]}) // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
        })
        .catch((err) => {
            console.log('entrei aud err');
            res.status(500).json({ success: false, ...err });
        });
    })
    .catch((err) => {
        console.log('entrei colab err');
        res.status(500).json({ success: false, ...err })
    });
    console.log('cheguei fim');
}

// Register a new user list
exports.newList = (req, res, next) => {

    req.body.forEach(colab => {
        const saltHash = utils.genPassword(colab.senha);
        delete colab.id_status;

        if (!("id_status" in colab))
            colab["id_status"] = "62cec6c463187bb9b498687b";

        colab["hash"] = saltHash.hash;
        colab["salt"] = saltHash.salt;
    });
    
    Colaborador.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });   
}

exports.listAll = (req, res, next) => {

    Colaborador.find({}).skip(req.params.offset).limit(60)
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status', select: '-_id'})
    .then((colabs) => {
        
        if (!colabs.length)
            return res.status(204);  
        else
            res.status(200).json({total: colabs.length, ...colabs});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

    Colaborador.find({id_status: "62cec6c463187bb9b498687b"}).skip(req.params.offset).limit(60)
    .select("nome email cpf matricula id_unidade")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .then((colabs) => {
        
        if (!colabs.length)
            return res.status(204);  
        else
            res.status(200).json({total: colabs.length, ...colabs});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {
    
    Colaborador.findOne({ _id: req.params.id})
    .select('-hash -salt')
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status', select: '-_id'})
    .then((colab) => {
        
        if (!colab)
            return res.status(204);  
        else
            res.status(200).json(colab);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = async (req, res, nxt) => {
    
    await Colaborador.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .then(async (colab) => {
        if (!colab)
            return res.status(204);

        await AuditoriaColaborador.create({colaborador: req.jwt.sub,  ...colab._doc})
        .then((audcolab) =>{
            res.status(200).json({ success: true, ...audcolab["_doc"]}) // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
        })
        .catch((err) => {
            res.status(500).json({ success: false, ...err });
        });
    })
    .catch((err) => {
        res.status(500).json({ success: false, ...err })
    });
}

exports.delete = async (req, res, nxt) => {

    await Colaborador.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id')
    .then(async (colab) => {
        if (!colab)
            return res.status(204);

        await AuditoriaColaborador.create({colaborador: req.jwt.sub, ...colab._doc})
        .then((audcolab) =>{
            res.status(200).json({ success: true, ...audcolab["_doc"]}) // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
        })
        .catch((err) => {
            res.status(500).json({ success: false, ...err });
        });
    })
    .catch((err) => {
        res.status(500).json({ success: false, ...err })
    });
}

exports.deleteAll = (req, res, nxt) => {
    
    Colaborador.deleteMany({})  
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json(err)));
}