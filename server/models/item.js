const mongoose = require('mongoose');

exports.ItemSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	pontos: {type: Number, min: 0, required: true},
	quantidade: {type: Number, min: 0},
	imagem: String,
	data_inicio: Date,
	data_fim: Date,
	id_area: {type: mongoose.SchemaTypes.ObjectId, ref: "Area"},
	id_categoria: {type: mongoose.SchemaTypes.ObjectId, ref: "Categoria"},
	id_subcategoria: {type: mongoose.SchemaTypes.ObjectId, ref: "SubCategoria"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}
});