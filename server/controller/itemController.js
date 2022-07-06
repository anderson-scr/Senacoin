const mongoose = require('mongoose');
const Item = mongoose.model('Item');


exports.new = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de item teste."});
}

exports.listAll = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de item teste."});
}

exports.listOne = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de item teste."});
}