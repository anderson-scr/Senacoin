const mongoose = require('mongoose');

exports.UnidadeSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	cidade: {type: String, required: true},
	uf: {type: String, required: true},
	logradouro: {type: String, default: null},
	numero: {type: Number, default: null},
	telefone: {type: String, default: null},
	responsavel: {type: String, required: true},
	ativo: {type: Boolean, default: true} 
}, { versionKey: false });

exports.AuditoriaUnidadeSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4

	nome: {type: String, immutable: true},
	cidade: {type: String, immutable: true},
	uf: {type: String, immutable: true},
	logradouro: {type: String, immutable: true},
	numero: {type: Number, immutable: true},
	telefone: {type: String, immutable: true},
	responsavel: {type: String, immutable: true},
	ativo: {type: Boolean, immutable: true}
}, { versionKey: false });