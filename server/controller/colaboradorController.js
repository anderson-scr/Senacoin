const mongoose = require('mongoose');
const Colaborador = mongoose.model('Colaborador');
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
            const tokenObject = utils.issueJWT(colab);//rato
            res.status(200).json({ success: true, email: colab.email, token: tokenObject.token, expiresIn: tokenObject.expires, permissions: colab.permissions });
            console.log(colab)
        }
        else 
            res.status(401).json({ success: false, msg: "colaborador/senha inválidos!" });
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

// Register a new user
exports.new = (req, res, next) => {
    console.log(req.body)
    const saltHash = utils.genPassword(req.body.senha);
    delete req.body.id_status;
    
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    Colaborador.create({...req.body, hash: saltHash.hash, salt: saltHash.salt, id_status: "62cec6c463187bb9b498687b"}, (err, colab) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });
        
        res.status(201).json({ success: true, ...colab["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado
    });
}

// Register a new user list
exports.newList = (req, res, next) => {

    req.body.forEach(colab => {
        const saltHash = utils.genPassword(req.body.senha);
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

    Colaborador.find({})
    .select("-__v")
    // .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    // .populate({path : 'id_status', select: '-_id'})
    .then((colabs) => {
        
        if (!colabs.length)
            return res.status(204).json({ success: false, msg: "nenhum colaborador encontrado." });  
        else
            res.status(200).json(colabs);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

    Colaborador.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome email cpf matricula id_unidade")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .then((colabs) => {
        
        if (!colabs.length)
            return res.status(204).json({ success: false, msg: "nenhum colaborador encontrado." });  
        else
            res.status(200).json(colabs);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {
    
    Colaborador.findOne({ _id: req.params.id})
    .select('-hash -salt')
    .populate({path : 'id_unidade', populate: {path: 'id_status', select: '-_id'}, select: 'nome cidade uf logradouro numero responsavel id_status -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status', select: '-_id'})
    .then((colab) => {
        
        if (!colab)
            return res.status(204).json({ success: false, msg: "colaborador não encontrado." });  
        else
            res.status(200).json(colab);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Colaborador.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    Colaborador.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}