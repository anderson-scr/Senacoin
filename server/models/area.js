const mongoose = require('mongoose');

exports.AreaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });

exports.AuditoriaAreaSchema = new mongoose.Schema({
	responsavel: {type: String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4,

	nome: {type: String, required: true},
	descricao: {type: String},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}	
}, { versionKey: false });
