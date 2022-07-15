const mongoose = require('mongoose');
const Unidade = mongoose.model('Unidade');


exports.new = (req, res, next) => {
	const novoUnidade = new Unidade({
		nome: req.body.nome,
        cidade: req.body.cidade,
        uf: req.body.uf,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        telefone: req.body.telefone,
        resposavel: req.body.resposavel,
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
	Unidade.find({})
    .select("nome cidade uf id_status")
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((unidades) => {
        
        if (unidades.length === 0)
            return res.status(401).json({ success: false, msg: "nenhuma unidade encontrada" });  
        else
            {
                res.status(200).json(unidades);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listActive = (req, res, next) => {

	Unidade.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome")
    .then((unidades) => {
        
        if (unidades.length === 0)
            return res.status(404).json({ success: false, msg: "nenhuma unidade encontrada" });  
        else
            {
                res.status(200).json(unidades);
            }
    })
    .catch((err) => {
        next(err);
    });
}

exports.listOne = (req, res, next) => { // colocar um && pra procurar por id tbm

    Unidade.findOne({ _id: req.params.id })
	.populate({path : 'id_status' , select: 'nome -_id'})
    .then((unidade) => {
        
        if (!unidade)
			return res.status(401).json({ success: false, msg: "unidade não encontrada" });
        
		res.status(200).json({ success: true, 'unidade': unidade});
		console.log(unidade)
    })
    .catch((err) => {
        next(err);
    });
}