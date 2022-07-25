const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');
const utils = require('../libs/utils');

// logs the user
exports.login = (req, res, next) => {

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
exports.new = async (req, res, next) => {
    
    const saltHash = utils.genPassword(req.body.senha);
    delete req.body.senha;
    
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Aluno.create([{...req.body, hash: saltHash.hash, salt: saltHash.salt}], { session })
            .then(async (aluno) => {
                await Aluno.create([{responsavel: req.jwt.sub, ...req.body}], { session })
                .then((_audaluno) =>{
                    res.status(201).json({ success: true, ...aluno[0]["_doc"]}) // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
exports.newList = (req, res, next) => {

    req.body.forEach(aluno => {
        const saltHash = utils.genPassword(aluno.senha);
        delete aluno.id_status;

        if (!("id_status" in aluno))
            aluno["id_status"] = "62cec6c463187bb9b498687b";

        aluno["hash"] = saltHash.hash;
        aluno["salt"] = saltHash.salt;
    });
    
    Aluno.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });   
}

exports.listAll = (req, res, next) => {

    Aluno.find({})
    .select("nome email cpf id_unidade id_status")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status', select: '-_id'})
    .then((alunos) => {
        
        if (!alunos.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: alunos.length, ...alunos});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (req, res, next) => {

    Aluno.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome email cpf matricula id_unidade")
    .populate({path : 'id_unidade', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .then((alunos) => {
        
        if (!alunos.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: alunos.length, ...alunos});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, next) => {
    
    Aluno.findOne({ _id: "62d5a9a164b3535ce5594d6b"})
    .select('-hash -salt')
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_status', select: '-_id'})
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

exports.edit = async (req, res, nxt) => {

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

exports.delete = async (req, res, nxt) => {

    const session = await mongoose.startSession();
	try {
		await session.withTransaction(async () => {

			await Aluno.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, { session: session, new: true})
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

exports.deleteAll = (req, res, nxt) => {
    
    Aluno.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}