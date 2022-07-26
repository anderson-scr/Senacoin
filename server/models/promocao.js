const mongoose = require('mongoose');

exports.PromocaoSchema = new mongoose.Schema({
	titulo: {type: String, required: true},
	descricao: {type: String, default: null},
	pontos: {type: Number, min: 0, required: true},
	desconto: {type: Number, min: 0, required: true},
	quantidade: {type: Number, min: 0, default: 0}, // que isso?
	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	id_item: [{type: mongoose.Types.ObjectId, ref: "Item", required: true}],
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	imagem: {type: String, default: null},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });

exports.AuditoriaPromocaoSchema = new mongoose.Schema({
	colaborador: {type: String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4

	titulo: {type: String, required: true},
	descricao: {type: String},
	pontos: {type: Number, min: 0, required: true},
	desconto: {type: Number, min: 0, required: true},
	quantidade: {type: Number, min: 0}, // que isso?
	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	id_item: [{type: mongoose.Types.ObjectId, ref: "Item", required: true}],
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	imagem: {type: String},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });