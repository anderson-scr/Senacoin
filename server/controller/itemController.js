const { randomUUID } = require('crypto');
const mongoose = require('mongoose');
const path = require('path');
const Item = mongoose.model('Item');
const AuditoriaItem = mongoose.model('AuditoriaItem');


function getIdbyName(item) {
	
	let categoria;
	if (item === 'produto')
		categoria = mongoose.Types.ObjectId("62d017a1181c3910ccfd43d1");
	else if (item === 'evento')
		categoria = mongoose.Types.ObjectId("62d017a1181c3910ccfd43d2");
	else if (item === 'servico')
		categoria = mongoose.Types.ObjectId("62d017a1181c3910ccfd43d3");
	
	return categoria;
}

exports.new = async (req, res, next) => {
    
    // >>> só ta aqui por causa do postman <<<
    req.body = {...JSON.parse(req.body.data)}
    
    categoria = getIdbyName(req.params.categoria);
	if (!categoria)
        return res.status(400).json({msg: "categoria de item inexistente."});
    
    req.body["id_categoria"] = categoria;
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

	// nome e caminho do arquivo
	const img = req.files.imagem;
	const caminho = path.join('uploads', `${randomUUID()}${path.extname(img.name)}`);
	req.body.imagem = caminho;

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Item.create([req.body], { session })
            .then(async (item) => {
                await AuditoriaItem.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_auditem) =>{
                    // mv() é usada para colocar o arquivo na pasta do servidor
                    img.mv(path.join(__basedir, caminho), async (err) =>{
                        if(err)
                        {
                            await session.abortTransaction();
                            res.status(500).json({ success: false, msg: `${err}` });
                        }
                        else
                            res.status(201).json({ success: true, ...item[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

exports.newList = (req, res, next) => {

    req.body.forEach(item => {
        if (!("id_status" in item))
            item["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Item.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Item.find({}).skip(req.params.offset).limit(60)
    .select("nome id_area id_categoria id_unidade pontos id_status")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_categoria', select: 'nome -_id'})
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((itens) => {  
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: itens.length, ...itens});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listAllByCategory = (req, res, next) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

	Item.find({id_categoria: categoria}).skip(req.params.offset).limit(60)
    .select("nome id_area id_unidade pontos id_status")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((itens) => {
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: itens.length, ...itens});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (req, res, next) => {

	Item.find({id_status: "62cec6c463187bb9b498687b"}).skip(req.params.offset).limit(60)
    .select("nome id_area id_categoria id_subcategoria id_unidade")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_categoria', select: 'nome -_id'})
    .populate({path : 'id_subcategoria', select: 'nome -_id'})
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .then((itens) => {   
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: itens.length, ...itens});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActiveByCategory = (req, res, next) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

	Item.find({id_categoria: categoria, id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_area id_unidade pontos descricao imagem")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .then((itens) => {
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: itens.length, ...itens});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, next) => {
	
	Item.findOne({ _id: req.params.id })
    .populate({path : 'id_area', select: 'nome -_id'})
    .populate({path : 'id_categoria', select: 'nome -_id'})
    .populate({path : 'id_subcategoria', select: 'nome -_id'})
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((item) => {   
        if (!item)
			return res.status(204).json();
        
		res.status(200).json({ success: true, item});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.edit = async (req, res, nxt) => {

    const session = await mongoose.startSession();
	try {    
		await session.withTransaction(async () => {
		
			await Item.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
			.select('-_id')
			.then(async (item) => {
				if (!item)
					return res.status(204).json();

				await AuditoriaItem.create([{responsavel: req.jwt.sub,  ...item._doc}], { session })
				.then((auditem) =>{
					res.status(200).json({ success: true, ...auditem[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

exports.delete = async (req, res, nxt) => {

    const session = await mongoose.startSession();
	try {    
		await session.withTransaction(async () => {
		
			await Item.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, { session: session, new: true})
			.select('-_id')
			.then(async (item) => {
				if (!item)
					return res.status(204).json();

				await AuditoriaItem.create([{responsavel: req.jwt.sub,  ...item._doc}], { session })
				.then((auditem) =>{
					res.status(200).json({ success: true, ...auditem[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

exports.deleteAll = (req, res, nxt) => {

    Item.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}