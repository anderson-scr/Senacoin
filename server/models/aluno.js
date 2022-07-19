const mongoose = require('mongoose');

exports.AlunoSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true, unique: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15, unique: true},
	matricula: {type: String, default: null, unique: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	
	saldo: [{type: mongoose.Types.ObjectId, ref: "SenaCoin", default: null}],
	apelido: {type: String, default: null},
	telefone: {type: String, default: null},
	data_nasc: {type: Date, required: true},
	
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });