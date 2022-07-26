const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');
const AuditoriaAluno = mongoose.model('AuditoriaAluno');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    Aluno.findOne({ email: req.body.email })
    .then((aluno) => {
        
        if (!aluno)
            return res.status(401).json({ success: false, msg: "email/senha inválidos!" });
        
        const isValid = utils.validPassword(req.body.senha, aluno.hash, aluno.salt);  
        if (isValid)
        {
            const tokenObject = utils.issueJWT(aluno);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
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

            await Aluno.create([{...req.body, hash: saltHash.hash, salt: saltHash.salt}], { session })
            .then(async (aluno) => {
                await AuditoriaAluno.create([{responsavel: !req.jwt? req.body.email: req.jwt.sub, ...req.body}], { session })
                .then((_audaluno) =>{
                    res.status(201).json({ success: true, ...aluno[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

    req.body.forEach(aluno => {
        const saltHash = utils.genPassword(aluno.senha);
        delete aluno.senha;

        if (!("ativo" in aluno))
            aluno["ativo"] = true;

        aluno["hash"] = saltHash.hash;
        aluno["salt"] = saltHash.salt;
    });
    
    Aluno.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });   
}

exports.listAll = (_req, res, _next) => {

    Aluno.find({})
    .select("nome email cpf id_unidade ativo")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil ativo')
    .populate({path : 'ativo', select: '-_id'})
    .then((alunos) => {
        
        if (!alunos.length)
            return res.status(204).json();  
        else
            res.status(200).json(alunos);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {

    Aluno.find({ativo: "62cec6c463187bb9b498687b"})
    .select("nome email cpf matricula id_unidade")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil ativo')
    .then((alunos) => {
        
        if (!alunos.length)
            return res.status(204).json();  
        else
            res.status(200).json(alunos);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {
    
    Aluno.findById(req.params.id)
    .select('-hash -salt')
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})   //.populate('id_unidade id_perfil ativo')
    .populate({path : 'ativo', select: '-_id'})
    .then((aluno) => {
        
        if (!aluno)
            return res.status(204).json();  
        else
            res.status(200).json(aluno);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.studentReport = (req, res, _next) => {

    Aluno.findById(req.params.id)
    .select('nome email matricula id_unidade ativo -_id')
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})   //.populate('id_unidade id_perfil ativo')
    .populate({path : 'ativo', select: '-_id'})
    .then((aluno) => {
        if (!aluno)
            res.status(204).json();

        res.status(200).json({success: true, ...aluno._doc});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`})
    })
}

exports.enrollmentReport = (req, res, _next) => {
    
    Aluno.findById(req.params.id)
    .select('nome email matricula id_unidade ativo -_id')
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})   //.populate('id_unidade id_perfil ativo')
    .populate({path : 'ativo', select: '-_id'})
    .then((aluno) => {
        if (!aluno)
            return res.status(204).json();

        console.log(aluno.email);
        AuditoriaAluno.findOne({email: aluno.email})
        .select('data -_id')
        .then((audaluno) => {
            console.log(audaluno);
            if (!audaluno)
            {
                console.log('204 - 2');
                return res.status (204).json();
            }
            res.status(200).json({success: true, ...aluno._doc, ...audaluno._doc})
        })
        .catch((err)=>{
            res.status(500).json({success: false, msg: `${err}`})
        })
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`})
    })
}

exports.edit = async (req, res, _nxt) => {
    
    if (!Object.keys(req.body).length)
        return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    const session = await mongoose.startSession();
	try {    
		await session.withTransaction(async () => {
		
			await Aluno.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
			.select('-_id')
			.then(async (aluno) => {
				if (!aluno)
					return res.status(204).json();

				await AuditoriaAluno.create([{responsavel: req.jwt.sub,  ...aluno._doc}], { session })
				.then((audaluno) =>{
					res.status(200).json({ success: true, ...audaluno[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

			await Aluno.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
			.select('-_id')
			.then(async (aluno) => {
				if (!aluno)
					return res.status(204).json();
				
				await AuditoriaAluno.create([{responsavel: req.jwt.sub,  ...aluno._doc}], { session })
				.then((audaluno) =>{
					res.status(200).json({ success: true, ...audaluno[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
    
    Aluno.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}