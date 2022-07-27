const mongoose = require('mongoose');
const SenaCoin = mongoose.model('SenaCoin');
const AuditoriaSenaCoin = mongoose.model('AuditoriaSenaCoin');


exports.new = async (responsavel, pontos, data_fim) => {
	
    let lote = null;
	const obj = { pontos: pontos, data_fim: data_fim }

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
			
            await SenaCoin.create([obj], { session })
            .then(async (senacoin) => {
                await AuditoriaSenaCoin.create([{responsavel: responsavel, ...senacoin[0]._doc, id_senacoin: senacoin[0]._id}], { session })
                .then((_audsenacoin) =>{
                    lote = senacoin[0];
                    console.log({success: true, _audsenacoin}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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
    return lote;
}

exports.sum = (senacoins) => {

    total = 0;
    senacoins.forEach(lote => {
        if (lote.data_inicio.getTime() < Date.now() && lote.data_fim.getTime() > Date.now())
            total += lote.pontos;
    });
    
    return total;
}