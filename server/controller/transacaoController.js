const mongoose = require('mongoose');
const Transacao = mongoose.model('Transacao');
const Aluno = mongoose.model('Aluno');
const aluno = require('./alunoController');

exports.new = async (responsavel, id_aluno, id_senacoin, pontos, tipo, id_item, id_qrcode, id_promocao, session) => {
	
	if (!id_aluno)
	{
		aluno = await Aluno.findOne({ email: responsavel });
		id_aluno = aluno._id;
	}

	let sucesso = false;
    try {
		await Transacao.create([{responsavel, id_aluno, id_senacoin, pontos, tipo, id_item, id_qrcode, id_promocao}], { session })
		.then(async (transacao) => {
			console.log(transacao[0]);
			sucesso = true;
		})
		.catch(async (err) => {
			await session.abortTransaction();
			console.log({ success: false, msg: `${err}` });
		})
    } catch (err) {
		await session.abortTransaction();
        console.log({ success: false, msg: `${err}` });
	}
	return sucesso;
}


exports.listAll = (_req, res, _next) => {

	Transacao.find({})
    .select("id_aluno tipo id_senacoin data")
	.populate({path : 'id_aluno', select: 'nome cpf'})
    .populate({path : 'id_senacoin', select: 'pontos -_id'})
    .then((transacoes) => {
        
        if (!transacoes.length)
            return res.status(204).json();  
        else
			res.status(200).json(transacoes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listAllByAluno = (req, res, _next) => {

	Transacao.find({id_aluno: req.params.id})
	.select("id_aluno tipo id_senacoin data")
	.populate({path : 'id_aluno', select: 'nome cpf matricula -_id'})
    .populate({path : 'id_senacoin', select: 'pontos data_inicio data_fim -_id'})
    .then((transacoes) => {
        
        if (!transacoes.length)
            return res.status(204).json();  
        else
			res.status(200).json(transacoes);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {
	
	Transacao.findById(req.params.id)
    .populate({path : 'id_aluno', select: '-hash -salt -saldo -_id'})
	.populate({path : 'id_senacoin', select: '-_id'})
	.populate({path : 'id_item', select: '-_id'}) // provavelmente algum desses precisa popular em profundidade
	.populate({path : 'id_qrcode', select: '-_id'})
	.populate({path : 'id_promocao', select: '-_id'})
    .then((transacao) => {
        
        if (!transacao)
			return res.status(204).json();
        
		res.status(200).json({ success: true, tipo: transacao});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.delete = async (req, res, _nxt) => {

	const session = await mongoose.startSession();
    try {

        await session.withTransaction(async () => {
			const estorno = await Transacao.findByIdAndDelete(req.params.id, { session: session });
			console.log(estorno);
		});
			
			if (!estorno.tipo) {
				await aluno.estornaPontos(req.jwt.sub, id_aluno, id_senacoin, pontos);
			}
			else {
				throw new Error('Estorno de pontos obtidos por QrCode ainda não implementado.');
			}
			res.status(200).json({ success: true, msg: 'pontos estornados com sucesso.'});
	} catch (err) {
		await session.abortTransaction();
		res.status(500).json({ success: false, msg: `${err}` })
	}
	finally{
		await session.endSession();
	}
}