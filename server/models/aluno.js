const mongoose = require('mongoose');

exports.AlunoSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	apelido: String,
	telefone: String,
	data_nasc: Date,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"}
});

exports.CarteiraPontosSchema = new mongoose.Schema({
	id_aluno: {type: mongoose.SchemaTypes.ObjectId, ref: "Aluno"},
	saldo: Number
});