const mongoose = require('mongoose');
const SubCategoria = mongoose.model('SubCategoria');


exports.new = (req, res, next) => {
    
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";
    
        SubCategoria.create(req.body, (err, subcat) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        res.status(201).json({ success: true, ...subcat["_doc"]});
    });
}

exports.newList = (req, res, next) => {

    req.body.forEach(subcat => {
        if (!("id_status" in subcat))
            subcat["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    SubCategoria.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });  
}

exports.listAll = (req, res, next) => {

	SubCategoria.find({})
    .select("nome descricao id_status")
    .populate({path : 'id_status', select: '-_id'})
    .then((subcats) => {
        
        if (!subcats.length)
            return res.status(204).json({ success: false, msg: "nenhuma subcategoria encontrada." });  
        else
            res.status(200).json(subcats);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

	SubCategoria.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome")
    .then((subcats) => {
        
        if (!subcats.length)
            return res.status(204).json({ success: false, msg: "nenhuma subcategoria encontrada." });  
        else
            res.status(200).json(subcats);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {

	SubCategoria.findOne({ _id: req.params.id })
    .populate({path : 'id_status', select: '-_id'})
    .then((subcat) => {
        
        if (!subcat)
            return res.status(204).json({ success: false, msg: "subcategoria não encontrada." });  
        else
            res.status(200).json(subcat);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    SubCategoria.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    SubCategoria.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}