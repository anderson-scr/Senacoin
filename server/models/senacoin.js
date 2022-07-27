const mongoose = require('mongoose');

exports.SenaCoinSchema = new mongoose.Schema({ // lote de senacoins obtidos e sua data de expiração
	data_inicio: {type: Date, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4
	data_fim: {type: Date, default: () => Date.now() - 4*60*60*1000 + 30*24*60*60*1000}, // fuso horario gmt-4 + 30 dias
	pontos: {type: Number, min: 0, required: true},
}, { versionKey: false });

exports.AuditoriaSenaCoinSchema = new mongoose.Schema({ // lote de senacoins obtidos e sua data de expiração
	responsavel: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4

	id_senacoin:{type: mongoose.Types.ObjectId, ref: "SenaCoin"},
	data_inicio: {type: Date, immutable: true},
	data_fim: {type: Date, immutable: true},
	pontos: {type: Number, immutable: true},
}, { versionKey: false });