const mongoose = require('mongoose');
const SubCategoria = mongoose.model('SubCategoria');


exports.new = (req, res, next) => {
	const novaSubCategoria = new SubCategoria({
		nome: req.body.titulo,
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
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((subcats) => {
        
        if (subcats.length === 0)
            return res.status(204).json({ success: false, msg: "nenhuma subcategoria encontrada" });  
        else
            {
                res.status(200).json(subcats);
            }
    })
    .catch((err) => {
        next(err);
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
        next(err);
    });
}