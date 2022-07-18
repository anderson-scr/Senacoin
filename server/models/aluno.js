const mongoose = require('mongoose');

exports.AlunoSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true, unique: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	apelido: {type: String, default: null},
	telefone: {type: String, default: null},
	data_nasc: {type: Date, required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });

exports.CarteiraPontosSchema = new mongoose.Schema({
	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno", required: true},
	saldo: {type: Number, min: 0, required: true},
}, { versionKey: false });