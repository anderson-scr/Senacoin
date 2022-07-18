const mongoose = require('mongoose');
const Item = mongoose.model('Item');


function getIdbyName(item) {
	
	let categoria;
	if (item === 'produto')
		categoria = mongoose.Types.ObjectId("62d017a1181c3910ccfd43d1");
	else if (item === 'evento')
		categoria = mongoose.Types.ObjectId("62d017a1181c3910ccfd43d2");
	else if (item === 'servico')
		categoria = mongoose.Types.ObjectId("62d017a1181c3910ccfd43d3");
	
	return categoria;
}

exports.new = (req, res, next) => {

    categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});
    
    req.body["id_categoria"] = categoria;
    if (!("id_status" in req.body))
        req.body["id_status"] = "62cec6c463187bb9b498687b";

    Item.create(req.body, (err, item) =>  {
        if (err)
            return res.status(500).json({ success: false, ...err });

        res.status(201).json({ success: true, ...item["_doc"]});
    });
}

exports.newList = (req, res, next) => {

    req.body.forEach(item => {
        if (!("id_status" in item))
            item["id_status"] = "62cec6c463187bb9b498687b";
    });
    
    Item.insertMany(req.body, (err, docs) => {
        if (err)
            return res.status(500).json({ success: false, ...err });
    
        res.status(201).json({ success: true, total: docs.length});
    });
}

exports.listAll = (req, res, next) => {

	Item.find({})
    .select("nome id_area id_categoria id_unidade pontos id_status")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_categoria' , select: 'nome -_id'})
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((itens) => {
        
        if (!itens.length)
            return res.status(204).json({ success: false, msg: 'nenhum item encontrado' });  
        else
			res.status(200).json(itens);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listAllByCategory = (req, res, next) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

	Item.find({id_categoria: categoria})
    .select("nome id_area id_unidade pontos id_status")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((itens) => {
        
        if (!itens.length)
            return res.status(204).json({ success: false, msg: `nenhum ${categoria} encontrado` });  
        else
			res.status(200).json(itens);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

	Item.find({id_categoria: categoria, id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_area id_unidade pontos descricao imagem")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((itens) => {
        
        if (!itens.length)
            return res.status(204).json({ success: false, msg: `nenhum ${categoria} encontrado` });  
        else
			res.status(200).json(itens);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {
	
	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

	Item.findOne({ _id: req.params.id })
    .populate({path : 'id_status' , select: '-_id'})
    .then((item) => {
        
        if (!item)
			return res.status(204).json({ success: false, msg: `${categoria} não encontrado` });
        
		res.status(200).json({ success: true, [categoria]: item});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Item.findOnedAndUpdate({_id: req.params.id, id_categoria: categoria}, {$set: req.body}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {

	categoria = getIdbyName(req.params.categoria);
	if (!categoria)
		return res.status(400).json({msg: "categoria de item inexistente."});

    Item.findOneAndUpdate({_id: req.params.id, id_categoria: categoria}, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}
