const mongoose = require('mongoose');
const Categoria = mongoose.model('Categoria');


exports.listAll = (_req, res, _next) => {

	Categoria.find({})
    .then((cats) => {
        
        if (!cats.length)
            return res.status(204).json();  
        else
            res.status(200).json(cats);
    })
    .catch((err) => {
        res.status(500).json({success: false, msg: `${err}`});
    });
}
