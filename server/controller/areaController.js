const mongoose = require('mongoose');
const Area = mongoose.model('Area');


exports.new = (req, res, next) => {
	const novaArea = new Area({
		nome: req.body.titulo,
		descricao: req.body.descricao,
        id_unidade: mongoose.Types.ObjectId(req.body.unidade),
        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novaArea.save()
        .then((area) => {
            res.status(201).json({ success: true, id: area._id, nome: area.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}

exports.listAll = (req, res, next) => {
	Area.find({})
    .select("nome descricao id_unidade id_status")
    .populate({path : 'id_unidade' , select: 'nome -_id'})
    .populate({path : 'id_status' , select: '-_id'})
    .then((areas) => {
        
        if (areas.length === 0)
            return res.status(204).json({ success: false, msg: "nenhuma area encontrada" });  
        else
            {
                res.status(200).json(areas);
            }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {
	Area.find({id_status: "62cec6c463187bb9b498687b"})
    .select("nome id_unidade -_id")
    .then((areas) => {
        
        if (areas.length === 0)
            return res.status(204).json({ success: false, msg: "nenhuma area encontrada" });  
        else
            {
                res.status(200).json(areas);
            }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {
	Area.findOne({ _id: req.params.id })
    .populate({path : 'id_status' , select: '-_id'})
    .then((area) => {
        
        if (!area)
            return res.status(204).json({ success: false, msg: "nenhuma area encontrada" });  

        res.status(200).json(area);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}