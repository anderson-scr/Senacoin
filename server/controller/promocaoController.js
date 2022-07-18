const mongoose = require('mongoose');
const Promocao = mongoose.model('Promocao');


exports.new = (req, res, next) => {

    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    Promocao.create(req.body, (err, promocao) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        res.status(201).json({ success: true, ...promocao["_doc"]});
    });
}

exports.newList = (req, res, next) => {
    
    req.body.forEach(promocao => {
        if (!("id_status" in promocao))
            promocao["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Promocao.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Promocao.find({})
    .select("titulo descricao desconto id_unidade id_status")
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json({ success: false, msg: "nenhuma promoção encontrada" });  
        else
            res.status(200).json(promocoes);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez .toISOString() no final
	Promocao.find({$and: [{id_status: "62cec6c463187bb9b498687b"}, {data_inicio: {$gte: today}}, {data_fim: {$lt: today}}]})
    .select("titulo pontos desconto id_item id_unidade -_id")
	.populate({path : 'id_item' , select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json({ success: false, msg: "nenhuma promoção encontrada" });  
        else
            res.status(200).json(promocoes);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {

    Promocao.findOne({ _id: req.params.id})
    .select('-_id')
    .populate({path : 'id_item' , select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((promocao) => {
        
        if (!promocao)
            return res.status(204).json({ success: false, msg: "promoção não encontrada" });  
        else
            res.status(200).json(promocao);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Promocao.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    Promocao.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}
