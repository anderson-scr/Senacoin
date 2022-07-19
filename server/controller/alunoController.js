const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, next) => {

    Aluno.findOne({ email: req.body.email })
    .then((aluno) => {
        
        if (!aluno)
            return res.status(401).json({ success: false, msg: "aluno não encontrado." });
        
        const isValid = utils.validPassword(req.body.senha, aluno.hash, aluno.salt);  
        if (isValid)
        {
            const tokenObject = utils.issueJWT(aluno);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            console.log(aluno)
        }
        else 
            res.status(401).json({ success: false, msg: "aluno/senha inválidos!" });
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

    Aluno.create({...req.body, hash: saltHash.hash, salt: saltHash.salt, id_status: "62cec6c463187bb9b498687b"}, (err, aluno) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });
        
        res.status(201).json({ success: true, ...aluno["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado
    });
}

// Register a new user list
exports.newList = (req, res, next) => {

    req.body.forEach(aluno => {
        const saltHash = utils.genPassword(req.body.senha);
        delete aluno.id_status;

        if (!("id_status" in aluno))
            aluno["id_status"] = "62cec6c463187bb9b498687b";

        aluno["hash"] = saltHash.hash;
        aluno["salt"] = saltHash.salt;
    });
    
    Aluno.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });   
}

exports.listAll = (req, res, next) => {

    Aluno.find({})
    .select("nome email cpf id_unidade id_status")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status', select: '-_id'})
    .then((alunos) => {
        
        if (!alunos.length)
            return res.status(204).json({ success: false, msg: "nenhum aluno encontrado." });  
        else
            res.status(200).json(alunos);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

    Aluno.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome email cpf matricula id_unidade")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .then((alunos) => {
        
        if (!alunos.length)
            return res.status(204).json({ success: false, msg: "nenhum aluno encontrado." });  
        else
            res.status(200).json(alunos);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {
    
    Aluno.findOne({ _id: "62d5a9a164b3535ce5594d6b"})
    .select('-hash -salt')
    .populate({path : 'id_unidade', populate: {path: 'id_status', select: '-_id'}, select: 'nome cidade uf logradouro numero responsavel id_status -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status', select: '-_id'})
    .then((aluno) => {
        
        if (!aluno)
            return res.status(204).json({ success: false, msg: "aluno não encontrado." });  
        else
            res.status(200).json(aluno);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Aluno.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    Aluno.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}