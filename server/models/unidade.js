const mongoose = require('mongoose');

exports.UnidadeSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	cidade: {type: String, required: true},
	uf: {type: String, required: true},
	logradouro: String,
	numero: Number,
	telefone: String,
	resposavel: {type: String, required: true},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status"} //.populate("id_status")
}, { versionKey: false });