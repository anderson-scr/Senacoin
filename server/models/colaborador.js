const mongoose = require('mongoose');
const { PermissoesSchema } = require('./permissoes');

exports.ColaboradorSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true, unique: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15, unique: true},
	matricula: {type: String, default: null, unique: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	permissoes: {type: PermissoesSchema, required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });

exports.AuditoriaColaboradorSchema = new mongoose.Schema({
	colaborador: {type: String, required: true, lowercase: true, unique: true},
	modificado_em: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4,
	
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true, unique: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15, unique: true},
	matricula: {type: String, default: null, unique: true},
	permissoes: {type: PermissoesSchema, required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });