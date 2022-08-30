const mongoose = require('mongoose');

exports.CotacaoSchema = new mongoose.Schema({
	cambio: {type: Number, min: 0, required: true}
}, { versionKey: false });

exports.AuditoriaCotacaoSchema = new mongoose.Schema({
	responsavel: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4

	cambio: {type: Number, immutable: true, min: 0}
}, { versionKey: false });