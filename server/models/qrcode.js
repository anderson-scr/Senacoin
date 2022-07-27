const mongoose = require('mongoose');

exports.QrCodeSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	unico: {type: Boolean, default: true},
	diario: {type: Boolean, default: false},
	semanal: {type: Boolean, default: false},
	mensal: {type: Boolean, default: false},
	url: {type: String, default: null},
	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	quantidade: {type: Number, min: 0, default: 0},
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", default: null},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	ativo: {type: Boolean, default: true}
}, { versionKey: false });

exports.AuditoriaQrCodeSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4

	nome: {type: String, immutable: true},
	descricao: {type: String, immutable: true},
	unico: {type: Boolean, immutable: true},
	diario: {type: Boolean, immutable: true},
	semanal: {type: Boolean, immutable: true},
	ilimitado: {type: Boolean, immutable: true},
	url: {type: String, immutable: true},
	data_inicio: {type: Date, immutable: true},
	data_fim: {type: Date, immutable: true},
	quantidade: {type: Number, immutable: true},
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", immutable: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", immutable: true}],
	ativo: {type: Boolean, immutable: true}
}, { versionKey: false });
