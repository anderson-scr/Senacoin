const { randomUUID } = require('crypto');
const mongoose = require('mongoose');
const path = require('path');
const Promocao = mongoose.model('Promocao');
const AuditoriaPromocao = mongoose.model('AuditoriaPromocao');


exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    // >>> só ta aqui por causa do postman <<<
    req.body = {...JSON.parse(req.body.data)}

    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

   // nome e caminho do arquivo
	const img = req.files.imagem;
	const caminho = path.join('uploads', `${randomUUID()}${path.extname(img.name)}`);
	req.body.imagem = caminho;

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Promocao.create([req.body], { session })
            .then(async (promocao) => {
                await AuditoriaPromocao.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audpromocao) =>{
                    // mv() é usada para colocar o arquivo na pasta do servidor
                    img.mv(path.join(__basedir, caminho), async (err) =>{
                        if(err)
                        {
                            await session.abortTransaction();
                            res.status(500).json({ success: false, msg: `${err}` });
                        }
                        else
                            res.status(201).json({ success: true, ...promocao[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
                    });
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

    req.body.forEach(promocao => {
        if (!("id_status" in promocao))
            promocao["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Promocao.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (_req, res, _next) => {

	Promocao.find({})
    .select("titulo descricao desconto id_unidade id_status")
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: promocoes.length, ...promocoes});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {

	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez .toISOString() no final
	Promocao.find({$and: [{id_status: "62cec6c463187bb9b498687b"}, {data_inicio: {$gte: today}}, {data_fim: {$lt: today}}]})
    .select("titulo pontos desconto id_item id_unidade -_id")
	.populate({path : 'id_item', select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade', select: 'nome -_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: promocoes.length, ...promocoes});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {

    Promocao.findById(req.params.id)
    .select('-_id')
    .populate({path : 'id_item' , select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((promocao) => {
        
        if (!promocao)
            return res.status(204).json();  
        else
            res.status(200).json(promocao);
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
		
			await Promocao.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
			.select('-_id')
			.then(async (promocao) => {
				if (!promocao)
					return res.status(204).json();

				await AuditoriaPromocao.create([{responsavel: req.jwt.sub,  ...promocao._doc}], { session })
				.then((audpromocao) =>{
					res.status(200).json({ success: true, ...audpromocao[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
		
			await Promocao.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, { session: session, new: true})
			.select('-_id')
			.then(async (promocao) => {
				if (!promocao)
					return res.status(204).json();

				await AuditoriaPromocao.create([{responsavel: req.jwt.sub,  ...promocao._doc}], { session })
				.then((audpromocao) =>{
					res.status(200).json({ success: true, ...audpromocao[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
    
    Promocao.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}