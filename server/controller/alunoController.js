const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');
const AuditoriaAluno = mongoose.model('AuditoriaAluno');
const senacoin = require('./senacoinController');
const transacao = require('./transacaoController');
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

        responsavel = !req.jwt? req.body.email: req.jwt.sub;
        const lote  = await senacoin.new(responsavel, 1000)
        if(!lote)
            throw new Error(`erro na criacao dos senacoins`);
            
        await session.withTransaction(async () => {

            await Aluno.create([{...req.body, hash: saltHash.hash, salt: saltHash.salt, saldo: [lote._id]}], { session })
            .then(async (aluno) => {
                await AuditoriaAluno.create([{responsavel: responsavel, ...req.body}], { session })
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
    .populate({path : 'id_unidade', select: 'nome -_id'}) 
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

    Aluno.find({ativo: true})
    .select("nome email cpf matricula id_unidade")
    .populate({path : 'id_unidade', select: 'nome -_id'})
    .populate({path : 'saldo', select: 'pontos -_id'})
    .then((alunos) => {
        
        if (!alunos.length)
            res.status(204).json();  
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
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .populate({path : 'saldo', select: 'pontos data_inicio data_fim'})
    .then(async (aluno) => {
        if (!aluno)
            return res.status(204).json();  
        
        const _verificaSaldo = await this.verificaSaldo(req.jwt.sub, aluno._id, aluno.saldo);
        if (!_verificaSaldo.sucesso)
            throw new Error(`erro na atualizacao dos senacoins`);

        let _aluno = {...aluno._doc};
        _aluno.saldo = _verificaSaldo.total;

        res.status(200).json(_aluno);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

// esssa funcao sobrescreve o vetor de senacoins com o novo vetor sem os lotes vencidos
exports.verificaSaldo = async (responsavel, id, saldo) => {

    let sucesso = false;
    const saldoAtualizado = senacoin.sum(saldo);

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Aluno.findByIdAndUpdate(id, {saldo: saldoAtualizado.senacoins}, { session: session, new: true})
            .select('-_id')
            .then(async (aluno) => {
                if (!aluno)
                    throw new Error('aluno não encontrado');

                await AuditoriaAluno.create([{responsavel: responsavel,  ...aluno._doc}], { session })
                .then((_audaluno) =>{
                    sucesso = true;
                })
                .catch(async (err) => {
                    await session.abortTransaction();
                    console.log({ success: false, msg: `${err}` });
                });
            })
            .catch(async (err) => {
                await session.abortTransaction();
                console.log({ success: false, msg: `${err}` });
            })
        })       
    } catch (err) {
        console.log({ success: false, msg: `${err}` });
    } finally {
        await session.endSession();
    }
    console.log({sucesso, total: saldoAtualizado.total});
    return {sucesso, total: saldoAtualizado.total};
}

// esssa funcao modifica o vetor senacoins dando push dos novos lotes a serem adicionados
exports.atualizaSaldo = async (responsavel, senacoins, unidadeQrcode, session) => {
    
    let sucesso = false;
	try {    
        await Aluno.findOneAndUpdate({email: responsavel}, {$push: {saldo: senacoins}}, { session: session, new: true})
        .select('-_id')
        .then(async (aluno) => {
            if (!aluno)
                throw new Error('aluno não encontrado');

            let msmUnidade = true;
            aluno.id_unidade.forEach(unidade => {
                if (!unidadeQrcode.includes(unidade))
                    msmUnidade = false;
            });
            
            if (!msmUnidade)
                throw new Error('aluno não pertence a mesma unidade do qrcode');

            await AuditoriaAluno.create([{responsavel: responsavel,  ...aluno._doc}], { session })
            .then((audaluno) =>{
                console.log({ success: true, audaluno});
                sucesso = true;
            })
            .catch(async (err) => {
                await session.abortTransaction();
                console.log({ success: false, msg: `${err}` });
            });
        })
        .catch(async (err) => {
            await session.abortTransaction();
            console.log({ success: false, msg: `${err}` });
        })
	} catch (err) {
		console.log({ success: false, msg: `${err}` });
	} 
    return sucesso;
}

exports.verificaQrCode = async (email, tipo, qrcode, session) => {
    try {
        const qrcodes = await Aluno.findOne({email: email, tipo: qrcode})
        .select(`${tipo} -_id`);
        if (qrcodes[tipo].includes(qrcode))
        {
            await session.abortTransaction();
            return true
        }
        else 
        {
            try {
                res = await Aluno.findOneAndUpdate({email: email}, {$push: {[tipo]: qrcode}}, {session: session, new: true}).select('-_id');
                try {
                    await AuditoriaAluno.create([{responsavel: Aluno.email,  ...res}], { session })
                } catch (error) {
                    await session.abortTransaction();
                    return true;
                }
            } catch (err) {
                console.log({ success: false, msg: `${err}` });
                await session.abortTransaction();
                return true;
            }
        }
    } catch (err) {
        console.log({ success: false, msg: `${err}` });
        return true
    }
    return false;
}

exports.studentReport = (req, res, _next) => {
    Aluno.findById(req.params.id)
    .select('nome email matricula id_unidade ativo -_id')
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'}) 
    
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
    .populate({path : 'id_unidade', select: 'nome cidade uf -_id'}) 
    
    .then((aluno) => {
        if (!aluno)
            return res.status(204).json();

        console.log(aluno.email);
        AuditoriaAluno.findOne({email: aluno.email})
        .select('data -_id')
        .then((audaluno) => {
            console.log(audaluno);
            if (!audaluno)
                return res.status (204).json();
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

exports.redeemSenacoin = async (responsavel, email, item) => {

    try {
        const aluno = await Aluno.findOne({ email: email })
        .select('-hash -salt')
        .populate({path : 'saldo', select: 'pontos data_inicio data_fim'});

        if (!aluno)
            throw new Error('aluno não encontrado');
        
        const resultado = await senacoin.sub(responsavel, item.pontos, aluno.saldo);
        if (!resultado.success)
            throw new Error(resultado.msg);
        
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
    
                const _aluno = await Aluno.findByIdAndUpdate(aluno._id, {saldo: resultado.remanescente}, { session: session, new: true})
                .select('-_id');

                if (! _aluno)
                    throw new Error('aluno não encontrado2');

                await AuditoriaAluno.create([{responsavel: responsavel,  ..._aluno._doc}], { session });
                await transacao.new(responsavel, aluno.id, resultado.gastos, resultado.totalGastos, 0, item._id, null, null, session);
            })       
        } catch (err) {
            console.log({ success: false, msg: `${err}` });
            await session.abortTransaction();
        } finally {
            await session.endSession();
        }
        
        return resultado;
    } catch (error) {
        return {sucess: false, msg: error.message}
    }
}

exports.estornaPontos = async (responsavel, id, senacoins, pontos) => {

    const infoAluno = Aluno.findById(id).select('-hash -salt');
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            
            let loteModificado;
            senacoins = senacoins.filter(value => {
                if (infoAluno.saldo.includes(value))
                {
                    loteModificado = value;
                    return false;
                }
                return true;
            });

            const aluno = await Aluno.findByIdAndUpdate(id, {$push: {saldo: senacoins}}, { session: session, new: true}).select('-_id');
            await AuditoriaAluno.create([{responsavel: responsavel,  ...aluno._doc}], { session });

            if (! await senacoin.estornaLote(responsavel, loteModificado))
                throw new Error('Erro com estorno do lote modificado');
        });
    } catch (error) {
        await session.abortTransaction();
        console.log({ success: false, msg: `${err}` });
    }
    finally{
		await session.endSession();
	}
}