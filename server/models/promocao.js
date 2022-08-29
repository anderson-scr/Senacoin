const mongoose = require('mongoose');

exports.PromocaoSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	multiplicador: {type: Number, min: 0, required: true}, // talvez troque
	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	quantidade: {type: Number, default: null}, // somente produto 
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	imagem: {type: String, default: null},
	ativo: {type: Boolean, default: true}
}, { versionKey: false });

exports.AuditoriaPromocaoSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4

	nome: {type: String, immutable: true},
	descricao: {type: String, immutable: true},
	multiplicador: {type: Number, immutable: true},
	data_inicio: {type: Date, immutable: true},
	data_fim: {type: Date, immutable: true},
	quantidade: {type: Number, default: null},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", immutable: true}],
	imagem: {type: String, immutable: true},
	ativo: {type: Boolean, immutable: true}
}, { versionKey: false });