const mongoose = require('mongoose');

exports.QrCodeSchema = new mongoose.Schema({
	id_item: {type: mongoose.Types.ObjectId, ref: "Item"},
	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno"},
	id_unidade: {type: mongoose.Types.ObjectId, ref: "Unidade"},
	titulo: String,
	descricao: String,
	url: String,
	data_inicio: Date,
	data_fim: Date,
	id_senacoin: {type: mongoose.Types.ObjectId, ref: "SenaCoin"},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status"}

});
