const mongoose = require('mongoose');
const Unidade = mongoose.model('Unidade');


exports.new = (req, res, next) => {
    
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    Unidade.create(req.body, (err, unidade) =>  {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });

        res.status(201).json({ success: true, ...unidade["_doc"]});
    });
}

exports.newList = (req, res, next) => {

    req.body.forEach(unidade => {
        if (!("id_status" in unidade))
            unidade["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Unidade.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Unidade.find({})
    .select("nome cidade uf id_status")
    .populate({path : 'id_status', select: '-_id'})
    .then((unidades) => {
        
        if (!unidades.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: unidades.length, ...unidades});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (req, res, next) => {

	Unidade.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome")
    .then((unidades) => {
        
        if (!unidades.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: unidades.length, ...unidades});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, next) => { // colocar um && pra procurar por id tbm

    Unidade.findOne({ _id: req.params.id })
    .populate({path : 'id_status', select: '-_id'})
    .then((unidade) => {
        
        if (!unidade)
			return res.status(204).json();
        
		res.status(200).json({ success: true, 'unidade': unidade});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Unidade.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}

exports.delete = (req, res, nxt) => {

    Unidade.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}

exports.deleteAll = (req, res, nxt) => {
    
    Unidade.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}