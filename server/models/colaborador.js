const mongoose = require('mongoose');

exports.ColaboradorSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true},
	cpf: {type: String, required: true, minLength: 11, maxLength: 11},
	matricula: String,
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	cad_perfis: {type: Boolean, default: false},
	cad_areas: {type: Boolean, default: false},
	cad_categorias: {type: Boolean, default: false},
	cad_subcategorias: {type: Boolean, default: false},
	cad_usuarios: {type: Boolean, default: false},
	cad_promocoes: {type: Boolean, default: false},
	cad_unidades: {type: Boolean, default: false},
	cad_itens: {type: Boolean, default: false},
	cad_relatorios: {type: Boolean, default: false},
	ger_usuarios: {type: Boolean, default: false},
	ger_items: {type: Boolean, default: false},
	ger_promocoes: {type: Boolean, default: false},
	ger_qrcode: {type: Boolean, default: false},
	ger_relatorios: {type: Boolean, default: false},
	admin: {type: Boolean, default: false},

	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
});