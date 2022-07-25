const mongoose = require('mongoose');
const SubCategoria = mongoose.model('SubCategoria');


exports.new = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";
    
        SubCategoria.create(req.body, (err, subcat) =>  {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });

        res.status(201).json({ success: true, ...subcat["_doc"]});
    });
}

exports.newList = (req, res, _next) => {

    if (!Object.keys(req.body).length)
        return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    req.body.forEach(subcat => {
        if (!("id_status" in subcat))
            subcat["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    SubCategoria.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });  
}

exports.listAll = (_req, res, _next) => {

	SubCategoria.find({})
    .select("nome descricao id_status")
    .populate({path : 'id_status', select: '-_id'})
    .then((subcats) => {
        
        if (!subcats.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: subcats.length, ...subcats});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {

	SubCategoria.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome")
    .then((subcats) => {
        
        if (!subcats.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: subcats.length, ...subcats});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {

	SubCategoria.findById(req.params.id)
    .populate({path : 'id_status', select: '-_id'})
    .then((subcat) => {
        
        if (!subcat)
            return res.status(204).json();  
        else
            res.status(200).json(subcat);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.edit = (req, res, _nxt) => {

    if (!Object.keys(req.body).length)
        return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    SubCategoria.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}

exports.delete = (req, res, _nxt) => {

    SubCategoria.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}

exports.deleteAll = (_req, res, _nxt) => {
    
    SubCategoria.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}