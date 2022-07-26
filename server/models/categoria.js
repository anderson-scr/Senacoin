const mongoose = require('mongoose');

exports.CategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	ativo: {type: Boolean, default: true}
}, { versionKey: false });

exports.AuditoriaCategoriaSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4,

	nome: {type: String, immutable: true},
	descricao: {type: String, immutable: true},
	ativo: {type: Boolean, immutable: true}
}, { versionKey: false });