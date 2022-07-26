const mongoose = require('mongoose');
const SubCategoria = mongoose.model('SubCategoria');
const AuditoriaSubCategoria = mongoose.model('AuditoriaSubCategoria');


exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    if (!("ativo" in req.body))
        req.body["ativo"] = true;
    
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await SubCategoria.create([req.body], { session })
            .then(async (subcat) => {
                await AuditoriaSubCategoria.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audsubcat) =>{
                    res.status(201).json({ success: true, ...subcat[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

    req.body.forEach(subcat => {
        if (!("ativo" in subcat))
            subcat["ativo"] = true;
    });
    
    SubCategoria.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });  
}

exports.listAll = (_req, res, _next) => {

	SubCategoria.find({})
    .select("nome descricao ativo")
    .populate({path : 'ativo', select: '-_id'})
    .then((subcats) => {
        
        if (!subcats.length)
            return res.status(204).json();  
        else
            res.status(200).json(subcats);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {

	SubCategoria.find({ativo: true})
    .select("nome")
    .then((subcats) => {
        
        if (!subcats.length)
            return res.status(204).json();  
        else
            res.status(200).json(subcats);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {

	SubCategoria.findById(req.params.id)
    .populate({path : 'ativo', select: '-_id'})
    .then((subcat) => {
        
        if (!subcat)
            return res.status(204).json();  
        else
            res.status(200).json(subcat);
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

            await SubCategoria.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
            .then(async (subcat) => {
                await AuditoriaSubCategoria.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audsubcat) =>{
                    res.status(201).json({ success: true, ...subcat[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

            await SubCategoria.findByIdAndUpdate(req.params.id, {ativo: false}, { session: session, new: true})
            .then(async (subcat) => {
                await AuditoriaSubCategoria.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audsubcat) =>{
                    res.status(201).json({ success: true, ...subcat[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
    
    SubCategoria.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}