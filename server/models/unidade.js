const mongoose = require('mongoose');

exports.UnidadeSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	cidade: {type: String, required: true},
	uf: {type: String, required: true},
	logradouro: {type: String, default: null},
	numero: {type: Number, default: null},
	telefone: {type: String, default: null},
	resposavel: {type: String, required: true},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true} //.populate("id_status")
}, { versionKey: false });