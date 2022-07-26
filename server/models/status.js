const mongoose = require('mongoose');

exports.StatusSchema = new mongoose.Schema({
	nome: {type: String, required: true},
}, { versionKey: false });

exports.AuditoriaStatusSchema = new mongoose.Schema({
	colaborador: {type:String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
	removido: {type: Boolean, default: true},

	nome: {type: String, required: true},
}, { versionKey: false });