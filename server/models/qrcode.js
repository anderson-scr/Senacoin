const mongoose = require('mongoose');

exports.QrCodeSchema = new mongoose.Schema({
	titulo: {type: String, required: true},
	descricao: {type: String, default: null},
	unico: {type: Boolean, default: true},
	diario: {type: Boolean, default: false},
	semanal: {type: Boolean, default: false},
	ilimitado: {type: Boolean, default: false},
	url: {type: String, default: null},
	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	quantidade: {type: Number, min: 0, default: 0},
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", default: null},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });
