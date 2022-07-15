const mongoose = require('mongoose');

exports.CategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	id_status: {type: mongoose.Types.ObjectId, ref: "Status"} //.populate("id_status")
});


exports.SubCategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	id_status: {type: mongoose.Types.ObjectId, ref: "Status"} //.populate("id_status")
});