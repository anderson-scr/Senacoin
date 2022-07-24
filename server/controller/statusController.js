const mongoose = require('mongoose');
const Status = mongoose.model('Status');


exports.new = (req, res, next) => {

    Status.create(req.body, (err, status) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        res.status(201).json({ success: true, ...status["_doc"]});
    });
}

exports.newList = (req, res, next) => {
    
    Status.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Status.find({})
    .then((status) => {
        
        if (!status.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: status.length, ...status});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    Status.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    Status.findByIdAndDelete(req.params.id, (err, doc) => {
		if (err)
			res.status(500).json(err);
		else
			res.status(200).json(doc);
	});
}

exports.deleteAll = (req, res, nxt) => {
    
    Status.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json(err)));
}