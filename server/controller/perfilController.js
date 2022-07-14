const mongoose = require('mongoose');
const Perfil = mongoose.model('Perfil');


exports.new = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de adicionar perfil."});
}

exports.listAll = (req, res, next) => {
	Perfil.find({})
    .select("nome id_status")
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((perfis) => {
        
        if (perfis.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum perfil encontrado" });  
        else
            {
                res.status(200).json(perfis);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	Perfil.find({id_status: "62cec6c463187bb9b498687b"})
    .select("-id_status")
    .then((perfis) => {
        
        if (perfis.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum perfil encontrado" });  
        else
            {
                res.status(200).json(perfis);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {

    Perfil.findOne({ _id: req.params.id })// colocar um && pra procurar por id tbm
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((perfil) => {
        
        if (!perfil)
			return res.status(401).json({ success: false, msg: "colaborador não encontrado" });
        
		res.status(200).json({ success: true, 'perfil': perfil});
		console.log(perfil)
    })
    .catch((err) => {
        next(err);
    });
}