const mongoose = require('mongoose');
const Perfil = mongoose.model('Perfil');


exports.new = (req, res, next) => {

    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    Perfil.create(req.body, (err, perfil) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        res.status(201).json({ success: true, ...perfil["_doc"]});
    });
}

exports.newList = (req, res, next) => {

    req.body.forEach(perfil => {
        if (!("id_status" in perfil))
            perfil["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Perfil.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Perfil.find({})
    .select("nome id_status")
    .populate({path : 'id_status' , select: '-_id'})
    .then((perfis) => {
        
        if (!perfis.length)
            return res.status(204).json({ success: false, msg: "nenhum perfil encontrado" });  
        else
            res.status(200).json(perfis);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

	Perfil.find({id_status: "62cec6c463187bb9b498687b"})
    .select("-id_status")
    .then((perfis) => {
        
        if (!perfis.length)
            return res.status(204).json({ success: false, msg: "nenhum perfil encontrado" });  
        else
            res.status(200).json(perfis);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {

    Perfil.findOne({ _id: req.params.id })// colocar um && pra procurar por id tbm
    .populate({path : 'id_status' , select: '-_id'})
    .then((perfil) => {
        
        if (!perfil)
			return res.status(204).json({ success: false, msg: "perfil não encontrado" });
        
		res.status(200).json({ success: true, 'perfil': perfil});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Perfil.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {
    
    Perfil.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}
