const mongoose = require('mongoose');
const Area = mongoose.model('Area');


exports.new = (req, res, next) => {

    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    Area.create(req.body, (err, area) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        res.status(201).json({ success: true, ...area["_doc"]});
    });
}

exports.newList = (req, res, next) => {

    req.body.forEach(area => {
        if (!("id_status" in area))
            area["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Area.insertMany(req.body, (err,docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Area.find({})
    .select("nome descricao id_unidade id_status")
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((areas) => {
        
        if (!areas.length)
            return res.status(204).json({ success: false, msg: "nenhuma area encontrada" });  
        else
            res.status(200).json(areas);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {
    
	Area.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_unidade -_id")
    .then((areas) => {
        
        if (!areas.length)
            return res.status(204).json({ success: false, msg: "nenhuma area encontrada" });  
        else
            res.status(200).json(areas);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {

	Area.findOne({ _id: req.params.id })
    .populate({path : 'id_status' , select: '-_id'})
    .then((area) => {
        
        if (!area)
            return res.status(204).json({ success: false, msg: "area não encontrada" });  
        else
            res.status(200).json(area);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Area.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    Area.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}
