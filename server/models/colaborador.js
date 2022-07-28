const mongoose = require('mongoose');
const { PermissoesSchema } = require('./permissoes');

exports.ColaboradorSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15, unique: true},
	matricula: {type: String, required: true, minLength: 4, maxLength: 8, unique: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	permissoes: {type: PermissoesSchema, required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	ativo: {type: Boolean, default: true}
}, { versionKey: false });

exports.AuditoriaColaboradorSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4,
	
	nome: {type: String, immutable: true},
	email: {type: String, immutable: true},
	cpf: {type: String, immutable: true},
	matricula: {type: String, immutable: true},
	permissoes: {type: PermissoesSchema, immutable: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", immutable: true}],
	ativo: {type: Boolean, immutable: true}
}, { versionKey: false });