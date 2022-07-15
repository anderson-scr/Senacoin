const mongoose = require('mongoose');

exports.QrCodeSchema = new mongoose.Schema({
	titulo: String,
	descricao: String,
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", default: null},
	id_unidade: {type: mongoose.Types.ObjectId, ref: "Unidade"},
	unico: {type: Boolean, default: true},
	diario: {type: Boolean, default: false},
	semanal: {type: Boolean, default: false},
	ilimitado: {type: Boolean, default: false},
	url: String,
	data_inicio: Date,
	data_fim: Date,
	quantidade: {type: Number, min: 0},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status"}

});
