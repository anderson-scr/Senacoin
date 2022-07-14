const mongoose = require('mongoose');
const Unidade = mongoose.model('Unidade');


exports.new = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de adicionar unidade."});
}

exports.listAll = (req, res, next) => {
	Unidade.find({})
    .select("nome cidade uf id_status")
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((unidades) => {
        
        if (unidades.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma unidade encontrada" });  
        else
            {
                res.status(200).json(unidades);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	Unidade.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome")
    .then((unidades) => {
        
        if (unidades.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma unidade encontrada" });  
        else
            {
                res.status(200).json(unidades);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {// colocar um && pra procurar por id tbm

    Unidade.findOne({ nome: req.body.nome })
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((unidade) => {
        
        if (!unidade)
			return res.status(401).json({ success: false, msg: "unidade não encontrada" });
        
		res.status(200).json({ success: true, 'unidade': unidade});
		console.log(unidade)
    })
    .catch((err) => {
        next(err);
    });
}