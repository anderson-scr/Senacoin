const mongoose = require('mongoose');
const QrCode = mongoose.model('QrCode');
const AuditoriaQrCode = mongoose.model('AuditoriaQrCode');


exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    if (!("ativo" in req.body))
        req.body["ativo"] = true;
    
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await QrCode.create([req.body], { session })
            .then(async (qrcode) => {
                await AuditoriaQrCode.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audqrcode) =>{
                    res.status(201).json({ success: true, ...qrcode[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
                })
                .catch(async (err) => {
                    await session.abortTransaction();
                    res.status(500).json({ success: false, msg: `${err}` });
                });
            })
            .catch(async (err) => {
                await session.abortTransaction();
                res.status(500).json({ success: false, msg: `${err}` });
            })
        });
    } catch (err) {
        res.status(500).json({ success: false, msg: `${err}` });
    } finally {
        await session.endSession();
    }
}

exports.newList = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    req.body.forEach(qrcode => {
        if (!("ativo" in qrcode))
            qrcode["ativo"] = true;
    });
    
    QrCode.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, _next) => {

	QrCode.find({}).skip(req.params.offset || 0).limit(60)
    .select("nome descricao id_unidade ativo")
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .then((qrcodes) => {
        
        if (!qrcodes.length)
            return res.status(204).json();  
        else
            res.status(200).json(qrcodes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (req, res, _next) => {

	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez .toISOString() no final

	QrCode.find({$and: [{ativo: true}, {data_inicio: {$gte: today}}, {data_fim: {$lt: today}}]}).skip(req.params.offset || 0).limit(60)
    .select("-ativo -_id")
	.populate({path : 'id_item', select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade', select: 'nome -_id'})
    .then((qrcodes) => {
        
        if (!qrcodes.length)
            return res.status(204).json();  
        else
            res.status(200).json(qrcodes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {

    QrCode.findById(req.params.id)
    .select('-_id')
    .populate({path : 'id_item', select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .then((qrcode) => {
        
        if (!qrcode)
            return res.status(204).json();  
            else
            res.status(200).json(qrcode);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.edit = async (req, res, _nxt) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await QrCode.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
            .then(async (qrcode) => {
                await AuditoriaQrCode.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audqrcode) =>{
                    res.status(201).json({ success: true, ...qrcode[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
                })
                .catch(async (err) => {
                    await session.abortTransaction();
                    res.status(500).json({ success: false, msg: `${err}` });
                });
            })
            .catch(async (err) => {
                await session.abortTransaction();
                res.status(500).json({ success: false, msg: `${err}` });
            })
        });
    } catch (err) {
        res.status(500).json({ success: false, msg: `${err}` });
    } finally {
        await session.endSession();
    }
}

exports.delete = async (req, res, _nxt) => {

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await QrCode.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
            .then(async (qrcode) => {
                await AuditoriaQrCode.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audqrcode) =>{
                    res.status(201).json({ success: true, ...qrcode[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
                })
                .catch(async (err) => {
                    await session.abortTransaction();
                    res.status(500).json({ success: false, msg: `${err}` });
                });
            })
            .catch(async (err) => {
                await session.abortTransaction();
                res.status(500).json({ success: false, msg: `${err}` });
            })
        });
    } catch (err) {
        res.status(500).json({ success: false, msg: `${err}` });
    } finally {
        await session.endSession();
    }
}

exports.deleteAll = (_req, res, _nxt) => {
    
    QrCode.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}