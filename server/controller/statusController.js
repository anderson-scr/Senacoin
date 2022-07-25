const mongoose = require('mongoose');
const Status = mongoose.model('Status');


exports.new = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    Status.create(req.body, (err, status) =>  {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });

        res.status(201).json({ success: true, ...status["_doc"]});
    });
}

exports.newList = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    Status.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (_req, res, _next) => {

	Status.find({})
    .then((status) => {
        
        if (!status.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: status.length, ...status});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.edit = (req, res, _nxt) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    Status.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}

exports.delete = (req, res, _nxt) => {

    Status.findByIdAndDelete(req.params.id, (err, doc) => {
		if (err)
			res.status(500).json({success: false, msg: `${err}`});
		else
			res.status(200).json(doc);
	});
}

exports.deleteAll = (_req, res, _nxt) => {
    
    Status.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}