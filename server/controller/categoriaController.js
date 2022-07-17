const mongoose = require('mongoose');
const SubCategoria = mongoose.model('SubCategoria');


exports.new = (req, res, next) => {
	const novaSubCategoria = new SubCategoria({
		nome: req.body.nome,
		descricao: req.body.descricao,
        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novaSubCategoria.save()
        .then((subcat) => {
            res.status(201).json({ success: true, id: subcat._id, nome: subcat.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}

exports.listAll = (req, res, next) => {
	SubCategoria.find({})
    .select("nome descricao id_status")
    .populate({path : 'id_status' , select: '-_id'})
    .then((subcats) => {
        
        if (subcats.length === 0)
            return res.status(204).json({ success: false, msg: "nenhuma subcategoria encontrada" });  
        else
            {
                res.status(200).json(subcats);
            }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {
	SubCategoria.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome -_id")
    .then((subcats) => {
        
        if (subcats.length === 0)
            return res.status(204).json({ success: false, msg: "nenhuma subcategoria encontrada" });  
        else
            {
                res.status(200).json(subcats);
            }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {
	SubCategoria.findOne({ _id: req.params.id })
    .populate({path : 'id_status' , select: '-_id'})
    .then((subcat) => {
        
        if (!subcat)
            return res.status(204).json({ success: false, msg: "nenhuma subcategoria encontrada" });  

        res.status(200).json(subcat);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {
    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    SubCategoria.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {
    SubCategoria.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}
