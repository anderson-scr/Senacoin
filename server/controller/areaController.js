const mongoose = require('mongoose');
const Area = mongoose.model('Area');
const AuditoriaArea = mongoose.model('AuditoriaArea');



exports.new = async (req, res, next) => {

    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Area.create([req.body], { session })
            .then(async (area) => {
                await AuditoriaArea.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audarea) =>{
                    res.status(201).json({ success: true, ...area[0]["_doc"]}) // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

    req.body.forEach(area => {
        if (!("id_status" in area))
            area["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Area.insertMany(req.body, (err,docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Area.find({})
    .select("nome descricao id_unidade id_status")
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((areas) => {
        
        if (!areas.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: areas.length, ...areas});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (req, res, next) => {
    
	Area.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_unidade -_id")
    .then((areas) => {
        
        if (!areas.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: areas.length, ...areas});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, next) => {

	Area.findOne({ _id: req.params.id })
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .populate({path : 'id_status', select: '-_id'})
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

exports.edit = async (req, res, nxt) => {

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

exports.delete = async (req, res, nxt) => {

    const session = await mongoose.startSession();
	try {    
		await session.withTransaction(async () => {
		
			await Area.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, { session: session, new: true})
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

exports.deleteAll = (req, res, nxt) => {
    
    Area.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}