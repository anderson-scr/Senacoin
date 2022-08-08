const mongoose = require('mongoose');

exports.AreaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	ativo: {type: Boolean, default: true}
}, { versionKey: false });

exports.AuditoriaAreaSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4,

	nome: {type: String, immutable: true},
	descricao: {type: String, immutable: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", immutable: true}],
	ativo: {type: Boolean, immutable: true}	
}, { versionKey: false });
