const mongoose = require('mongoose');
const Perfil = mongoose.model('Perfil');
const AuditoriaPerfil = mongoose.model('AuditoriaPerfil');


exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    if (!("ativo" in req.body))
        req.body["ativo"] = true;

    const session = await mongoose.startSession();
	try {
		await session.withTransaction(async () => {

			await Perfil.create([req.body], { session })
			.then(async (perfil) => {
				await AuditoriaPerfil.create([{colaborador: req.jwt.sub, ...req.body}], { session })
				.then((_audperfil) =>{
					res.status(201).json({ success: true, ...perfil[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

    req.body.forEach(perfil => {
        if (!("ativo" in perfil))
            perfil["ativo"] = true;
    });
    
    Perfil.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (_req, res, _next) => {

	Perfil.find({})
    .select("nome ativo")
    .then((perfis) => {
        
        if (!perfis.length)
            return res.status(204).json();  
        else
            res.status(200).json(perfis);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {

	Perfil.find({ativo: true})
    .select("-ativo")
    .then((perfis) => {
        
        if (!perfis.length)
            return res.status(204).json();  
        else
            res.status(200).json(perfis);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {

    Perfil.findById(req.params.id)// colocar um && pra procurar por id tbm
    .then((perfil) => {
        
        if (!perfil)
			return res.status(204).json();
        
		res.status(200).json({ success: true, 'perfil': perfil});
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

			await Perfil.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
			.then(async (perfil) => {
				await AuditoriaPerfil.create([{colaborador: req.jwt.sub, ...req.body}], { session })
				.then((_audperfil) =>{
					res.status(201).json({ success: true, ...perfil[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

			await Perfil.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
			.then(async (perfil) => {
				await AuditoriaPerfil.create([{colaborador: req.jwt.sub, ...req.body}], { session })
				.then((_audperfil) =>{
					res.status(201).json({ success: true, ...perfil[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
    
    Perfil.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}