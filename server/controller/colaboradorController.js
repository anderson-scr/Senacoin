const mongoose = require('mongoose');
const Colaborador = mongoose.model('Colaborador');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, next) => {
    
    Colaborador.findOne({ email: req.body.email })
    .then((colab) => {
        
        if (!colab)
        return res.status(401).json({ success: false, msg: "colaborador não encontrado" });
        
        const isValid = utils.validPassword(req.body.senha, colab.hash, colab.salt);  
        if (isValid)
        {
            const tokenObject = utils.issueJWT(colab);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            console.log(colab)
        }
        else 
            res.status(401).json({ success: false, msg: "colaborador/senha inválidos!" });
    })
    .catch((err) => {
        next(err);
    });
}

// Register a new user
exports.register = (req, res, next) => {
    const saltHash = utils.genPassword(req.body.senha);
    
    const novoColaborador = new Colaborador({
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        matricula: req.body.matricula,
        hash: saltHash.hash,
        salt: saltHash.salt,
        cad_perfis: req.body.cad_perfis,
        cad_areas: req.body.cad_areas,
        cad_categorias: req.body.cad_categorias,
        cad_subcategorias: req.body.cad_subcategorias,
        cad_usuarios: req.body.cad_usuarios,
        cad_promocoes: req.body.cad_promocoes,
        cad_unidades: req.body.cad_unidades,
        cad_itens: req.body.cad_itens,
        cad_relatorios: req.body.cad_relatorios,
        ger_items: req.body.ger_items,
        ger_promocoes: req.body.ger_promocoes,
        ger_qrcode: req.body.ger_qrcode,
        ger_relatorios: req.body.ger_relatorios,
        admin: req.body.admin,
        id_unidade: req.body.id_unidade,
        id_status: "62cec6c463187bb9b498687b"
    });
    
    try 
	{
        novoColaborador.save()
        .then((colab) => {
            const jwt = utils.issueJWT(colab);
            console.log(colab)
            res.status(201).json({ success: true, token: jwt.token, expiresIn: jwt.expires});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
    
}

exports.listAll = (req, res, next) => {
    Colaborador.find({})
    .select("nome email cpf id_unidade id_status")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status' , select: 'nome -_id'})
    .then((colabs) => {
        
        if (colabs.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum colaborador encontrado" });  
        else
            {
                res.status(200).json(colabs);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
    Colaborador.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome email cpf matricula id_unidade")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .then((colabs) => {
        
        if (colabs.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum colaborador encontrado" });  
        else
            {
                res.status(200).json(colabs);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
    Colaborador.findOne({ _id: req.params.id})
    .select('-hash -salt')
    .populate({path : 'id_unidade', populate: {path: 'id_status', select: '-_id'}, select: 'nome cidade uf logradouro numero responsavel id_status -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status' , select: 'nome -_id'})
    .then((colabs) => {
        
        if (colabs.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum colaborador encontrado" });  
        else
            {
                res.status(200).json(colabs);
            }
    })
    .catch((err) => {
        next(err);
    });
}
