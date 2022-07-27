const mongoose = require('mongoose');
const SenaCoin = mongoose.model('SenaCoin');
const AuditoriaSenaCoin = mongoose.model('AuditoriaSenaCoin');


async function addSencoins(responsavel, pontos, data_fim) {
	
	const obj = { pontos: pontos, data_fim: data_fim }
	if (!obj.data_fim)
		delete obj.data_fim;
	console.log(obj);

    let lote = null;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
			
            await SenaCoin.create([obj], { session })
            .then(async (senacoin) => {
                await AuditoriaSenaCoin.create([{responsavel: responsavel, ...obj}], { session })
                .then((_audsenacoin) =>{
                    lote = senacoin[0];
                   console.log({success: true, ...lote._doc}); // ["_doc"] é a posicao do obj de retorno onde se encontra o documento criado));
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

module.exports = {addSencoins}