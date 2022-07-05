const mongoose = require('mongoose');
const Item = mongoose.model('Item');


// logs the user
exports.teste = (req, res, next) => {
	res.status(200).json({ success: true, msg: "voce acessou a rota de item teste."});
}