const mongoose = require('mongoose');

exports.PermissoesSchema = new mongoose.Schema({
	cad_usuarios: {type: Boolean, default: false},
	cad_itens: {type: Boolean, default: false},
	cad_perfis: {type: Boolean, default: false},
	cad_areas: {type: Boolean, default: false},
	cad_subcategorias: {type: Boolean, default: false},
	cad_promocoes: {type: Boolean, default: false},
	cad_unidades: {type: Boolean, default: false},
	cad_qrcodes: {type: Boolean, default: false},
	cad_status: {type: Boolean, default: false}, // vai ser removido serve apenas para ambiente de teste

	ger_usuarios: {type: Boolean, default: false},
	ger_itens: {type: Boolean, default: false},
	ger_promocoes: {type: Boolean, default: false},
	ger_qrcodes: {type: Boolean, default: false},
	relatorios: {type: Boolean, default: false},
}, {  _id : false, versionKey: false });