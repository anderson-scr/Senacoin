const mongoose = require('mongoose');
const Area = mongoose.model('Area');
const AuditoriaArea = mongoose.model('AuditoriaArea');



exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    if (!("ativo" in req.body))
        req.body["ativo"] = true;

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Area.create([req.body], { session })
            .then(async (area) => {
                await AuditoriaArea.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audarea) =>{
                    res.status(201).json({ success: true, ...area[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

    req.body.forEach(area => {
        if (!("ativo" in area))
            area["ativo"] = true;
    });
    
    Area.insertMany(req.body, (err,docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (_req, res, _next) => {

	Area.find({})
    .select("nome descricao id_unidade ativo")
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .then((areas) => {
        
        if (!areas.length)
            return res.status(204).json();  
        else
            res.status(200).json(areas);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {
	Area.find({ativo: true})
    .select("nome id_unidade")
    .then((areas) => {
        
        if (!areas.length)
            return res.status(204).json();  
        else
            res.status(200).json(areas);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {
	Area.findOne({ _id: req.params.id })
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    
    .then((area) => {
        
        if (!area)
            return res.status(204).json();  
        else
            res.status(200).json(area);
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
		
			await Area.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
			.select('-_id')
			.then(async (area) => {
				if (!area)
					return res.status(204).json();

				await AuditoriaArea.create([{responsavel: req.jwt.sub,  ...area._doc}], { session })
				.then((audarea) =>{
					res.status(200).json({ success: true, ...audarea[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
		
			await Area.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
			.select('-_id')
			.then(async (area) => {
				if (!area)
					return res.status(204).json();

				await AuditoriaArea.create([{responsavel: req.jwt.sub,  ...area._doc}], { session })
				.then((audarea) =>{
					res.status(200).json({ success: true, ...audarea[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
    
    Area.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}