const mongoose = require('mongoose');

exports.AlunoSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15, unique: true},
	matricula: {type: String, required: true, unique: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	saldo: [{type: mongoose.Types.ObjectId, ref: "SenaCoin"}],
	apelido: {type: String, default: null}, // devo auditar isso?
	telefone: {type: String, default: null}, // devo auditar isso?
	data_nasc: {type: Date, required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	ativo: {type: Boolean, default: true}
}, { versionKey: false });

exports.AuditoriaAlunoSchema = new mongoose.Schema({
	responsavel: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4,
	
	nome: {type: String, immutable: true},
	email: {type: String, immutable: true},
	cpf: {type: String, immutable: true},
	matricula: {type: String, immutable: true},  // precisa trocar isso pra required true
	saldo: [{type: mongoose.Types.ObjectId, ref: "SenaCoin", immutable: true}],
	apelido: {type: String, default: null}, // devo auditar isso?
	telefone: {type: String, default: null}, // devo auditar isso?
	data_nasc: {type: Date, immutable: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", immutable: true}],
	ativo: {type: Boolean, immutable: true}
}, { versionKey: false });