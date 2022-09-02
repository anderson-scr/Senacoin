const mongoose = require('mongoose');
const SenaCoin = mongoose.model('SenaCoin');
const AuditoriaSenaCoin = mongoose.model('AuditoriaSenaCoin');
const aluno = require('./alunoController');
const item = require('./itemController');
const cotacao = require('./cotacaoController');

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
    
    atual = 0, anterior = 0;
    senacoins = senacoins.reduce((acumuladora, lote) => {
        if (lote.data_inicio.getTime() < Date.now() && lote.data_fim.getTime() > Date.now()) {
            acumuladora.push(lote._id);
            atual += lote.pontos    
        }

        anterior += lote.pontos;
        return acumuladora;
    }, []); 

    console.log({anterior, atual, senacoins});
    return {anterior, atual, senacoins};
}

exports.sub = async (responsavel, pontos, senacoins, session) => {
    
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
            if (! await atualizaSenacoin(responsavel, senacoins[0]._id, senacoins[0].pontos - pontos, session))
                return {success: false, msg: "erro na hora de atualizar o lote."};
            senacoinsConvertidos.push(senacoins[0]);
            pontos = 0
        }
    }
    console.log({success: true, remanescente: senacoins, gastos: senacoinsConvertidos, totalGastos: total});
    return {success: true, remanescente: senacoins, gastos: senacoinsConvertidos, totalGastos: total}; // o primeiro precisa ser adicionado em aluno e o segundo em transacao
}

async function atualizaSenacoin (responsavel, id, pontos, session) {

	try {    
        const senacoin = await SenaCoin.findByIdAndUpdate(id, {pontos: pontos}, { session: session, new: true}).select('-_id');
        if (!senacoin)
            console.log({success: false, msg: 'lote de senacoin não encontrado'}, '4');

        const audsenacoin = await AuditoriaSenaCoin.create([{responsavel: responsavel, id_senacoin: id, ...senacoin._doc}], { session })
        console.log({ success: true, audsenacoin});
        // throw new Error('erro de teste');
        return true;
    
	} catch (err) {
		console.log({ success: false, msg: err.message}, '5');
        return false;
    }
}

exports.use = async (req, res, _next) => {

    const _item = await item.getInfo(req.body.item);
    console.log(_item);
    if (! _item)
        return res.status(400).json({success: false, msg: "item não encontrado."});
    
    if (_item.quantidade <= 0)
        return res.status(404).json({success: false, msg: "item não esgotado."});
    
	const session = await mongoose.startSession();
    try {
		await session.withTransaction(async () => {
            if (_item.quantidade >= 1)
            {
                const resultado = await item.baixaEstoque(req.jwt.sub, _item._id, session);
                console.log(resultado);
                if (!resultado)
                    throw new Error('Erro na baixa do item do estoque');
            }

            const conversao = await aluno.redeemSenacoin(req.jwt.sub, req.body.email, _item, session);
            if (!conversao.success)
                throw new Error(conversao.msg);

            const cambio = await cotacao.getCurrent();
            if (!cambio)
                console.log('cambio não definido');
            
            res.status(200).json({success: true, msg: "senacoins convertidos com sucesso.", desconto: cambio*_item.horas});
        });
    } catch(err) {
        res.status(500).json({success: false, msg: err.message});
    } finally {
        console.log('encerrei a sessao');
		await session.endSession();
    }
}

exports.estornaLote = async (responsavel, id, pontos, session) => {

    console.log('entrei estornaLote');
    try {
        const senacoin = await SenaCoin.findById(id).select('-_id');
        
        console.log(`chamei atualizaSenacoin(${responsavel}, ${id}, ${senacoin.pontos+pontos})`);
        if(! await atualizaSenacoin(responsavel, id, senacoin.pontos+pontos, session))
            throw new Error('Erro ao atualizar o lote modificado.');
        return true;
    } catch (err) {
        console.log({success: false, msg: err.message}, '3');
        return false;
    }
}