const { randomUUID } = require('crypto');
const mongoose = require('mongoose');
const path = require('path');
const Promocao = mongoose.model('Promocao');
const AuditoriaPromocao = mongoose.model('AuditoriaPromocao');


exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    // >>> só ta aqui por causa do postman <<<
    // req.body = {...JSON.parse(req.body.data)}

    if (!("ativo" in req.body))
        req.body["ativo"] = true;

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Promocao.create([req.body], { session })
            .then(async (promocao) => {
                await AuditoriaPromocao.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then(async (_audpromocao) =>{
                    res.status(201).json({ success: true, ...promocao[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
        if (!("ativo" in promocao))
            promocao["ativo"] = true;
    });
    
    Promocao.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (_req, res, _next) => {

	Promocao.find({})
    .select("nome descricao data_inicio data_fim multiplicador id_unidade ativo -_id")
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json();  
        else
            res.status(200).json(promocoes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {

	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez
	Promocao.find({$and: [{ativo: true}, {data_inicio: {$lt: today}}, {data_fim: {$gte: today}}]})
    .select("nome multiplicador id_unidade")
	.populate({path : 'id_unidade', select: 'nome -_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json();  
        else
            res.status(200).json(promocoes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {

    Promocao.findById(req.params.id)
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
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

exports.getActivePromo = async (unidades) => {

    let _promocoes;
    const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4

	await Promocao.find({$and: [{ativo: true}, {data_inicio: {$lt: today}}, {data_fim: {$gte: today}}, {id_unidade: {$in: unidades}}]})
    .select("multiplicador id_unidade")
    .then((promocoes) => {
        if (!promocoes.length)
            console.log('não foi encontrado nenhuma promoção');
        _promocoes = promocoes;
    })
    .catch((err) => {
        console.log({success: false, msg: `${err}`});
    });
    return _promocoes;
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
		
			await Promocao.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
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
      imagem.mv(`${__basedir}/uploads/promocao/` + imagem.name);

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