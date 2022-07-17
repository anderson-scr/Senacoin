const mongoose = require('mongoose');
const QrCode = mongoose.model('QrCode');


exports.new = (req, res, next) => {
    
    QrCode.create({...req.body, id_status: "62cec6c463187bb9b498687b"}, (err, qrcode) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        res.status(201).json({ success: true, ...qrcode["_doc"]});
    });
}

exports.newList = (req, res, next) => {
    
    req.body.forEach(qrcode => {
        qrcode["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    QrCode.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	QrCode.find({})
    .select("titulo descricao id_unidade id_status")
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((qrcodes) => {
        
        if (!qrcodes.length)
            return res.status(204).json({ success: false, msg: "nenhum qr code encontrado" });  
        else
            res.status(200).json(qrcodes);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez .toISOString() no final
	console.log(today)

	QrCode.find({$and: [{id_status: "62cec6c463187bb9b498687b"}, {data_inicio: {$gte: today}}, {data_fim: {$lt: today}}]})
    .select("-id_status -_id")
	.populate({path : 'id_item' , select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((qrcodes) => {
        
        if (!qrcodes.length)
            return res.status(204).json({ success: false, msg: "nenhum qr code encontrado" });  
        else
            res.status(200).json(qrcodes);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {

    QrCode.findOne({ _id: req.params.id})
    .select('-_id')
    .populate({path : 'id_item' , select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((qrcode) => {
        
        if (!qrcode)
            return res.status(204).json({ success: false, msg: "qr code não encontrado" });  
            else
            res.status(200).json(qrcode);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    QrCode.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    QrCode.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}
