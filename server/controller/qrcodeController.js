const mongoose = require('mongoose');
const promocao = require('./promocaoController');
const item = require('./itemController');
const senacoin = require('./senacoinController');
const aluno = require('./alunoController');
const QrCode = mongoose.model('QrCode');
const AuditoriaQrCode = mongoose.model('AuditoriaQrCode');
const transacao = require('./transacaoController');

exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas." });
    
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
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas." });
    
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
exports.use = (req, res, _next) => {

    QrCode.findById(req.params.id)
    .then(async (qrcode) => {
        if (!qrcode)
            return res.status(204).json();  
        if (!qrcode.ativo)
            return res.status(410).json({success: false, msg: "qrcode expirado."});
        if (qrcode.data_inicio.getTime() > Date.now() || qrcode.data_fim.getTime() < Date.now())
            return res.status(410).json({success: false, msg: "qrcode expirado."});

        let vStatusObjResposta = [];
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            let jaFoiUtilizado = false;
            if (qrcode.unico)
                jaFoiUtilizado = await aluno.verificaQrCode(req.jwt.sub, "qrcode_unico", qrcode._id, session);
            else if (qrcode.diario)
                jaFoiUtilizado = await aluno.verificaQrCode(req.jwt.sub, "qrcode_diario", qrcode._id, session);
            else if (qrcode.semanal)
                jaFoiUtilizado = await aluno.verificaQrCode(req.jwt.sub, "qrcode_semanal", qrcode._id, session);
            else if (qrcode.mensal)
                jaFoiUtilizado = await aluno.verificaQrCode(req.jwt.sub, "qrcode_mensal", qrcode._id, session);
            
            if (jaFoiUtilizado)
            {
                await session.endSession();
                vStatusObjResposta.push(410);
                vStatusObjResposta.push({success: false, msg: "qr code já utilizado."});
                return;
            }
            
            let promocaoUtilizada = {id: null, multiplicador: 0};
            promocoes = await promocao.getActivePromo(qrcode.id_unidade);
            if (promocoes)
            {
                promocoes.forEach(promo => {
                    if (promo.multiplicador > promocaoUtilizada.multiplicador)
                    {
                        promocaoUtilizada.id = promo._id
                        promocaoUtilizada.multiplicador = promo.multiplicador;
                    }
                });
            }

            console.log('mult = ', promocaoUtilizada.multiplicador); //nao passei aqi
            let lote;
            if (qrcode.id_item)
            {
                const infoItem = await item.getInfo(qrcode.id_item);
                if (!infoItem.ativo)
                {
                    await session.endSession();
                    vStatusObjResposta.push(410);
                    vStatusObjResposta.push({success: false, msg: "item inativo."});
                    return;
                }
                
                let duracao;
                if (infoItem.horas > 20)
                    duracao = Date.now() - 4*60*60*1000 + 1.5*infoItem.horas*60*60*1000; // fuso horario gmt-4 + 1.5 x duracao do item
                
                lote = await senacoin.new(req.jwt.sub, infoItem.pontos*promocaoUtilizada.multiplicador, duracao, session);
            }
            else
            {
                lote = await senacoin.new(req.jwt.sub, qrcode.pontos*promocaoUtilizada.multiplicador, undefined, session);
            }
            
            if (! await aluno.atualizaSaldo(req.jwt.sub, lote._id, qrcode.id_unidade, session))
            {
                await session.endSession();
                vStatusObjResposta.push(500);
                vStatusObjResposta.push({success: false, msg: "erro na hora de converter o qr code."});
                return;
            }

            if (! await transacao.new(req.jwt.sub, null, lote._id, lote.pontos, 1, qrcode.id_item ,qrcode._id, promocaoUtilizada.id, session))
            {
                await session.endSession();
                vStatusObjResposta.push(500);
                vStatusObjResposta.push({success: false, msg: "erro na hora de salvar a transacao."});
                return;   
            }
            
        });
        await session.endSession();
        
        if (!vStatusObjResposta.length)
        {
            vStatusObjResposta.push(200);
            vStatusObjResposta.push({success: true, msg: "qr code convertido."});
        }

        console.log(`res.status(${vStatusObjResposta[0]}).json(${vStatusObjResposta[1]})`);
        return res.status(vStatusObjResposta[0]).json(vStatusObjResposta[1]);
    })
    .catch((err) => {
        console.log({success: false, msg: `${err}`}); //res.status(500).json
    });
}

exports.listAll = (req, res, _next) => {

	QrCode.find({}).skip(req.params.offset || 0).limit(60)
    .select("nome descricao id_unidade pontos ativo data_inicio data_fim")
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .then((qrcodes) => {
        if (!qrcodes.length)
            return res.status(204).json(qrcodes);
        else
            res.status(200).json(qrcodes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (req, res, _next) => {

	const today = Date.now() - 3600*1000*4; //fuso horario gmt-4 talvez

	QrCode.find({$and: [{ativo: true}, {data_inicio: {$lt: today}}, {data_fim: {$gte: today}}]}).skip(req.params.offset || 0).limit(60)
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
            .select('-_id')
            .then(async (qrcode) => {
                if (!qrcode)
                    return res.status(204).json();
                await AuditoriaQrCode.create([{colaborador: req.jwt.sub, ...qrcode._doc}], { session })
                .then((audqrcode) =>{
                    res.status(201).json({ success: true, ...audqrcode[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
                await AuditoriaQrCode.create([{colaborador: req.jwt.sub, ...qrcode._doc}], { session })
                .then((audqrcode) =>{
                    res.status(201).json({ success: true, ...audqrcode[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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