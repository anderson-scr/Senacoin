const mongoose = require('mongoose');
const SenaCoin = mongoose.model('SenaCoin');
const AuditoriaSenaCoin = mongoose.model('AuditoriaSenaCoin');
const aluno = require('./alunoController');
const item = require('./itemController');

exports.new = async (responsavel, pontos, data_fim, session) => {
	
    let lote = null;
	const obj = { pontos: pontos, data_fim: data_fim }

    try {
        await SenaCoin.create([obj], { session })
        .then(async (senacoin) => {
            await AuditoriaSenaCoin.create([{responsavel: responsavel, ...senacoin[0]._doc, id_senacoin: senacoin[0]._id}], { session })
            .then((_audsenacoin) =>{
                lote = senacoin[0];
                console.log({success: true, lote: lote});
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
    return lote;
}

exports.sum = (senacoins) => {
    
    total = 0;
    senacoins = senacoins.reduce((acumuladora, lote) => {
        if (lote.data_inicio.getTime() < Date.now() && lote.data_fim.getTime() > Date.now()) {
            acumuladora.push(lote._id);
            total += lote.pontos    
        }

        return acumuladora;
    }, []); 

    console.log({total, senacoins});
    return {total, senacoins};
}

exports.sub = async (responsavel, pontos, senacoins) => {
    
    const total = pontos;
    let senacoinsConvertidos = [];
    
    if (total > this.sum(senacoins).total)
        return {success: false, msg: "pontos insuficientes."};
    
    while (pontos > 0) {
        if (pontos >= senacoins[0].pontos) {
            senacoinsConvertidos.push(senacoins[0]);
            senacoins.shift();
            pontos -= senacoins[0].pontos;
        }
        else {
            console.log({responsavel: responsavel, id: senacoins[0]._id, pontos: senacoins[0].pontos - pontos});
            await atualizaSenacoin(responsavel, senacoins[0]._id, senacoins[0].pontos - pontos)
            senacoinsConvertidos.push(senacoins[0]);
            pontos = 0
        }
    }
    console.log({success: true, remanescente: senacoins, gastos: senacoinsConvertidos, totalGastos: total});
    return {success: true, remanescente: senacoins, gastos: senacoinsConvertidos, totalGastos: total}; // o primeiro precisa ser adicionado em aluno e o segundo em transacao
}

async function atualizaSenacoin (responsavel, id, pontos) {

    const session = await mongoose.startSession();
	try {    
		await session.withTransaction(async () => {
		
			await SenaCoin.findByIdAndUpdate(id, {pontos: pontos}, { session: session, new: true})
            .select('-_id')
			.then(async (senacoin) => {
				if (!senacoin)
                console.log({success: false, msg: 'lote de senacoin não encontrado'});

				await AuditoriaSenaCoin.create([{responsavel: responsavel, id_senacoin: id, ...senacoin._doc}], { session })
				.then((audsenacoin) =>{
					console.log({ success: true, audsenacoin});
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
		});
	} catch (err) {
		console.log({ success: false, msg: `${err}` });
	} finally {
		await session.endSession();
	}
}

exports.use = async (req, res, _next) => {

    //TODO adicionar verificacao de quantidade 
    const _item = await item.getInfo(req.body.item);
    console.log(_item);
    if(! _item)
        return res.status(400).json({success: false, msg: "item não encontrado."});

    const teste = await aluno.redeemSenacoin(req.jwt.sub, req.body.email, _item);
    if (! teste.success)
        return res.status(500).json({success: false, msg: teste.msg});
    
    res.status(200).json({success: true, msg: "senacoins convertidos com sucesso."});
}