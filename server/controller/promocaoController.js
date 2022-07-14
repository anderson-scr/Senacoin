const mongoose = require('mongoose');
const Promocao = mongoose.model('Promocao');


exports.new = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de adicionar promocao."});
}


exports.listAll = (req, res, next) => {
	Promocao.find({})
    .select("titulo descricao desconto id_unidade id_status")
	.populate({path : 'id_unidade' , select: 'nome -_id'})
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((promocoes) => {
        
        if (promocoes.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma promocao encontrada" });  
        else
            {
                res.status(200).json(promocoes);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez .toISOString() no final
	console.log(today)
	Promocao.find({$and: [{id_status: "62cec6c463187bb9b498687b"}, {data_inicio: {$gte: today}}, {data_fim: {$lt: today}}]})
    .select("titulo pontos desconto id_item id_unidade -_id")
	.populate({path : 'id_item' , select: 'nome area categoria -_id'})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((promocoes) => {
        
        if (promocoes.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma promocao encontrada" });  
        else
            {
                res.status(200).json(promocoes);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
    Promocao.findOne({ _id: req.params.id})
    .select('-_id')
    .populate({path : 'id_item' , select: 'nome area categoria -_id'})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((promocoes) => {
        
        if (promocoes.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma promocao encontrada" });  
        else
            {
                res.status(200).json(promocoes);
            }
    })
    .catch((err) => {
        next(err);
    });
}
