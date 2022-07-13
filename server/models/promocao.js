const mongoose = require('mongoose');

exports.PromocaoSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
	titulo: String,
	descricao: String,
	pontos: Number,
	desconto: Number,
	quantidade: Number,
	imagem: String,
	data_inicio: Date,
	data_fim: Date,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}
});