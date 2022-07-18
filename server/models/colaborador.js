const mongoose = require('mongoose');

exports.ColaboradorSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15},
	matricula: String,
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	
	cad_usuarios: {type: Boolean, default: false},
	cad_itens: {type: Boolean, default: false},
	cad_perfis: {type: Boolean, default: false},
	cad_areas: {type: Boolean, default: false},
	cad_subcategorias: {type: Boolean, default: false},
	cad_promocoes: {type: Boolean, default: false},
	cad_unidades: {type: Boolean, default: false},
	cad_qrcode: {type: Boolean, default: false},

	ger_usuarios: {type: Boolean, default: false},
	ger_itens: {type: Boolean, default: false},
	ger_promocoes: {type: Boolean, default: false},
	ger_qrcode: {type: Boolean, default: false},
	relatorios: {type: Boolean, default: false},

	id_status: {type: mongoose.Types.ObjectId, ref: "Status"},
	id_unidade: {type: mongoose.Types.ObjectId, ref: "Unidade"},
}, { versionKey: false });