const mongoose = require('mongoose');

exports.PerfilSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	cad_usuarios: {type: Boolean, default: false},
	cad_itens: {type: Boolean, default: false},
	cad_perfis: {type: Boolean, default: false},
	cad_areas: {type: Boolean, default: false},
	cad_subcategorias: {type: Boolean, default: false},
	cad_promocoes: {type: Boolean, default: false},
	cad_unidades: {type: Boolean, default: false},
	cad_qrcodes: {type: Boolean, default: false},

	ger_usuarios: {type: Boolean, default: false},
	ger_itens: {type: Boolean, default: false},
	ger_promocoes: {type: Boolean, default: false},
	ger_qrcodes: {type: Boolean, default: false},
	relatorios: {type: Boolean, default: false},

	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}, //.populate("id_status")
}, { versionKey: false });