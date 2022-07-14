const mongoose = require('mongoose');
const Item = mongoose.model('Item');


exports.new = (req, res, next) => {

	const novoServico = new Item({
		nome: req.body.titulo,
		descricao: req.body.descricao,
		pontos: req.body.senacoins,
		quantidade: req.body.quantidade,
		imagem: req.body.imagem,
		data_inicio: new Date(req.body.data_inicio),
		data_fim: new Date(req.body.data_fim),
		id_area: mongoose.Types.ObjectId(req.body.area),
		id_categoria: mongoose.Types.ObjectId("62d017a1181c3910ccfd43d3"),
		id_subcategoria: mongoose.Types.ObjectId(req.body.subcategoria),
		id_unidade: req.body.unidade,
        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novoServico.save()
        .then((serv) => {
            res.status(201).json({ success: true, id: serv._id, titulo: serv.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}

exports.listAll = (req, res, next) => {
	Item.find({id_categoria: "62d017a1181c3910ccfd43d3"})
    .select("nome id_area id_unidade pontos id_status")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((servs) => {
        
        if (servs.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum item/servico encontrado" });  
        else
            {
                res.status(200).json(servs);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	Item.find({id_categoria: "62d017a1181c3910ccfd43d3", id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_area id_unidade pontos data_inicio data_fim descricao imagem")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((servs) => {
        
        if (servs.length === 0)
            return res.status(401).json({ success: false, msg: "nenhum item/servico encontrado" });  
        else
            {
                res.status(200).json(servs);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
	Item.findOne({ _id: req.params.id })
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((serv) => {
        
        if (!serv)
			return res.status(401).json({ success: false, msg: "item/servico não encontrado" });
        
		res.status(200).json({ success: true, 'item/servico': serv});
		console.log(serv)
    })
    .catch((err) => {
        next(err);
    });
}