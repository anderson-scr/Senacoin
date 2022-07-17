const mongoose = require('mongoose');
const Status = mongoose.model('Status');


exports.new = (req, res, next) => {
	const novoStatus = new Status({
		nome: req.body.nome,
    });
    
    try 
	{
        novoStatus.save()
        .then((status) => {
            res.status(201).json({ success: true, id: status._id, nome: status.nome});
        });
    }
	catch (err) {
        res.json({ success: false, msg: err });
    }
}

exports.listAll = (req, res, next) => {
	Status.find({})
	.select('-__v')
    .then((status) => {
        
        if (!status)
            return res.status(204).json({ success: false, msg: "nenhum status encontrado" });  
        else
			res.status(200).json(status);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {
    Status.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id -__v')
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
