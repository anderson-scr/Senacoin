const mongoose = require('mongoose');

exports.ColaboradorSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true, lowercase: true, unique: true},
	cpf: {type: String, required: true, minLength: 15, maxLength: 15, unique: true},
	matricula: {type: String, default: null, unique: true},
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
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	
	permissions: {
		
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
	},

	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });