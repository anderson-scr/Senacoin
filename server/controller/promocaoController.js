const { randomUUID } = require('crypto');
const mongoose = require('mongoose');
const path = require('path');
const Promocao = mongoose.model('Promocao');


exports.new = (req, res, next) => {

    // >>> só ta aqui por causa do postman <<<
    req.body = {...JSON.parse(req.body.data)}

    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    if(!req.files || Object.keys(req.files).length === 0)
		return res.status(418).json({success: false, msg:"Não subiu nenhuma imagem."});

    // nome e caminho do arquivo
	const img = req.files.imagem;
	const caminho = path.join('uploads', `${randomUUID()}${path.extname(img.name)}`);
	req.body.imagem = caminho;

    Promocao.create(req.body, (err, promocao) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        // mv() é usada para colocar o arquivo na pasta do servidor
        img.mv(path.join(__basedir, caminho), (err) =>{
            if(err)
                console.log(err);
            else
                console.log("Arquivo salvo com sucesso!");
        });
        res.status(201).json({ success: true, ...promocao["_doc"]});
    });
}

exports.newList = (req, res, next) => {
    
    req.body.forEach(promocao => {
        if (!("id_status" in promocao))
            promocao["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Promocao.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Promocao.find({})
    .select("titulo descricao desconto id_unidade id_status")
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json({ success: false, msg: "nenhuma promoção encontrada." });  
        else
            res.status(200).json({total: promocoes.length, ...promocoes});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez .toISOString() no final
	Promocao.find({$and: [{id_status: "62cec6c463187bb9b498687b"}, {data_inicio: {$gte: today}}, {data_fim: {$lt: today}}]})
    .select("titulo pontos desconto id_item id_unidade -_id")
	.populate({path : 'id_item', select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade', select: 'nome -_id'})
    .then((promocoes) => {
        
        if (!promocoes.length)
            return res.status(204).json({ success: false, msg: "nenhuma promoção encontrada." });  
        else
            res.status(200).json({total: promocoes.length, ...promocoes});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {

    Promocao.findOne({ _id: req.params.id})
    .select('-_id')
    .populate({path : 'id_item' , select: 'nome area id_categoria -_id', populate: {path: 'id_categoria', select: 'nome -_id'}})
	.populate({path : 'id_unidade', select: 'nome cidade uf -_id'})
    .populate({path : 'id_status', select: '-_id'})
    .then((promocao) => {
        
        if (!promocao)
            return res.status(204).json({ success: false, msg: "promoção não encontrada." });  
        else
            res.status(200).json(promocao);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Promocao.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

    Promocao.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id')
    .populate({path : 'id_status', select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.deleteAll = (req, res, nxt) => {
    
    Promocao.deleteMany({})
    .then((n) => (res.status(200).json({success: true, total: n.deletedCount})))
    .catch((err) => (res.status(500).json(err)));
}