const mongoose = require('mongoose');
const Transacao = mongoose.model('Transacao');
const Aluno = mongoose.model('Aluno');
const Senacoin = mongoose.model('SenaCoin');
const Item = mongoose.model('Item');
const QrCode = mongoose.model('QrCode');
const Promocao = mongoose.model('Promocao');


exports.new = (req, res, _next) => {
	
	if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

	if (!("tipo" in req.body))
		return res.status(400).json({ success: false, msg: "informe o tipo da transação." });
	
	if (req.body.tipo && "id_promocao" in req.body)
		return res.status(400).json({ success: false, msg: "promoção só pode ser aplicada a transações do tipo saída." });
	
	if (!req.body.tipo && "id_qrcode" in req.body)
		return res.status(400).json({ success: false, msg: "qr code só pode ser utilizado em transações do tipo entrada." });

	if (!req.body.tipo && !("id_item" in req.body))
		return res.status(400).json({ success: false, msg: "transações do tipo saída necessitam de um item." });

	if ("id_item" in req.body && "id_qrcode" in req.body)
		return res.status(400).json({ success: false, msg: "mais de uma fonte de senacoins informada, a transação deve ser atômica." });

	if ("id_item" in req.body)
		Item.findById(req.body.id_item) // busca a quantidade de senacoins a serem gerados ou gastos

	else if ("id_qrcode" in req.body)
		QrCode.findById(req.body.id_qrcode) // busca a quantidade de senacoins a serem gerados
	else
		return res.status(400).json({ success: false, msg: "erro de BIOS muito grave nunca deveria chegar aqui." });

	if ("id_promocao" in req.body)
		Promocao.findById(req.body.id_promocao) // busca a a valor do desconto

	Senacoin.create({qnt_senacoins, validade_inicio, validade_fim}, (err, senacoin) =>  {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });

        res.status(201).json({ success: true, ...senacoin["_doc"]});
    });

	Aluno.findByIdAndUpdate(req.body.id_aluno) // atualiza o saldo do aluno

    Transacao.create(req.body, (err, transacao) =>  {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });

        res.status(201).json({ success: true, ...transacao["_doc"]});
    });
}

exports.newList = (req, res, _next) => {

	if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

    req.body.forEach(transacao => {
		if (!("tipo" in transacao))
			return res.status(400).json({ success: false, msg: "informe o tipo da transação." });
		if (transacao.tipo && "id_promocao" in transacao)
			return res.status(400).json({ success: false, msg: "promoção só pode ser aplicada a transações do tipo saída." });
		if (!transacao.tipo && "id_qrcode" in transacao)
			return res.status(400).json({ success: false, msg: "qr code só pode ser utilizado em transações do tipo entrada." });
		if (!transacao.tipo && !("id_item" in transacao))
			return res.status(400).json({ success: false, msg: "transações do tipo saída necessitam de um item." });
		if ("id_item" in transacao && "id_qrcode" in transacao)
			return res.status(400).json({ success: false, msg: "mais de uma fonte de senacoins informada, a transação deve ser atômica." });
		if ("id_item" in transacao)
			Item.findById(transacao.id_item) // busca a quantidade de senacoins a serem gerados ou gastos
		else if ("id_qrcode" in transacao)
			QrCode.findById(transacao.id_qrcode) // busca a quantidade de senacoins a serem gerados
		else
			return res.status(400).json({ success: false, msg: "erro de BIOS muito grave nunca deveria chegar aqui." });

		if ("id_promocao" in transacao)
			Promocao.findById(transacao.id_promocao) // busca a a valor do desconto

		{} // precisa criar um obj aqui pra inserir no insertMany
    });
    
    Transacao.insertMany({obj_gerado_no_forEach}, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, msg: `${err}` });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (_req, res, _next) => {

	Transacao.find({})
    .select("id_aluno tipo id_senacoin data")
	.populate({path : 'id_aluno', select: 'nome cpf -_id'})
    .populate({path : 'id_senacoin', select: 'pontos -_id'})
    .then((transacoes) => {
        
        if (!transacoes.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: transacoes.length, ...transacoes});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listAllByAluno = (_req, res, _next) => {

	Transacao.findById(req.params.id_aluno)
	.select("id_aluno tipo id_senacoin data")
	.populate({path : 'id_aluno', select: 'nome cpf matricula -_id'})
    .populate({path : 'id_senacoin', select: 'pontos data_inicio data_fim -_id'})
    .then((transacoes) => {
        
        if (!transacoes.length)
            return res.status(204).json();  
        else
			res.status(200).json({total: transacoes.length, ...transacoes});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.listOne = (req, res, _next) => {
	
	Transacao.findById(req.params.id)
    .populate({path : 'id_aluno', select: '-_id'})
	.populate({path : 'id_senacoin', select: '-_id'})
	.populate({path : 'id_item', select: '-_id'}) // provavelmente algum desses precisa popular em profundidade
	.populate({path : 'id_qrcode', select: '-_id'})
	.populate({path : 'id_promocao', select: '-_id'})
    .then((transacao) => {
        
        if (!transacao)
			return res.status(204).json();
        
		res.status(200).json({ success: true, [categoria]: transacao});
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}

exports.edit = (req, res, _nxt) => {

	if (!Object.keys(req.body).length)
		return res.status(400).json({ success: false, msg: "solicitação mal construída, informações faltando ou incorretas" });

	Transacao.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
	.select('-_id')
	.populate({path : 'id_aluno', select: '-_id'})
	.populate({path : 'id_senacoin', select: '-_id'})
	.populate({path : 'id_item', select: '-_id'}) // provavelmente algum desses precisa popular em profundidade
	.populate({path : 'id_qrcode', select: '-_id'})
	.populate({path : 'id_promocao', select: '-_id'})
	.then((doc) => (res.status(200).json(doc)))
	.catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}

exports.delete = (req, res, _nxt) => {

	Transacao.findOneAndDelete({_id: req.params.id}, {new: true})
	.select('-_id')
	.populate({path : 'id_aluno', select: '-_id'})
	.populate({path : 'id_senacoin', select: '-_id'})
	.populate({path : 'id_item', select: '-_id'}) // provavelmente algum desses precisa popular em profundidade
	.populate({path : 'id_qrcode', select: '-_id'})
	.populate({path : 'id_promocao', select: '-_id'})
	.then((doc) => (res.status(200).json(doc)))
	.catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}

exports.deleteAll = (_req, res, _nxt) => {
    
    Transacao.deleteMany({})
	.then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json({ success: false, msg: `${err}` })));
}