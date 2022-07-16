const mongoose = require('mongoose');
const Item = mongoose.model('Item');


exports.new = (req, res, next) => {

	const novoProduto = new Item({
		nome: req.body.titulo,
		descricao: req.body.descricao,
		pontos: req.body.senacoins,
		quantidade: req.body.quantidade,
		imagem: req.body.imagem,
		data_inicio: null,
		data_fim: null,
		id_area: mongoose.Types.ObjectId(req.body.area),
		id_categoria: mongoose.Types.ObjectId("62d017a1181c3910ccfd43d1"),
		id_subcategoria: mongoose.Types.ObjectId(req.body.subcategoria),
		id_unidade: mongoose.Types.ObjectId(req.body.unidade),
        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novoProduto.save()
        .then((prod) => {
            res.status(201).json({ success: true, id: prod._id, titulo: prod.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}

exports.listAll = (req, res, next) => {
	Item.find({id_categoria: "62d017a1181c3910ccfd43d1"})
    .select("nome id_area id_unidade pontos id_status")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((prods) => {
        
        if (prods.length === 0)
            return res.status(204).json({ success: false, msg: "nenhum item/produto encontrado" });  
        else
            {
                res.status(200).json(prods);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	Item.find({id_categoria: "62d017a1181c3910ccfd43d1", id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_area id_unidade pontos descricao imagem")
	.populate({path : 'id_area', select: 'nome -_id'})   //.populate('id_unidade id_perfil id_status')
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((prods) => {
        
        if (prods.length === 0)
            return res.status(204).json({ success: false, msg: "nenhum item/produto encontrado" });  
        else
            {
                res.status(200).json(prods);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
	Item.findOne({ _id: req.params.id })
    .populate({path : 'id_status' , select: '-_id'})
    .then((prod) => {
        
        if (!prod)
			return res.status(204).json({ success: false, msg: "item/produto não encontrado" });
        
		res.status(200).json({ success: true, 'item/produto': prod});
		console.log(prod)
    })
    .catch((err) => {
        next(err);
    });
}