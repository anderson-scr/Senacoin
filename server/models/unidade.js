const mongoose = require('mongoose');

exports.UnidadeSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	cidade: {type: String, required: true},
	uf: {type: String, required: true},
	logradouro: {type: String, default: null},
	numero: {type: Number, default: null},
	telefone: {type: String, default: null},
	responsavel: {type: String, required: true},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true} //.populate("id_status")
}, { versionKey: false });

exports.AuditoriaUnidadeSchema = new mongoose.Schema({
	colaborador: {type:String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4

	nome: {type: String, required: true},
	cidade: {type: String, required: true},
	uf: {type: String, required: true},
	logradouro: {type: String},
	numero: {type: Number},
	telefone: {type: String},
	responsavel: {type: String, required: true},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true} //.populate("id_status")
}, { versionKey: false });