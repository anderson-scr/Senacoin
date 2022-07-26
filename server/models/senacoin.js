const mongoose = require('mongoose');

exports.SenaCoinSchema = new mongoose.Schema({ // lote de senacoins obtidos e sua data de expiração
	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	pontos: {type: Number, min: 0, required: true},
}, { versionKey: false });

exports.AuditoriaSenaCoinSchema = new mongoose.Schema({ // lote de senacoins obtidos e sua data de expiração
	colaborador: {type: String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4

	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	pontos: {type: Number, min: 0, required: true},
}, { versionKey: false });