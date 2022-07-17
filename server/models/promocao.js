const mongoose = require('mongoose');

exports.PromocaoSchema = new mongoose.Schema({
	titulo: String,
	descricao: String,
	pontos: Number,
	desconto: Number,
	quantidade: Number,
	data_inicio: Date,
	data_fim: Date,
	id_unidade: {type: mongoose.Types.ObjectId, ref: "Unidade"},
	id_item: {type: mongoose.Types.ObjectId, ref: "Item"},
	imagem: String,
	id_status: {type: mongoose.Types.ObjectId, ref: "Status"}
}, { versionKey: false });