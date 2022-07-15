const mongoose = require('mongoose');
const Promocao = mongoose.model('Promocao');


exports.new = (req, res, next) => {
    const novoUnidade = new Unidade({

        titulo: req.body.titulo,
        descricao: req.body.descricao,
        pontos: req.body.pontos,
        desconto: req.body.desconto,
        quantidade: req.body.quantidade,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim,
        id_unidade: req.body.id_unidade,
        id_item: req.body.id_item,
        imagem: req.body.imagem,
        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novoUnidade.save()
        .then((un) => {
            res.status(201).json({ success: true, id: un._id, nome: un.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}


exports.listAll = (req, res, next) => {
	Promocao.find({})
    .select("titulo descricao desconto id_unidade id_status")
	.populate({path : 'id_unidade' , select: 'nome -_id'})
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((promocoes) => {
        
        if (promocoes.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma promocao encontrada" });  
        else
            {
                res.status(200).json(promocoes);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {
	const today = new Date(new Date()-3600*1000*4); //fuso horario gmt-4 talvez .toISOString() no final
	console.log(today)
	Promocao.find({$and: [{id_status: "62cec6c463187bb9b498687b"}, {data_inicio: {$gte: today}}, {data_fim: {$lt: today}}]})
    .select("titulo pontos desconto id_item id_unidade -_id")
	.populate({path : 'id_item' , select: 'nome area categoria -_id'})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
    .then((promocoes) => {
        
        if (promocoes.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma promocao encontrada" });  
        else
            {
                res.status(200).json(promocoes);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => {
    Promocao.findOne({ _id: req.params.id})
    .select('-_id')
    .populate({path : 'id_item' , select: 'nome area categoria -_id'})
	.populate({path : 'id_unidade' , select: 'nome -_id'})
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((promocoes) => {
        
        if (promocoes.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma promocao encontrada" });  
        else
            {
                res.status(200).json(promocoes);
            }
    })
    .catch((err) => {
        next(err);
    });
}
