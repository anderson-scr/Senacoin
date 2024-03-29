const mongoose = require('mongoose');
const Colaborador = mongoose.model('Colaborador');
const AuditoriaColaborador = mongoose.model('AuditoriaColaborador');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

	Colaborador.findOne({ email: req.body.email })
	.then((colab) => {
		
		if (!colab)
			return res.status(401).json({ success: false, msg: "email/senha inválidos!" });
		
		const isValid = utils.validPassword(req.body.senha, colab.hash, colab.salt);  
		if (isValid)
		{
			const tokenObject = utils.issueJWT(colab);
			res.status(200).json({ success: true, email: colab.email, token: tokenObject.token, expiresIn: tokenObject.expires, permissoes: colab.permissoes});
		}
		else 
			res.status(401).json({ success: false, msg: "email/senha inválidos!" });
	})
	.catch((err) => {
		res.status(500).json({success: false, msg: `${err}`});
	});
}

// Register a new user
exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
	
	const saltHash = utils.genPassword(req.body.senha);
	delete req.body.senha;
	
	if (!("ativo" in req.body))
		req.body["ativo"] = true;
	
	const session = await mongoose.startSession();
	try {
		await session.withTransaction(async () => {

			await Colaborador.create([{...req.body, hash: saltHash.hash, salt: saltHash.salt}], { session })
			.then(async (colab) => {
				await AuditoriaColaborador.create([{colaborador: req.jwt.sub, ...req.body}], { session })
				.then((_audcolab) =>{
					res.status(201).json({ success: true, ...colab[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

// Register a new user list
exports.newList = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

	req.body.forEach(colab => {
		const saltHash = utils.genPassword(colab.senha);
		delete colab.senha;

		if (!("ativo" in colab))
			colab["ativo"] = true;

		colab["hash"] = saltHash.hash;
		colab["salt"] = saltHash.salt;
	});
	
	Colaborador.insertMany(req.body, (err, docs) => {
		if (err)
			return res.status(500).json({ success: false, msg: `${err}` });
	
		res.status(201).json({ success: true, total: docs.length});
	});   
}

exports.listAll = (req, res, _next) => {

	Colaborador.find({}).skip(req.params.offset || 0).limit(60)
	.select("nome email cpf matricula id_unidade ativo")
	.populate({path : 'id_unidade', select: 'nome -_id'}) 
	.then((colabs) => {
		
		if (!colabs.length)
			return res.status(204).json();  
		else
			res.status(200).json(colabs);
	})
	.catch((err) => {
		res.status(500).json({success: false, msg: `${err}`});
	});
}

exports.listActive = (req, res, _next) => {

	Colaborador.find({ativo: true}).skip(req.params.offset || 0).limit(60)
	.select("nome email cpf matricula id_unidade")
	.populate({path : 'id_unidade', select: 'nome -_id'}) 
	.then((colabs) => {
		
		if (!colabs.length)
			return res.status(204).json();  
		else
			res.status(200).json(colabs);
	})
	.catch((err) => {
		res.status(500).json({success: false, msg: `${err}`});
	});
}

exports.listOne = (req, res, _next) => {
	
	Colaborador.findById(req.params.id)
	.select('-hash -salt')
	.populate({path : 'id_unidade', select: 'nome cidade uf _id'}) //.populate('id_unidade id_perfil ativo')
	.then((colab) => {
		
		if (!colab)
			return res.status(204).json();  
		else
			res.status(200).json(colab);
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
		
			await Colaborador.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
			.select('-_id')
			.then(async (colab) => {
				if (!colab)
					return res.status(204).json();

				await AuditoriaColaborador.create([{colaborador: req.jwt.sub,  ...colab._doc}], { session })
				.then((audcolab) =>{
					res.status(200).json({ success: true, ...audcolab[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

			await Colaborador.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
			.select('-_id')
			.then(async (colab) => {
				if (!colab)
					return res.status(204).json();
				
				await AuditoriaColaborador.create([{colaborador: req.jwt.sub,  ...colab._doc}], { session })
				.then((audcolab) =>{
					res.status(200).json({ success: true, ...audcolab[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
	
	Colaborador.deleteMany({})  
	.then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
	.catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}