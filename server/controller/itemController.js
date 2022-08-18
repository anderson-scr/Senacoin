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

exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    // >>> só ta aqui por causa do postman <<<
    // req.body = {...JSON.parse(req.body.data)}
    
    categoria = getIdbyName(req.params.categoria);
	if (!categoria)
        return res.status(400).json({msg: "categoria de item inexistente."});
    req.body["id_categoria"] = categoria;
    
    if (!("ativo" in req.body))
        req.body["ativo"] = true;

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            
            await Item.create([req.body], { session })
            .then(async (item) => {
                await AuditoriaItem.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then(async (_auditem) =>{
                    res.status(201).json({ success: true, ...item[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
                })
                .catch(async (err) => {
                    await session.abortTransaction();
                    res.status(500).json({ success: false, msg: `${err}2` });
                });
            })
            .catch(async (err) => {
                await session.abortTransaction();
                res.status(500).json({ success: false, msg: `${err}3` });
            })
        });
    } catch (err) {
        res.status(500).json({ success: false, msg: `${err}4` });
    } finally {
        await session.endSession();
    }
}

exports.newList = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    req.body.forEach(item => {
        if (!("ativo" in item))
            item["ativo"] = true;
    });
    
    Item.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, _next) => {
	Item.find({}).skip(req.params.offset || 0).limit(60)
    .select("nome id_area id_categoria quantidade id_subcategoria id_unidade pontos ativo")
	.populate({path : 'id_area', select: 'nome -_id'}) 
    .populate({path : 'id_categoria', select: 'nome -_id'})
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .populate({path : 'id_subcategoria', select: 'nome -_id'})
    .then((itens) => {  
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json(itens);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listAllByCategory = (req, res, _next) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

	Item.find({id_categoria: categoria}).skip(req.params.offset || 0).limit(60)
    .select("nome id_area id_unidade pontos ativo")
	.populate({path : 'id_area', select: 'nome -_id'}) 
    .populate({path : 'id_unidade', select: 'nome -_id'})
    
    .then((itens) => {
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json(itens);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (req, res, _next) => {

	Item.find({ativo: true}).skip(req.params.offset || 0).limit(60)
    .select("nome pontos id_area id_categoria id_subcategoria id_unidade")
	.populate({path : 'id_area', select: 'nome -_id'}) 
    .populate({path : 'id_categoria', select: 'nome -_id'})
    .populate({path : 'id_subcategoria', select: 'nome -_id'})
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .then((itens) => {   
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json(itens);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActiveByCategory = (req, res, _next) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

	Item.find({id_categoria: categoria, ativo: true})
    .select("nome pontos id_area id_unidade pontos descricao imagem")
	.populate({path : 'id_area', select: 'nome -_id'}) 
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .then((itens) => {
        if (!itens.length)
            return res.status(204).json();  
        else
			res.status(200).json(itens);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {
	
	Item.findById(req.params.id )
    .populate({path : 'id_area', select: 'nome -_id'})
    .populate({path : 'id_categoria', select: 'nome -_id'})
    .populate({path : 'id_subcategoria', select: 'nome -_id'})
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    
    .then((item) => {   
        if (!item)
			return res.status(204).json();
        
		res.status(200).json({ success: true, item});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.getInfo = async (id) => {
    let _item;
    await Item.findById(id)
    .select('pontos horas ativo -_id')
    .then((item) => {   
        if (!item)
            console.log({success: false, msg: "item não encontrado"});
		_item = item;
    })
    .catch((err) => {
        console.log({success: false, msg: `${err}`});
    });
    return _item;
}

exports.edit = async (req, res, _nxt) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

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

exports.delete = async (req, res, _nxt) => {

    const session = await mongoose.startSession();
	try {    
		await session.withTransaction(async () => {
		
			await Item.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
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

exports.deleteAll = (_req, res, _nxt) => {

    Item.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}


// For img
exports.newImg = async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      })
    } else {
      let imagem = req.files.selectedFile;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      imagem.mv(`${__basedir}/uploads/${req.params.categoria}/` + imagem.name);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: imagem.name,
          mimetype: imagem.mimetype,
          size: imagem.size
       }
      })
    }
  } catch (err) {
      res.status(500).json({ success: false, msg: `${err}` })
  }
}