const mongoose = require('mongoose');
const Perfil = mongoose.model('Perfil');


exports.new = (req, res, next) => {
    const novoPerfil = new Perfil({
        nome: req.body.nome,
        cad_usuarios: req.body.cad_usuarios,
        cad_itens: req.body.cad_itens,
        cad_perfis: req.body.cad_perfis,
        cad_areas: req.body.cad_areas,
        cad_subcategorias: req.body.cad_subcategorias,
        cad_promocoes: req.body.cad_promocoes,
        cad_unidades: req.body.cad_unidades,
        cad_qrcodes: req.body.cad_qrcode,
        
        ger_usuarios: req.body.ger_usuarios,
        ger_itens: req.body.ger_items,
        ger_promocoes: req.body.ger_promocoes,
        ger_qrcodes: req.body.ger_qrcode,
        relatorios: req.body.relatorios,

        id_status: mongoose.Types.ObjectId("62cec6c463187bb9b498687b")
    });
    
    try 
	{
        novoPerfil.save()
        .then((perfil) => {
            res.status(201).json({ success: true, id: perfil._id, nome: perfil.nome});
        });
        
    }
	catch (err) {
        
        res.json({ success: false, msg: err });
        
    }
}

exports.listAll = (req, res, next) => {
	Perfil.find({})
    .select("nome id_status")
    .populate({path : 'id_status' , select: '-_id'})
    .then((perfis) => {
        
        if (perfis.length === 0)
            return res.status(204).json({ success: false, msg: "nenhum perfil encontrado" });  
        else
            {
                res.status(200).json(perfis);
            }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listActive = (req, res, next) => {
	Perfil.find({id_status: "62cec6c463187bb9b498687b"})
    .select("-id_status")
    .then((perfis) => {
        
        if (perfis.length === 0)
            return res.status(204).json({ success: false, msg: "nenhum perfil encontrado" });  
        else
            {
                res.status(200).json(perfis);
            }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.listOne = (req, res, next) => {

    Perfil.findOne({ _id: req.params.id })// colocar um && pra procurar por id tbm
    .populate({path : 'id_status' , select: '-_id'})
    .then((perfil) => {
        
        if (!perfil)
			return res.status(204).json({ success: false, msg: "colaborador não encontrado" });
        
		res.status(200).json({ success: true, 'perfil': perfil});
		console.log(perfil)
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

exports.edit = (req, res, nxt) => {
    // delete req.body.id_status; // impede de enviar opcoes que não devem ser alteradas
    Perfil.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}

exports.delete = (req, res, nxt) => {
    Perfil.findByIdAndUpdate(req.params.id, {id_status: mongoose.Types.ObjectId("62cec7b263187bb9b498687e")}, {new: true})
    .select('-_id -__v')
    .populate({path : 'id_status' , select: '-_id'})
    .then((doc) => (res.status(200).json(doc)))
    .catch((err) => (res.status(500).json(err)));
}
