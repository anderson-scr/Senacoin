const mongoose = require('mongoose');
const { PermissoesSchema } = require('./permissoes');

exports.PerfilSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	permissoes: {type: PermissoesSchema, required: true},
	ativo: {type: Boolean, default: true}, 
}, { versionKey: false });

exports.AuditoriaPerfilSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4

	nome: {type: String, immutable: true},
	permissoes: {type: PermissoesSchema, immutable: true},
	ativo: {type: Boolean, immutable: true}, 
}, { versionKey: false });