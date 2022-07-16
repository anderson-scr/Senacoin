const mongoose = require('mongoose');
const QrCode = mongoose.model('QrCode');


exports.new = (req, res, next) => {
    const novoQrCode = new QrCode({

		titulo: req.body.titulo,
		descricao: req.body.descricao,
		id_item: mongoose.Types.ObjectId(req.body.id_item), //se não passar por padrao ta nulo
		id_unidade: mongoose.Types.ObjectId(req.body.id_unidade),
		unico: req.body.radioUnico, //isso ta zoado mas eu ja não to mais raciocinando.
		diario: req.body.radioDiario,
		semanal: req.body.radioSemanal,
		mensal: req.body.radioMensal,
		url: req.body.url,
		data_inicio: new Date(req.body.data_inicio),
		data_fim: new Date(req.body.data_fim),
		quantidade: req.body.quantidade, //aqui é o id_senacion ou a quantidade?
        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novoQrCode.save()
        .then((qrcode) => {
            res.status(201).json({ success: true, id: qrcode._id, nome: qrcode.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}


exports.listAll = (req, res, next) => {
	QrCode.find({})
    .select("titulo descricao id_unidade id_status")
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((qrcodes) => {
        
        if (qrcodes.length === 0)
            return res.status(204).json({ success: false, msg: "nenhum qr code encontrado" });  
        else
            {
                res.status(200).json(qrcodes);
            }
    })
    .catch((err) => {
        next(err);
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
        
        if (qrcodes.length === 0)
            return res.status(204).json({ success: false, msg: "nenhum qr code encontrado" });  
        else
            {
                res.status(200).json(qrcodes);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
    QrCode.findOne({ _id: req.params.id})
    .select('-_id')
    .populate({path : 'id_item' , select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((qrcodes) => {
        
        if (qrcodes.length === 0)
            return res.status(204).json({ success: false, msg: "nenhum qr code encontrado" });  
        else
            {
                res.status(200).json(qrcodes);
            }
    })
    .catch((err) => {
        next(err);
    });
}
