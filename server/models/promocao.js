const mongoose = require('mongoose');

exports.PromocaoSchema = new mongoose.Schema({
	titulo: String,
	descricao: String,
	pontos: Number,
	desconto: Number,
	quantidade: Number,
	data_inicio: Date,
	data_fim: Date,
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	imagem: String,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}
});