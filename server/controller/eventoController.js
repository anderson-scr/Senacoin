const mongoose = require('mongoose');
const Item = mongoose.model('Item');


exports.new = (req, res, next) => {

	const novoEvento = new Item({
		nome: req.body.titulo,
		descricao: req.body.descricao,
		pontos: req.body.senacoins,
		imagem: req.body.imagem,
		data_inicio: new Date(req.body.data_inicio),
		data_fim: new Date(req.body.data_fim),
		id_area: mongoose.Types.ObjectId(req.body.area),
		id_categoria: mongoose.Types.ObjectId("62d017a1181c3910ccfd43d2"),
		id_subcategoria: mongoose.Types.ObjectId(req.body.subcategoria),
		id_unidade: req.body.unidade,
        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novoEvento.save()
        .then((evt) => {
            res.status(201).json({ success: true, id: evt._id, titulo: evt.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}

exports.listAll = (req, res, next) => {
	Item.find({id_categoria: "62d017a1181c3910ccfd43d2"})
    .select("nome id_area id_unidade pontos id_status")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((evts) => {
        
        if (evts.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum item/evento encontrado" });  
        else
            {
                res.status(200).json(evts);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	Item.find({id_categoria: "62d017a1181c3910ccfd43d2", id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_area id_unidade data_inicio data_fim pontos descricao imagem")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((evts) => {
        
        if (evts.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum item/evento encontrado" });  
        else
            {
                res.status(200).json(evts);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
	Item.findOne({ _id: req.params.id })
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((evt) => {
        
        if (!evt)
			return res.status(401).json({ success: false, msg: "item/evento não encontrado" });
        
		res.status(200).json({ success: true, 'item/evento': evt});
		console.log(evt)
    })
    .catch((err) => {
        next(err);
    });
}