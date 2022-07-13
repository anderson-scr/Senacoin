const mongoose = require('mongoose');

exports.ItemSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	pontos: {type: Number, required: true},
	imagem: String,
	data_inicio: Date,
	data_fim: Date,
	id_area: {type: mongoose.SchemaTypes.ObjectId, ref: "Area"},
	id_categoria: {type: mongoose.SchemaTypes.ObjectId, ref: "Categoria"},
	id_subcategoria: {type: mongoose.SchemaTypes.ObjectId, ref: "SubCategoria"},
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"}
});