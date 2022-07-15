const mongoose = require('mongoose');
const Area = mongoose.model('Area');


exports.new = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de adicionar area."});
}

exports.listAll = (req, res, next) => {
	Area.find({})
    .select("nome descricao id_status")
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((areas) => {
        
        if (areas.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma area encontrada" });  
        else
            {
                res.status(200).json(areas);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	Area.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome -_id")
    .then((areas) => {
        
        if (areas.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma area encontrada" });  
        else
            {
                res.status(200).json(areas);
            }
    })
    .catch((err) => {
        next(err);
    });
}