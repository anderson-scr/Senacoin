const mongoose = require('mongoose');
const Categoria = mongoose.model('Categoria');


exports.new = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de adicionar categoria."});
}

exports.listAll = (req, res, next) => {
	Categoria.find({})
    .select("nome descricao id_status")
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((categorias) => {
        
        if (categorias.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma categoria encontrada" });  
        else
            {
                res.status(200).json(categorias);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	Categoria.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome -_id")
    .then((categorias) => {
        
        if (categorias.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma categoria encontrada" });  
        else
            {
                res.status(200).json(categorias);
            }
    })
    .catch((err) => {
        next(err);
    });
}