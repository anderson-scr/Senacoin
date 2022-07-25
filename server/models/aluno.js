const mongoose = require('mongoose');

exports.AlunoSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15, unique: true},
	matricula: {type: String, unique: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	saldo: [{type: mongoose.Types.ObjectId, ref: "SenaCoin", default: null}], // precisa trocar isso??
	apelido: {type: String, default: null}, // devo auditar isso?
	telefone: {type: String, default: null}, // devo auditar isso?
	data_nasc: {type: Date, required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });

exports.AuditoriaAlunoSchema = new mongoose.Schema({
	responsavel: {type: String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4,
	
	nome: {type: String, required: true},
	email: {type: String, required: true},
	cpf: {type: String, required: true},
	matricula: {type: String},  // precisa trocar isso pra required true
	saldo: [{type: mongoose.Types.ObjectId, ref: "SenaCoin", default: null}], // precisa trocar isso??
	data_nasc: {type: Date, required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });