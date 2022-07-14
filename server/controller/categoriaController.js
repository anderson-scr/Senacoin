const mongoose = require('mongoose');
const SubCategoria = mongoose.model('Categoria');


exports.new = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de adicionar subcategoria."});
}

exports.listAll = (req, res, next) => {
	SubCategoria.find({})
    .select("nome descricao id_status")
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((subcats) => {
        
        if (subcats.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma subcategoria encontrada" });  
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
            return res.status(401).json({ success: false, msg: "nenhuma subcategoria encontrada" });  
        else
            {
                res.status(200).json(subcats);
            }
    })
    .catch((err) => {
        next(err);
    });
}