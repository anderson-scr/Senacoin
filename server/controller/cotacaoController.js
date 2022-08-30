const mongoose = require('mongoose');
const Cotacao = mongoose.model('Cotacao');
const AuditoriaCotacao = mongoose.model('AuditoriaCotacao');

exports.new = async (req, res, _next) => {

	if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });
	console.log(await Cotacao.count());
	if (await Cotacao.count() > 0)
		return res.status(400).json({ success: false, msg: "não é possivel ter mais que uma cotação." });

		const session = await mongoose.startSession();
		try {
			await session.withTransaction(async () => {
	
				await Cotacao.create([req.body], { session })
				.then(async (cotacao) => {
					await AuditoriaCotacao.create([{colaborador: req.jwt.sub, ...req.body}], { session })
					.then((_audcotacao) =>{
						res.status(201).json({ success: true, ...cotacao[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

exports.edit = async (req, res, _nxt) => {

	if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

	const session = await mongoose.startSession();
	try {
		await session.withTransaction(async () => {
			console.log(req.body.cambio);
			await Cotacao.findOneAndUpdate({}, {cambio: req.body.cambio}, { session: session, new: true})
			.select('-_id')
			.then(async (cotacao) => {
				console.log(cotacao);
				await AuditoriaCotacao.create([{responsavel: req.jwt.sub, ...cotacao._doc}], { session })
				.then((audcotacao) =>{
					res.status(201).json({ success: true, ...audcotacao[0]["_doc"]}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

exports.listAll = (_req, res, _next) => {

	AuditoriaCotacao.find({})
	.sort({"_id": -1})
	.skip(1)
    .then((cotacaoes) => {
        
        if (!cotacaoes.length)
            return res.status(204).json();  
        else
            res.status(200).json(cotacaoes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (_req, res, _next) => {

    Cotacao.findOne({})
    .then((cotacao) => {
        
        if (!cotacao)
			return res.status(204).json();
        
		res.status(200).json({ success: true, cambio: cotacao.cambio});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.getCurrent = () => {
	return Cotacao.find({});
}