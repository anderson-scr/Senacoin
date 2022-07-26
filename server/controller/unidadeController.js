const mongoose = require('mongoose');
const Unidade = mongoose.model('Unidade');
const AuditoriaUnidade = mongoose.model('AuditoriaUnidade');


exports.new = async (req, res, _next) => {

    if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
    
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {

            await Unidade.create([req.body], { session })
            .then(async (unidade) => {
                await AuditoriaUnidade.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audunidade) =>{
                    res.status(201).json({ success: true, ...unidade[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

    req.body.forEach(unidade => {
        if (!("id_status" in unidade))
            unidade["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Unidade.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (_req, res, _next) => {

	Unidade.find({})
    .select("nome cidade uf id_status")
    .populate({path : 'id_status', select: '-_id'})
    .then((unidades) => {
        
        if (!unidades.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: unidades.length, ...unidades});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listActive = (_req, res, _next) => {

	Unidade.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome")
    .then((unidades) => {
        
        if (!unidades.length)
            return res.status(204).json();  
        else
            res.status(200).json({total: unidades.length, ...unidades});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => { // colocar um && pra procurar por id tbm

    Unidade.findById(req.params.id)
    .populate({path : 'id_status', select: '-_id'})
    .then((unidade) => {
        
        if (!unidade)
			return res.status(204).json();
        
		res.status(200).json({ success: true, 'unidade': unidade});
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

            await Unidade.findByIdAndUpdate(req.params.id, {$set: req.body}, { session: session, new: true})
            .then(async (unidade) => {
                await AuditoriaUnidade.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audunidade) =>{
                    res.status(201).json({ success: true, ...unidade[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

            await Unidade.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, { session: session, new: true})
            .then(async (unidade) => {
                await AuditoriaUnidade.create([{colaborador: req.jwt.sub, ...req.body}], { session })
                .then((_audunidade) =>{
                    res.status(201).json({ success: true, ...unidade[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
    
    Unidade.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}