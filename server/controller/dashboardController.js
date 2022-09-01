const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Promocao = mongoose.model('Promocao');
const QrCode = mongoose.model('QrCode');

exports.getAll = async (req, res, _next) => {
	let list = [];
	try {

		const items = await Item.find({id_categoria: {$in: ["62d017a1181c3910ccfd43d2", "62d017a1181c3910ccfd43d3"]}});
		list = list.concat(items);

		const promos = await Promocao.find({});
		list = list.concat(promos);

		const qrcodes = await QrCode.find({});
		list = list.concat(qrcodes);

		if (!list.length)
			return res.status(204).json();

		res.status(200).json({success: true, data: list});
	} catch (error) {
		res.status(500).json({success: false, msg: error.message});
	}
}